# Security Headers — MDN Summary (headers 3 onward)

This file summarizes the **important information from MDN** for the security headers you asked about. It covers: `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Embedder-Policy (COEP)`, `Cross-Origin-Opener-Policy (COOP)`, and `Cross-Origin-Resource-Policy (CORP)`.

> Note: This content is based on MDN Web Docs guidance and summarized for quick reference.

---

## X-Content-Type-Options: nosniff

**Purpose:** Prevents browsers from MIME-sniffing the response away from the declared `Content-Type`. When set to `nosniff`, the browser must respect the server-provided MIME type.

**Syntax:**
```
X-Content-Type-Options: nosniff
```

**Why use it:** Helps prevent executing uploaded content that a server marked as a non-script (e.g., a text file) as script — reduces certain XSS and content-execution risks.

**Notes / compatibility:** Widely supported by modern browsers. Make sure your server sets correct `Content-Type` headers for resources because `nosniff` will cause mismatched types to be rejected or not executed.

---

## Strict-Transport-Security (HSTS)

**Purpose:** Tells browsers to only access the host (and optionally its subdomains) using HTTPS for a specified duration. Protects against protocol downgrade attacks and some MITM attacks that rely on forcing HTTP.

**Syntax:**
```
Strict-Transport-Security: max-age=<seconds>[; includeSubDomains][; preload]
```

**Common options:**
- `max-age` — required, time in seconds for which the browser should enforce HTTPS.
- `includeSubDomains` — apply policy to all subdomains.
- `preload` — indicates intent to add the domain to browser preload lists (requires registration).

**Important caveats:**
- **HSTS must be delivered over HTTPS**; browsers ignore HSTS sent over plain HTTP.
- Use caution with `includeSubDomains` and `preload` because they are long-lasting policies.

---

## Referrer-Policy

**Purpose:** Controls how much of the referring information (the `Referer` header) is sent on navigation or resource fetches.

**Syntax examples:**
```
Referrer-Policy: no-referrer
Referrer-Policy: strict-origin-when-cross-origin
```

**Common directives (from strictest to most permissive):**
- `no-referrer` — send no referrer information.
- `no-referrer-when-downgrade` — default in older browsers; don't send when navigating from HTTPS to HTTP.
- `same-origin` — send full URL only for same-origin requests.
- `origin` / `strict-origin` / `origin-when-cross-origin` / `strict-origin-when-cross-origin` — variations that send only the origin in cross-origin requests or adapt to downgrade scenarios.

**Why use it:** Prevents leaking sensitive path/query data to third parties (e.g., tokens in URL), and helps protect privacy.

---

## Permissions-Policy (formerly Feature-Policy)

**Purpose:** Allows servers to enable or disable use of powerful browser features (geolocation, camera, microphone, payment, clipboard, etc.) in a document and its iframes.

**Syntax example:**
```
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

**Notes:**
- The header controls which origins are allowed to use a given feature. An empty `()` denies all origins.
- The feature list and exact directive names can change over time; consult MDN and the Permissions Registry for current directives.
- This is considered an experimental/fast-evolving area; check browser compatibility before production use.

---

## Cross-Origin-Embedder-Policy (COEP)

**Purpose:** Controls whether a document can load cross-origin resources that don't explicitly grant permission to be embedded. `require-corp` forces cross-origin resources to explicitly allow being loaded (via CORP or CORS).

**Syntax:**
```
Cross-Origin-Embedder-Policy: require-corp
```

**Why use it:** Used to enable cross-origin isolation which is required for certain powerful web platform features (e.g., SharedArrayBuffer, high-resolution timers). It prevents loading unintended cross-origin resources unless they opt in.

**Caveat:** COEP generally needs to be paired with COOP (Cross-Origin-Opener-Policy) to enable full cross-origin isolation; also you must make sure embedded cross-origin resources send CORP or CORS headers to allow loading.

---

## Cross-Origin-Opener-Policy (COOP)

**Purpose:** Controls the browsing context group for top-level documents. `same-origin` isolates the browsing context so your page and cross-origin pages do not share a browsing context group.

**Syntax examples:**
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

**Why use it:** When combined with COEP, COOP enables cross-origin isolation which provides stronger protections and is required for certain APIs. COOP helps prevent attacks that rely on `window.opener` access across origins.

**Caveats:** `same-origin` may break integrations relying on `window.opener`/`postMessage` between cross-origin windows.

---

## Cross-Origin-Resource-Policy (CORP)

**Purpose:** Allows resource owners to declare whether their resources are available to cross-origin contexts. It blocks `no-cors` cross-origin requests unless the resource explicitly permits embedding.

**Syntax:**
```
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Resource-Policy: cross-origin
Cross-Origin-Resource-Policy: same-site
```

**Why use it:** Helps defend against certain speculative-execution side-channel attacks and prevents other sites from silently embedding your resources when you don't want them to.

**Notes:** CORP is often used with COEP/COOP strategies for cross-origin isolation, or independently to lock down static assets.

---

*This MDN-based summary was created for quick reference. If you want, I can now:

- Add short example request/response snippets for each header (Express + frontend test HTML), or
- Insert MDN URLs as a reference list into this document, or
- Export the document as a downloadable markdown or PDF.*

