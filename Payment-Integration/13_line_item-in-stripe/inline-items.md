# Inline Items in Stripe

Inline items refer to **line items that are created directly inside an API call**, rather than being created as separate products or prices in the Stripe dashboard.

They are commonly used in:
- **Checkout Sessions** (one-time custom payments)
- **Payment Links** (quick payments without predefined products)
- **Invoices** (custom billable items)

---

## ✅ Why Inline Items Are Used
- For **ad-hoc charges** (e.g., “Consulting Fee – ₹2000”).
- When you **don’t want to store products/prices** permanently.
- For **dynamic amounts** decided during runtime.
- For **custom descriptions** per transaction.

---

## 🧩 Where Inline Line Items Are Used

### 1. **Checkout Session Inline Items**
Useful when charging a user once.
```js
line_items: [
  {
    price_data: {
      currency: "inr",
      product_data: {
        name: "Custom Service Fee",
      },
      unit_amount: 150000,
    },
    quantity: 1,
  }
]
```

### 2. **Invoice Inline Items**
Used when generating custom invoices.
```js
invoice_items.create({
  customer: customerId,
  description: "Consulting - 3 hours",
  amount: 30000,
  currency: "inr"
});
```

### 3. **Payment Link Inline Items**
Payment links normally use saved products, but you can embed inline pricing using API.

---

## ⭐ Benefits
- Fully dynamic pricing.
- No need to store Products/Prices.
- Clean for temporary payments.
- Good for one-time invoices & service-based businesses.

---

## ⚠️ Limitations
- Inline items **cannot be reused**.
- Not ideal for e-commerce catalogs.
- Harder to track long-term analytics.

---

## Summary Table
| Feature | Inline Items | Saved Products/Prices |
|--------|--------------|------------------------|
| Reusable | ❌ No | ✅ Yes |
| Flexible Amount | ✅ Yes | ❌ Fixed |
| Good for Invoices | ✅ | 🟡 Sometimes |
| Good for store/e-commerce | ❌ No | ✅ Yes |

---
Let me know if you want an **extended version**, code examples for **Node.js / Express**, or **diagrams**!