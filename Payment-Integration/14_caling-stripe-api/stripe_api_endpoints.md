# Stripe API – Important Endpoints Overview

This document contains the **most important Stripe API endpoints**, grouped by category, along with **official documentation links** and short explanations.

---

# 📌 1. Customers API
Manage users who will be billed.

### **Create Customer**
```
POST /v1/customers
```
Docs: https://stripe.com/docs/api/customers/create

### **Retrieve Customer**
```
GET /v1/customers/{id}
```
Docs: https://stripe.com/docs/api/customers/retrieve

### **Update Customer**
```
POST /v1/customers/{id}
```
Docs: https://stripe.com/docs/api/customers/update

### **Delete Customer**
```
DELETE /v1/customers/{id}
```
Docs: https://stripe.com/docs/api/customers/delete

---

# 📌 2. Payment Intents API (Core Payment Flow)
Used for processing payments (cards, UPI, wallets, etc.).

### **Create PaymentIntent**
```
POST /v1/payment_intents
```
Docs: https://stripe.com/docs/api/payment_intents/create

### **Confirm PaymentIntent**
```
POST /v1/payment_intents/{id}/confirm
```
Docs: https://stripe.com/docs/api/payment_intents/confirm

### **Retrieve PaymentIntent**
```
GET /v1/payment_intents/{id}
```
Docs: https://stripe.com/docs/api/payment_intents/retrieve

---

# 📌 3. Setup Intents API
Used to **save payment methods** for later.

### **Create SetupIntent**
```
POST /v1/setup_intents
```
Docs: https://stripe.com/docs/api/setup_intents/create

---

# 📌 4. Payment Methods API
Store and manage cards, UPI, wallets.

### **Attach Payment Method**
```
POST /v1/payment_methods/{pm_id}/attach
```
Docs: https://stripe.com/docs/api/payment_methods/attach

### **Detach Payment Method**
```
POST /v1/payment_methods/{pm_id}/detach
```
Docs: https://stripe.com/docs/api/payment_methods/detach

---

# 📌 5. Charges API
(Old method, still used for some systems)

### **Create Charge**
```
POST /v1/charges
```
Docs: https://stripe.com/docs/api/charges/create

### **Retrieve Charge**
```
GET /v1/charges/{id}
```
Docs: https://stripe.com/docs/api/charges/retrieve

---

# 📌 6. Refunds API

### **Create Refund**
```
POST /v1/refunds
```
Docs: https://stripe.com/docs/api/refunds/create

### **Retrieve Refund**
```
GET /v1/refunds/{id}
```
Docs: https://stripe.com/docs/api/refunds/retrieve

---

# 📌 7. Checkout Sessions API
Used for Stripe-hosted checkout page.

### **Create Checkout Session**
```
POST /v1/checkout/sessions
```
Docs: https://stripe.com/docs/api/checkout/sessions/create

### **Retrieve Checkout Session**
```
GET /v1/checkout/sessions/{id}
```
Docs: https://stripe.com/docs/api/checkout/sessions/retrieve

---

# 📌 8. Invoices API
Used for billing customers.

### **Create Invoice**
```
POST /v1/invoices
```
Docs: https://stripe.com/docs/api/invoices/create

### **Finalize Invoice**
```
POST /v1/invoices/{id}/finalize
```
Docs: https://stripe.com/docs/api/invoices/finalize

### **Pay Invoice Manually**
```
POST /v1/invoices/{id}/pay
```
Docs: https://stripe.com/docs/api/invoices/pay

---

# 📌 9. Invoice Items API
Add items before creating an invoice.

### **Create Invoice Item**
```
POST /v1/invoiceitems
```
Docs: https://stripe.com/docs/api/invoiceitems/create

---

# 📌 10. Products & Prices API
Used to create catalog items.

### **Create Product**
```
POST /v1/products
```
Docs: https://stripe.com/docs/api/products/create

### **Create Price**
```
POST /v1/prices
```
Docs: https://stripe.com/docs/api/prices/create

---

# 📌 11. Subscriptions API
Used for recurring billing.

### **Create Subscription**
```
POST /v1/subscriptions
```
Docs: https://stripe.com/docs/api/subscriptions/create

### **Retrieve Subscription**
```
GET /v1/subscriptions/{id}
```
Docs: https://stripe.com/docs/api/subscriptions/retrieve

---

# 📌 12. Webhook Endpoints API
Used to register webhook receivers.

### **Create Webhook Endpoint**
```
POST /v1/webhook_endpoints
```
Docs: https://stripe.com/docs/api/webhook_endpoints/create

---

# 📌 13. Balances / Payouts API
For platforms & connected accounts.

### **Retrieve Balance**
```
GET /v1/balance
```
Docs: https://stripe.com/docs/api/balance/balance_retrieve

### **Create Payout**
```
POST /v1/payouts
```
Docs: https://stripe.com/docs/api/payouts/create

---

# 📌 14. Events API
Retrieve events triggered by Stripe.
```
GET /v1/events
GET /v1/events/{id}
```
Docs: https://stripe.com/docs/api/events

---

# 📌 Official Stripe Tools & Resources
- API Reference: https://stripe.com/docs/api
- Stripe CLI: https://stripe.com/docs/stripe-cli
- Postman Collection: https://stripe.com/docs/development/postman
- Webhooks Guide: https://stripe.com/docs/webhooks
- Checkout Guide: https://stripe.com/docs/checkout
- Invoicing Guide: https://stripe.com/docs/invoicing

---
If you want, I can generate:
- A **full API cheat sheet**
- **Node.js example code for every endpoint**
- A **PDF export**
Just tell me!

