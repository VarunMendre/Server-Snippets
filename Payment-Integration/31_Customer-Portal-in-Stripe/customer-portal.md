# 🧩 What is Stripe’s **Customer Portal**

Stripe’s **Customer Portal** is a **secure, prebuilt billing interface** hosted by Stripe that lets your customers **manage their own subscriptions and billing details** — **without you writing any extra code**.

Think of it as a **“self-service dashboard”** for your customers, powered by Stripe.

---

### 🔒 What customers can do in the portal

Depending on what you enable in the settings, customers can:

| Action                        | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| 💳 **Update payment method**  | Add, remove, or update saved cards/bank accounts |
| 📅 **View billing history**   | See all previous invoices and receipts           |
| 🔁 **Manage subscriptions**   | Upgrade, downgrade, cancel, or resume their plan |
| 💼 **Change quantity**        | Adjust seats, usage limits, etc.                 |
| 📄 **Download invoices**      | Download PDFs of past invoices                   |
| 🧾 **View tax information**   | See applied taxes, tax IDs, etc.                 |
| 🔐 **Update billing address** | Edit billing details securely                    |

All of this happens on a **Stripe-hosted page**, so you don’t need to handle card data or compliance (Stripe handles PCI-DSS and security for you).

---

## ⚙️ How it works technically

1. You (the developer) **create a “Customer Portal Session”** for a specific customer using Stripe’s API.
2. Stripe returns a **short-lived URL** like:
   ```
   https://billing.stripe.com/p/session/abc123xyz
   ```
3. You redirect your customer to this URL.
4. Stripe automatically displays the portal with all your configured options.
5. After the user finishes, Stripe redirects them back to your website’s `return_url`.

---

## 🧾 Example: Creating a Customer Portal URL

### ✅ Using **Stripe API (Node.js)**

```js
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: "https://yourwebsite.com/account",
});
console.log("Customer Portal URL:", session.url);
```

Output:

```json
{
  "id": "bps_1Sy8lWQejmbJMlIqV6OzxJ8P",
  "object": "billing_portal.session",
  "url": "https://billing.stripe.com/p/session/abcd1234xyz",
  ...
}
```

You can then redirect your customer to `session.url`.

---

### ✅ Using **Postman**

**Method:** `POST`  
**URL:** `https://api.stripe.com/v1/billing_portal/sessions`

**Headers:**

```
Authorization: Bearer sk_test_YOUR_SECRET_KEY
```

**Body (x-www-form-urlencoded):**
| Key | Value |
|-----|--------|
| `customer` | `cus_1234abcd5678` |
| `return_url` | `https://yourwebsite.com/account` |

Click **Send**, and Stripe will return a JSON response with the portal URL.

---

### ⚠️ Note about expiry

- This URL is **short-lived** — typically expires **after 1 hour** of inactivity or **5 minutes if unopened**.
- Always generate a **new portal session URL** whenever the user clicks “Manage billing.”

---

## 🧰 Optional advanced features

You can **customize** what appears in the portal:

- Enable or disable specific features (like cancellation or plan switching)
- Set **proration** and **billing rules** for upgrades/downgrades
- Configure color themes and branding (logo, colors, etc.)

👉 All these can be found under  
**Stripe Dashboard → Settings → Billing → Customer Portal**

---

## 🔐 Why you should use it

- You don’t handle card details directly → **No PCI compliance headache**
- Customers can self-manage → **Fewer support tickets**
- Works automatically with your subscriptions and invoices
- Secure and up-to-date UI, maintained by Stripe