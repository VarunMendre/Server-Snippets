# 🌐 What Are Webhooks?

A **webhook is nothing but an HTTP endpoint** that your server exposes, and another service (like Razorpay, GitHub, Stripe, etc.) makes an **HTTP call (usually POST)** to this endpoint whenever an event happens.

* The provider sends **data in the request body** (often JSON).
* Your code at that endpoint handles it (update database, send email, confirm payment, etc.).

So, you can think of webhooks as:
👉 *“Instead of you calling an API repeatedly to check for updates, the API calls you when something happens.”*

---

## ⚙️ Where Do We Use Webhooks?

* **Payment gateways** → Confirm order completion (Stripe `payment_intent.succeeded`, Razorpay `order.paid`).
* **Version control** → GitHub notifies your app when code is pushed.
* **Communication apps** → Slack or Discord call your endpoint when a message or event occurs.
* **Automation** → Services like Zapier/IFTTT chain together multiple apps using webhooks.

Basically, anytime you want to be **notified automatically** without polling, a webhook fits.

---

## 🕸️ About the Term *Webhook*

Here’s something important (that most docs don’t spell out):

* “Webhook” is **not an official W3C or IETF web standard**.
* You won’t find a canonical definition in RFCs, MDN, or standards docs.
* It’s simply a **convention and a naming term** that became popular.

The word “hook” comes from programming (like *hooks* in WordPress, Git, or event systems) → meaning *“a place where you can attach custom behavior when something happens.”* Combine that with “web” (because it’s over HTTP), and you get **webhook**.

So, despite sounding fancy, a webhook is *just* an HTTP callback.

---

## 🔗 Comparing with WebSockets

Sometimes beginners confuse **webhooks** with **WebSockets** because both terms look similar.

* **WebSockets**: A real web standard (RFC 6455), full-duplex persistent connection between client and server. Great for chat, games, real-time apps.
* **Webhooks**: Not a protocol, not a persistent connection — just a simple one-off HTTP POST to your endpoint whenever an event occurs.

So while *WebSocket* sounds very “techy and fancy,” **webhooks are the plain and humble cousin — just HTTP requests**. No magic at all.

---

✅ In short:
**Webhooks are nothing more than HTTP endpoints where APIs push data when an event occurs.** The term sounds like a formal standard, but it’s really just a convention the industry adopted — simple, lightweight, and very useful.