# 🧠 **Understanding CSRF Attacks and Prevention**

---

## 🛡️ **What is a CSRF Attack?**

**CSRF (Cross-Site Request Forgery)** — also known as **XSRF** or **Sea Surf** — is a type of **web security vulnerability** where a malicious website tricks a user's browser into performing **unwanted actions** on a trusted site where the user is already authenticated.

> 🤩 In short, CSRF **exploits the trust a web application has in the user’s browser** — leveraging automatically sent credentials such as **cookies**, **tokens**, or **session IDs**.

---

## 🎯 **Real-World Analogy**

Imagine you’re logged into your **bank website** in one tab.
Then, in another tab, you visit a **malicious website** that silently triggers a transfer from your account.
Your browser **automatically includes your bank cookies**, making the bank believe *you* initiated the request.

💭 The bank trusts your browser — but your browser was tricked.

---

## 🔍 **How It Works**

1. 👨‍💻 User logs into `trusted-site.com` (e.g., a banking app).
2. 💮 The browser stores a **session cookie**.
3. ⚠️ User visits a **malicious site** (`attacker-site.com`).
4. 💣 That site submits a **hidden form** or **auto script** to `trusted-site.com`.
5. 📤 Browser includes the **valid session cookie**.
6. ✅ Trusted site processes it **as if it came from the user**.

---

## 🧪 **Example CSRF Attack**

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
<script>
  document.forms[0].submit();
</script>
```

> ⚠️ This simple form executes silently, performing an action on the user’s behalf.

---

## ⚙️ **Why It Works**

* 🌐 Browsers **automatically attach cookies** (e.g., `sessionId`) to requests.
* 🧾 HTML forms and images can **send cross-site POST/GET requests**.
* 🚫 The server **cannot distinguish** between a legitimate and forged request **by default**.

---

## 🔐 **How to Prevent CSRF**

### 1️⃣ **Use `SameSite` Cookies**

Setting the `SameSite` attribute tells browsers **when to include cookies in cross-site requests**.

```http
Set-Cookie: sessionId=abc123; SameSite=Lax; Secure; HttpOnly
```

**Modes:**

* `SameSite=Lax` ➔ Blocks cookies on most cross-origin POSTs, but allows on top-level navigations.
* `SameSite=Strict` ➔ Most restrictive, blocks cookies on *all* cross-origin requests.

🧠 **Tip:** Combine with `Secure` + `HttpOnly` for maximum safety.

---

### 2️⃣ **Use CSRF Tokens (Anti-CSRF Tokens)**

* 🔑 Server generates a **unique token** for each user/session.
* 🤱 Token is embedded in every HTML form or AJAX request.
* 🤩 Server **verifies the token** before processing any state-changing operation (POST, PUT, DELETE).

✅ Since the attacker’s page can’t **read or guess the token**, their forged requests will fail.

---

### 3️⃣ **Use Custom Headers + CORS Validation**

* 🧾 Require a custom header like `X-CSRF-Token` or `X-Requested-With`.
* 🚫 Browsers block **custom headers on cross-origin requests** unless explicitly allowed by CORS.
* 🔍 Thus, attacker’s forms or images can’t include such headers.

---

## 💡 **TL;DR Summary**

> **CSRF**: Tricks a logged-in user’s browser into sending **unwanted requests** to a trusted site.

### 🛡️ **Mitigation Checklist**

* ✅ Use cookies with `SameSite=Lax` or `Strict`
* ✅ Implement **CSRF tokens** (a.k.a. **Anti-CSRF/XSRF tokens**)
* ✅ Require **custom headers** and properly validate **CORS**

---

> 🤩 **Final Note:**
> Never trust the request — always **verify the user’s intent** behind it.
> Protect your users by ensuring **every state-changing request** is **authentic, intentional, and secure**.
