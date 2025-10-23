import jwt from "jsonwebtoken";

// Lightweight Google ID token verification library
// - Fetches OpenID configuration to discover JWKS URI
// - Caches JWKS using Cache-Control max-age
// - Selects key by `kid` and verifies RS256 signatures
// - Auto-refreshes keys when cache expires or key is missing

const GOOGLE_OPENID_CONFIGURATION_URL = "https://accounts.google.com/.well-known/openid-configuration";
const DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 hour fallback if headers missing

class JwksCache {
  constructor() {
    this.jwksUri = null;
    this.keysByKid = new Map(); // kid -> { pemOrCert: string }
    this.expiresAtMs = 0;
    this.refreshPromise = null;
  }

  async verifyIdToken({ token, expectedAud, expectedIss = "https://accounts.google.com" }) {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || typeof decoded !== "object" || !decoded.header) {
      throw new Error("Invalid JWT: cannot decode header");
    }
    const { alg, kid } = decoded.header;
    if (alg !== "RS256") {
      throw new Error(`Unsupported JWT alg: ${alg}`);
    }
    const key = await this.getKeyForKid(kid);
    const verified = jwt.verify(token, key.pemOrCert, {
      algorithms: ["RS256"],
      audience: expectedAud,
      issuer: expectedIss,
    });
    return verified;
  }

  async getKeyForKid(kid) {
    // Ensure JWKS are available and fresh enough
    await this.ensureFreshKeys();

    let key = kid ? this.keysByKid.get(kid) : null;
    if (!key) {
      // Key might be new; refresh once and try again
      await this.refreshKeys();
      key = kid ? this.keysByKid.get(kid) : null;
    }
    if (!key) {
      throw new Error(`No JWKS key found for kid: ${kid || "<missing>"}`);
    }
    return key;
  }

  async ensureFreshKeys() {
    const now = Date.now();
    if (now < this.expiresAtMs && this.keysByKid.size > 0 && this.jwksUri) {
      return;
    }
    await this.refreshKeys();
  }

  async refreshKeys() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    this.refreshPromise = (async () => {
      const jwksUri = await this.getJwksUri();
      const resp = await fetch(jwksUri, { method: "GET" });
      if (!resp.ok) {
        throw new Error(`Failed to fetch JWKS: ${resp.status} ${resp.statusText}`);
      }
      const cacheTtlMs = parseCacheControlMaxAgeMs(resp.headers) ?? DEFAULT_TTL_MS;
      const body = await resp.json();
      if (!body || !Array.isArray(body.keys)) {
        throw new Error("Invalid JWKS response: missing keys array");
      }

      const nextMap = new Map();
      for (const jwk of body.keys) {
        if (jwk.kty !== "RSA" || jwk.alg !== "RS256") continue;
        if (!jwk.kid) continue;
        const pemOrCert = jwkToPemOrCert(jwk);
        if (!pemOrCert) continue;
        nextMap.set(jwk.kid, { pemOrCert });
      }

      if (nextMap.size === 0) {
        throw new Error("JWKS contained no usable RS256 keys");
      }

      this.keysByKid = nextMap;
      this.expiresAtMs = Date.now() + cacheTtlMs;
    })()
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  async getJwksUri() {
    if (this.jwksUri) return this.jwksUri;
    const resp = await fetch(GOOGLE_OPENID_CONFIGURATION_URL, { method: "GET" });
    if (!resp.ok) {
      throw new Error(`Failed to fetch OpenID configuration: ${resp.status} ${resp.statusText}`);
    }
    const json = await resp.json();
    if (!json || typeof json.jwks_uri !== "string") {
      throw new Error("Invalid OpenID configuration: missing jwks_uri");
    }
    this.jwksUri = json.jwks_uri;
    return this.jwksUri;
  }
}

function parseCacheControlMaxAgeMs(headers) {
  const cacheControl = headers.get("cache-control") || headers.get("Cache-Control");
  if (cacheControl) {
    const parts = cacheControl.split(",").map((p) => p.trim().toLowerCase());
    for (const part of parts) {
      if (part.startsWith("max-age=")) {
        const secs = Number(part.substring("max-age=".length));
        if (Number.isFinite(secs) && secs >= 0) return secs * 1000;
      }
    }
  }
  const expires = headers.get("expires") || headers.get("Expires");
  const date = headers.get("date") || headers.get("Date");
  if (expires) {
    const nowMs = date ? Date.parse(date) : Date.now();
    const expMs = Date.parse(expires);
    if (Number.isFinite(expMs) && expMs > nowMs) return expMs - nowMs;
  }
  return null;
}

// Convert a Google RSA JWK to a PEM or X.509 certificate string usable by jsonwebtoken
function jwkToPemOrCert(jwk) {
  // Prefer x5c if available (it is a certificate chain). jsonwebtoken can verify with a certificate.
  if (Array.isArray(jwk.x5c) && jwk.x5c.length > 0) {
    const certBase64 = jwk.x5c[0];
    const pem = derBase64ToPem(certBase64, "CERTIFICATE");
    return pem;
  }
  // Otherwise, build a SubjectPublicKeyInfo PEM from n/e
  if (jwk.n && jwk.e) {
    const pem = rsaPublicKeyFromModExp(jwk.n, jwk.e);
    return pem;
  }
  return null;
}

function derBase64ToPem(derBase64, label) {
  const wrapped = derBase64.match(/.{1,64}/g)?.join("\n") || derBase64;
  return `-----BEGIN ${label}-----\n${wrapped}\n-----END ${label}-----`;
}

// Build a PEM SubjectPublicKeyInfo from modulus (n) and exponent (e) of RSA key
// Minimal ASN.1 DER writer for RSA public key
function rsaPublicKeyFromModExp(modulusB64Url, exponentB64Url) {
  const modulus = base64UrlToBuffer(modulusB64Url);
  const exponent = base64UrlToBuffer(exponentB64Url);

  const seq = derSequence([
    derSequence([
      // rsaEncryption OID 1.2.840.113549.1.1.1
      derOid([1, 2, 840, 113549, 1, 1, 1]),
      derNull(),
    ]),
    derBitString(derSequence([derInteger(modulus, true), derInteger(exponent, false)])),
  ]);

  const b64 = Buffer.from(seq).toString("base64");
  return derBase64ToPem(b64, "PUBLIC KEY");
}

function base64UrlToBuffer(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64url.length / 4) * 4, "=");
  return Buffer.from(b64, "base64");
}

function derLength(len) {
  if (len < 0x80) return Uint8Array.from([len]);
  const bytes = [];
  let n = len;
  while (n > 0) {
    bytes.unshift(n & 0xff);
    n >>= 8;
  }
  return Uint8Array.from([0x80 | bytes.length, ...bytes]);
}

function derSequence(chunks) {
  const content = concatUint8(chunks);
  return concatUint8([Uint8Array.from([0x30]), derLength(content.length), content]);
}

function derInteger(buffer, forceUnsigned) {
  let bytes = Uint8Array.from(buffer);
  if (forceUnsigned) {
    // If the highest bit is set, prepend a 0x00 to force positive INTEGER
    if (bytes.length > 0 && (bytes[0] & 0x80) !== 0) {
      bytes = concatUint8([Uint8Array.from([0x00]), bytes]);
    }
  }
  return concatUint8([Uint8Array.from([0x02]), derLength(bytes.length), bytes]);
}

function derBitString(buffer) {
  const bytes = Uint8Array.from(buffer);
  // Add 0 unused bits count byte
  const content = concatUint8([Uint8Array.from([0x00]), bytes]);
  return concatUint8([Uint8Array.from([0x03]), derLength(content.length), content]);
}

function derOid(oidParts) {
  // First two parts: 40 * value1 + value2
  const first = 40 * oidParts[0] + oidParts[1];
  const rest = oidParts.slice(2).flatMap(encodeOidBase128);
  const body = Uint8Array.from([first, ...rest]);
  return concatUint8([Uint8Array.from([0x06]), derLength(body.length), body]);
}

function encodeOidBase128(n) {
  const bytes = [];
  let value = n >>> 0; // force uint32
  do {
    bytes.unshift(value & 0x7f);
    value >>= 7;
  } while (value > 0);
  for (let i = 0; i < bytes.length - 1; i++) bytes[i] |= 0x80;
  return bytes;
}

function derNull() {
  return Uint8Array.from([0x05, 0x00]);
}

function concatUint8(arrays) {
  const total = arrays.reduce((sum, a) => sum + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

export const googleOAuthLibrary = new JwksCache();

// Convenience wrapper mirroring common usage of Google Auth libraries
export async function verifyGoogleIdToken(token, { clientId, issuer } = {}) {
  if (!token) throw new Error("token is required");
  if (!clientId) throw new Error("clientId is required");
  return googleOAuthLibrary.verifyIdToken({ token, expectedAud: clientId, expectedIss: issuer });
}

// Example usage (uncomment to test):
// (async () => {
//   const clientId = "YOUR_CLIENT_ID.apps.googleusercontent.com";
//   const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii...";
//   const payload = await verifyGoogleIdToken(token, { clientId });
//   console.log(payload.aud === clientId);
//   console.log(payload);
// })();


