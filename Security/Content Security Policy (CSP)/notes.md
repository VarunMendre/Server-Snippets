# The Ultimate Guide to Content Security Policy (CSP)

> **Audience:** Backend/frontend engineers, security-conscious developers, DevOps, and anyone operating modern web apps.

This guide collects everything you need to design, implement, test, and monitor Content Security Policy (CSP) for real-world web applications. It combines core concepts, practical recipes, Express.js examples, deployment pitfalls, and advanced topics (nonces, hashes, reporting, SRI, CSP with SPAs, caching). Use this as your single-reference playbook for rolling out CSP safely and effectively.

---

## Table of Contents
1. What is CSP & why it matters
2. How CSP works (mechanics)
3. CSP directives — deep dive
4. Policy-building patterns & example policies
5. Allowing inline scripts: nonces vs hashes vs `unsafe-inline`
6. Reporting: `report-uri`, `report-to`, `report-only`, and analysis
7. Integrating CSP in Express (practical code)
8. CSP for Single Page Apps (SPAs) & frameworks
9. CDN & third-party integrations
10. Caching, CDNs, and nonces — dangers and solutions
11. Testing, monitoring, and rollout strategy
12. Common pitfalls and how to avoid them
13. Advanced topics: frame-ancestors, sandbox, SRI, service workers
14. Incident response & using CSP reports effectively
15. FAQ — short answers to common questions
16. TL;DR (cheat sheet)
17. Further reading & references

---

## 1. What is CSP & why it matters
Content Security Policy is a browser-enforced policy that lets you declare which sources of content are trustworthy. The browser blocks or reports the loading or execution of anything outside that policy. CSP's primary goal is to reduce the impact of client-side attacks like Cross-Site Scripting (XSS), but it also helps mitigate clickjacking and limits the damage of compromised third-party libraries.

Why use it:
- **Reduce XSS impact:** Even if an XSS bug exists, CSP can prevent injected scripts from running.
- **Limit third-party blast radius:** Tighten what CDNs or analytics services can do.
- **Help compliance & audits:** Many security standards recommend or require CSP for sensitive pages.
- **Visibility:** Reporting reveals attempted violations and misconfigurations.

Caveat: CSP is not a replacement for secure coding or input validation. It is an additional, powerful defensive layer.

---

## 2. How CSP works (mechanics)
A CSP policy is delivered via the `Content-Security-Policy` HTTP response header (preferred) or a `<meta http-equiv="Content-Security-Policy">` tag. When the browser loads a page, it parses that policy and enforces rules for resource loads and script/style execution.

Key mechanics:
- **Directives** restrict resources per type (e.g., `script-src`, `img-src`). If a directive is missing, `default-src` acts as a fallback.
- **Keywords** such as `'self'`, `'none'`, `'unsafe-inline'`, `'unsafe-eval'` control behavior.
- **Source expressions** are origins (`https://cdn.example.com`), schemes (`data:`), or special tokens (nonces, hashes).
- **Violations** are either blocked (enforced) or recorded (report-only). The browser can optionally send a JSON report to an endpoint you specify.

Browsers match a resource's source to the allowed list: mismatch → block + optional report. For inline scripts/styles, nonces or hashes are used to selectively permit execution.

---

## 3. CSP directives — deep dive
Below are the most important directives, how they behave, and typical values.

### Fetch / Resource directives
- **`default-src`**: fallback for any resource type not explicitly listed. Start restrictive: `default-src 'none'`.
- **`script-src`**: controls where scripts can load from and whether inline scripts can execute. Supports nonces (`'nonce-...'`), hashes (`'sha256-...'`), and keywords. Avoid `'unsafe-inline'` if possible.
- **`style-src`**: controls CSS sources; `'unsafe-inline'` allows inline `style` blocks or `style` attributes. Nonces/hashes work for inline styles too.
- **`img-src`**: images, including `img`, CSS `url()`, and `<source>` for media. Supports `data:`.
- **`font-src`**: fonts loaded via `@font-face` or `<link>`.
- **`connect-src`**: governs `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` connections.
- **`media-src`**: audio/video sources.
- **`object-src`**: `<object>`, `<embed>`, `<applet>`; `object-src 'none'` is commonly used.
- **`worker-src`**: web workers and service workers (useful for PWAs).
- **`frame-src` / `child-src`**: allowed iframe children (use `frame-src` / `worker-src` depending on need).

### Navigation & interaction directives
- **`frame-ancestors`**: which sites may embed your site via `<iframe>` — critical for clickjacking protection. Example: `frame-ancestors 'none';` blocks all embedding.
- **`form-action`**: restricts where forms can submit data.

### Document & behavior directives
- **`sandbox`**: restrict page abilities similar to `<iframe sandbox>` with allow-list tokens (e.g., `allow-scripts`).
- **`base-uri`**: restricts what `<base>` can be set to.
- **`upgrade-insecure-requests`**: automatically rewrite `http:` to `https:` for subresources.

### Reporting directives
- **`report-uri`** (older) and **`report-to`** (Reporting API). `report-to` is newer and integrates with the browser's reporting groups. `report-uri` still works widely.
- **`'report-sample'`**: asks the browser to include (short) snippets of blocked inline content in reports (useful, but consider privacy).

### CSP Levels & Browser support
CSP Level 2 is widely supported. Level 3 adds `report-to`, `strict-dynamic`, `nonce`, some directives. Always check current browser support and test across target browsers.

---

## 4. Policy-building patterns & example policies
Below are practical policy patterns. Always test in Report-Only first.

### 4.1 Strict baseline (recommended starting point)
```
Content-Security-Policy: default-src 'none';
  script-src 'self';
  connect-src 'self';
  img-src 'self' data:; 
  style-src 'self';
  font-src 'self';
  frame-ancestors 'none';
```
Start with `default-src 'none'` and open only what's necessary.

### 4.2 Typical server-rendered app with Tailwind CDN & Unsplash
```
Content-Security-Policy: default-src 'self';
  script-src 'self' https://cdn.tailwindcss.com 'nonce-<per-response-nonce>' 'report-sample';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://images.unsplash.com data:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
```
Note: `'unsafe-inline'` in `style-src` is sometimes required for Tailwind's JIT-injected styles; better is to use nonces when possible.

### 4.3 SPA (React/Vue) with API backend
SPAs commonly load one script bundle. Prefer moving inline bootstraps to external files and whitelisting the origin.
```
Content-Security-Policy: default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' https://fonts.googleapis.com 'nonce-<nonce-for-inline-styles>';
  connect-src 'self' https://api.example.com wss://realtime.example.com;
  img-src 'self' data: https://images.examplecdn.com;
```

---

## 5. Allowing inline scripts: nonces vs hashes vs `unsafe-inline`
Inline execution is the hardest part of CSP design. There are three common strategies:

### Nonces (recommended for server-rendered dynamic inline scripts)
- Generate a **fresh random nonce per response** and place it both in the CSP header and every inline `<script nonce="...">` you trust.
- **Do not** reuse the same nonce across responses. A per-response nonce must be unpredictable and ephemeral.
- Nonces are ideal when your server renders inline bootstraps containing dynamic JSON or templated code.

**Express example (per-request nonce)** — generate inside middleware and inject into template before sending (see full example later in this guide).

### Hashes (recommended for static inline snippets or static sites)
- Compute `sha256`/`sha384`/`sha512` of the exact inline script bytes.
- Include `'sha256-<base64>'` in `script-src` to allow that exact content.
- Hashes are brittle to formatting changes — minify or keep the exact snippet stable.

### `unsafe-inline` (avoid)
- Allows any inline script — defeats CSP’s main benefit.
- Use only temporarily during rollout or in constrained dev environments.

**Choosing**: Prefer external scripts or nonces; use hashes for static inline content that cannot be templated; never rely on `unsafe-inline` in production.

---

## 6. Reporting: `report-uri`, `report-to`, `report-only`, and analysis
Reporting is essential to safely roll out CSP.

### Modes
- **Report-Only**: `Content-Security-Policy-Report-Only` header causes browsers to send violation reports but not block content. Use this while tuning policy.
- **Enforced**: `Content-Security-Policy` header blocks violations.

### Report endpoints
- `report-uri /csp-violations` — sends a JSON payload `{ "csp-report": {...} }`.
- `report-to` integrates with the Reporting API and requires a `Report-To` header to define the group.

### Example report JSON (typical)
```json
{
  "csp-report": {
    "document-uri": "https://example.com/",
    "referrer": "",
    "violated-directive": "script-src-elem",
    "effective-directive": "script-src-elem",
    "original-policy": "...",
    "blocked-uri": "https://mal.example/inject.js",
    "source-file": "https://example.com/app.js",
    "line-number": 10
  }
}
```
Some browsers include a short sample if you use `'report-sample'`.

### Handling reports in Express
- Use `express.json({ type: 'application/csp-report' })` to parse `application/csp-report` bodies.
- Persist key fields to a database or a security logging pipeline (SIEM) and correlate events.
- Filter noise: ignore expected violations or trivial blocked analytics until policy matures.

---

## 7. Integrating CSP in Express (practical code)
Below are code patterns you can copy/adapt. Key ideas: set headers for HTML responses, generate per-request nonces where needed, and provide a `/csp-violations` endpoint.

### 7.1 Per-request nonce middleware + template injection
```js
import crypto from 'crypto';
import { readFile } from 'fs/promises';

app.use(async (req, res, next) => {
  if (!req.headers.accept?.includes('text/html')) return next();

  const nonce = crypto.randomBytes(16).toString('base64');

  res.setHeader('Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'report-sample'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; connect-src 'self'; report-uri /csp-violations`
  );

  // If serving static index.html, inject nonce placeholder
  if (req.url === '/' || req.url === '/index.html') {
    let html = await readFile('./public/index.html', 'utf8');
    html = html.replaceAll('${nonce}', nonce); // use templating in real apps
    return res.send(html);
  }

  next();
});
```
Notes:
- Use a proper templating engine (EJS, Pug, Handlebars) and pass `nonce` into templates instead of string replace.
- Do not cache pages containing a per-response nonce (unless cache-key varies per-nonce).

### 7.2 CSP violation endpoint
```js
app.post('/csp-violations', express.json({ type: 'application/csp-report' }), (req, res) => {
  const report = req.body['csp-report'] || req.body;
  // persist report to DB/logging system
  console.log('CSP Violation:', report);
  res.status(204).end();
});
```

### 7.3 Helmet middleware (simpler approach)
Use `helmet` package to set CSP with a config object, but for nonces you still need to generate a nonce per-request and insert in header/template.

```js
import helmet from 'helmet';
app.use(helmet({ contentSecurityPolicy: false })); // disable built-in if you implement custom
```

---

## 8. CSP for Single Page Apps (SPAs) & frameworks
SPAs often depend on bundlers (webpack/rollup) and runtime injection. Best practices:
- **Externalize inline scripts**: Place bootstrap code in an external bundle.
- **Avoid `eval()` and `new Function()`**: These require `'unsafe-eval'` which should be avoided.
- **CSP + Service Workers**: Service workers are controlled by scope and origin; ensure worker registration scripts comply with CSP.
- **When you must inline config**: Use nonces and generate them at server-side render time for the document that bootstraps the SPA.

For frameworks (Next.js, Nuxt, Gatsby): use their server-side rendering hooks to inject nonces into the initial HTML.

---

## 9. CDN & third-party integrations
Third-party scripts (analytics, ads, widgets) complicate CSP. Options:
- **Whitelist third-party origins** in `script-src` (e.g., `https://www.googletagmanager.com`).
- **Use subresource integrity (SRI)** for external static resources to ensure content hasn't been tampered with.
- **Prefer async or deferred loading** for third-party scripts and host them on your origin if permitted by licensing.
- **Monitor reports** to spot unexpected third-party behaviour.

Trade-offs: allowing a CDN widens your attack surface but may be necessary for features or performance.

---

## 10. Caching, CDNs, and nonces — dangers and solutions
A major operational pitfall: **caching pages that include per-response nonces**.

Why it's dangerous:
- Cached pages will contain a stale nonce. Browsers receiving the cached page will see the header (from origin or CDN) and the inline nonce mismatch, or worse, a cached page could expose a nonce that attackers can reuse.

Mitigations:
- **Do not cache responses that contain nonces.** Use `Cache-Control: no-store` or `private, no-cache` for dynamic HTML.
- **Inject nonces server-side and avoid caching HTML responses at the CDN level.** Static assets (JS/CSS) can be cached normally.
- If caching is required, consider using hashes instead of nonces for fully static pages, or use a build step that computes and embeds stable hashes.

---

## 11. Testing, monitoring, and rollout strategy
Safe rollout is critical. Recommended process:
1. **Start Report-Only mode**: `Content-Security-Policy-Report-Only` to gather violations without breaking production.
2. **Collect & analyze reports**: Use your `/csp-violations` endpoint or third-party collectors.
3. **Iterate**: Fix legitimate violations (e.g., internal asset loads), whitelist necessary external sources in policy, or refactor code to avoid inline scripts.
4. **Tighten**: Move from `Report-Only` to enforcement when violations are low and expected.
5. **Automate tests**: Add CSP checks to CI (csp-evaluator, security linters) and include end-to-end test cases that exercise pages and flows.
6. **Monitor continuously**: Keep violation reporting enabled and periodically review logs.

---

## 12. Common pitfalls and how to avoid them
- **`unsafe-inline` overuse:** defeats CSP; avoid unless absolutely necessary.
- **Reusing nonces across responses:** makes nonces predictable and ineffective.
- **Caching nonce-bearing pages at CDN:** results in stale or exposed nonces.
- **Ignoring report noise:** filter out known third-party violations; focus on recurring or suspicious patterns.
- **Allowing `*` or overly broad host lists:** reduces protection drastically.
- **Setting CSP only in meta tags:** headers are stronger and should be used where possible.

---

## 13. Advanced topics
### `frame-ancestors` & clickjacking
To prevent your site from being embedded:
```
Content-Security-Policy: frame-ancestors 'none';
```
Or restrict to trusted frames: `frame-ancestors 'self' https://partner.example.com;`

### `sandbox`
Apply iframe-like restrictions to the entire document: `sandbox allow-scripts allow-same-origin` — useful for isolating third-party content.

### Subresource Integrity (SRI)
SRI (integrity attribute) complements CSP for external static files by ensuring the fetched file matches a known hash: `<script src="..." integrity="sha384-..." crossorigin="anonymous"></script>`.

### CSP & Service Workers
Service workers are same-origin and controlled by the browser; the scope and registration should comply with CSP. Be careful with inline registration snippets — use external files or nonces.

### `strict-dynamic` (advanced)
`'strict-dynamic'` (used with nonces/hashes) tells the browser to trust scripts dynamically created by a trusted script — this gets complex and browser support nuances exist.

---

## 14. Incident response & using CSP reports effectively
When you receive CSP violations that look malicious:
1. **Triage the report**: check `document-uri`, `blocked-uri`, `effective-directive`.
2. **Correlate** with access logs and WAF alerts.
3. **Identify attack vector**: was it an XSS payload or an external resource? If XSS, identify input source and sanitize.
4. **Remediate**: patch input validation, add sanitizer libs, or remove vulnerable code.
5. **Harden policy**: add directives that block the exploited path.
6. **Document**: keep an incident log with timestamps and actions for audits.

---

## 15. FAQ — short answers
**Q: Should I always use nonces or hashes?**
A: Use nonces for dynamic inline code; use hashes for static snippets; prefer external files for best caching.

**Q: Can CSP stop all XSS?**
A: No. CSP is a mitigation that reduces impact; developers must still fix XSS vulnerabilities.

**Q: Are CSP reports trustworthy?**
A: Reports originate from browsers. They are helpful but can be noisy and do not replace server logs.

**Q: Does CSP affect page performance?**
A: Minimal runtime cost. Moving inline scripts to external files typically improves caching and performance.

---

## 16. TL;DR — Quick Cheatsheet
- Start with `Content-Security-Policy-Report-Only`.
- Use `default-src 'none'` and open only required sources.
- Prefer external scripts; when inlining, use per-response nonces or static hashes.
- Never use `unsafe-inline` or `unsafe-eval` in production.
- Generate a cryptographically secure nonce per response; do not cache nonce-bearing pages.
- Collect violation reports and iterate until you can enforce.

Example minimal secure header:
```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';
```

---

## 17. Further reading & references
- MDN Web Docs — Content Security Policy (CSP)
- OWASP — Content Security Policy Cheat Sheet
- Google — CSP Evaluator tool
- Helmet (Express) documentation

---

## Appendix — Practical Examples
### Example A: Per-request nonce (complete)
```js
import express from 'express';
import crypto from 'crypto';
import { readFile } from 'fs/promises';

const app = express();

app.use(async (req, res, next) => {
  if (!req.headers.accept?.includes('text/html')) return next();

  const nonce = crypto.randomBytes(16).toString('base64');

  res.setHeader('Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'report-sample'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; connect-src 'self'; report-uri /csp-violations`
  );

  if (req.url === '/' || req.url === '/index.html') {
    let html = await readFile('./public/index.html', 'utf8');
    // your template engine should replace this safely
    html = html.replaceAll('${nonce}', nonce);
    return res.send(html);
  }

  next();
});

app.post('/csp-violations', express.json({ type: 'application/csp-report' }), (req, res) => {
  console.log('CSP report received', req.body);
  res.status(204).end();
});

app.listen(4000);
```

### Example B: Hash for static inline script
Compute hash using Node's crypto: `createHash('sha256').update(scriptContent).digest('base64')` and include `'sha256-<value>'` in `script-src`.

### Example C: Report-only during rollout
```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self'; report-uri /csp-violations
```

---

_End of guide — bookmark this file and iterate as your app grows. CSP is a living policy: tune it frequently, monitor reports, and make it part of your deployment checklist._

