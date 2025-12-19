# Stripe Invoices & Receipts — Deep Dive

> This document explains **everything** important about Stripe invoices and receipts: what they are, when and how they’re created, lifecycle states, customization, tax/proration/discount behavior, webhooks and events to watch, accounting concerns, troubleshooting tips, and best practices.

---

## 1. High-level overview

**Invoice (Stripe)** — A structured billing document Stripe generates to bill a customer for one-time charges, subscription cycles, or a combination. It bundles *invoice items* (line items) and contains details like amounts, taxes, discounts, payment status, PDFs, and a hosted invoice URL.

**Receipt (Stripe)** — A simple proof-of-payment document Stripe can email to customers after a successful payment (charge) or refund. Receipts are generally tied to **Charges** (or PaymentIntents) and are different from invoices: receipts show *payment confirmation*, while invoices show *what was billed and why*.

Use-cases:
- Subscriptions: Stripe generates an **invoice** each billing cycle to collect the recurring payment.
- One-off billing: You can create an invoice for ad-hoc charges (e.g., professional services).
- Receipts: Sent automatically (if enabled) after successful charge or refund to confirm payment.

---

## 2. When & why an Invoice is created

### Automatic/triggers
- **Subscription billing cycle:** For `collection_method=charge_automatically`, Stripe creates an invoice at the start (or end depending on settings) of a subscription period and attempts payment automatically. This is the most common trigger.
- **Subscription with collection_method=send_invoice:** Stripe creates the invoice but does not automatically charge the customer — it sends the invoice for manual payment.
- **One-off invoices:** You can create invoices via the API for single charges (e.g., consulting work). These are created as `draft` by default.
- **Upcoming invoices preview:** When you call the `/v1/invoices/upcoming` endpoint, Stripe builds a preview (not yet a saved invoice) to show proration, taxes, and totals.
- **Billing thresholds / metered usage:** When usage or billing thresholds are reached, Stripe can create an invoice to bill for metered charges.
- **Invoice finalization via API or dashboard:** A draft invoice can be finalized (converted to an `open` invoice) either manually or programmatically.

### Why create an invoice?
- **Recordkeeping & accounting**: Invoices provide a legal proof of what was owed and when; they’re useful for VAT/GST and bookkeeping.
- **Complex billing**: When you have multiple invoice items, taxes, discounts, and payment terms, an invoice cleanly aggregates them.
- **Manual payment workflows**: Businesses that allow bank transfers, checks, or delayed payments use invoices with `collection_method=send_invoice` and `days_until_due`.

---

## 3. Invoice lifecycle & statuses (what each means)

Primary Invoice statuses you’ll encounter:

- **draft** — The invoice exists but is editable; not finalized and not billable. Use this to add/remove invoice items, set metadata, or preview totals before finalizing.
- **open** — The invoice has been finalized and is awaiting payment. If `collection_method=charge_automatically`, Stripe will try to pay; if `send_invoice`, Stripe will email the invoice.
- **paid** — The invoice was fully paid. This happens after a successful payment (one or multiple partial payments that sum to the total).
- **uncollectible** — Stripe marks invoices uncollectible when payment ultimately failed and you’ve decided not to continue collection (e.g., write-off). This can be set manually or by invoice settings/logic after retries fail.
- **void** — The invoice has been voided; it will not be paid and is not active for accounting.

Key states/transitions:
- `draft` → **finalize** → `open` (finalized, ready to pay)
- `open` → **payment success** → `paid`
- `open` → **payment fail** + retries → `uncollectible` (or you can void)
- `open` → **voided** → `void`

**Note:** Finalization computes totals, applies proration, and creates an underlying `Charge` or `PaymentIntent` when payment is attempted.

---

## 4. Important invoice fields and what they do

- **customer** — Reference to the Customer object the invoice is billed to.
- **collection_method** — `charge_automatically` or `send_invoice`. Determines whether Stripe charges the customer's default payment method or sends an invoice to be paid manually.
- **days_until_due** — When `send_invoice` is used, this sets the net-terms (e.g., 30 days).
- **invoice_items / lines** — Line items that make up the invoice (products, usage, etc.). Each has description, quantity, unit_amount, tax behavior.
- **subtotal, total, tax** — Computed fields. `total = subtotal + tax - discounts + adjustments`.
- **status** — `draft | open | paid | uncollectible | void`.
- **hosted_invoice_url** — A Stripe-hosted page where customers can view/pay the invoice.
- **invoice_pdf** — A downloadable PDF of the invoice.
- **metadata** — Custom key-value pairs useful for reconciliation and bookkeeping.
- **default_payment_method / default_source** — The payment method that Stripe will attempt to use when charging automatically.
- **payment_intent** — If the invoice triggers a PaymentIntent (for Strong Customer Authentication or 3DS), it’s linked here.

---

## 5. Drafting, finalizing, and paying invoices (step-by-step)

1. **Create a draft invoice** (`status=draft`): Add invoice items, set metadata, taxes, due date, and customer.
2. **Preview/Validate**: Use `/invoices/upcoming` to preview what will be charged — this helps with proration previews for subscription changes.
3. **Finalize** the invoice: Stripe calculates totals, applies taxes and discounts, and transitions the invoice to `open`. If the invoice should auto-charge, Stripe will attempt to charge the customer’s payment method and create/attach a PaymentIntent.
4. **Payment attempt**:
   - If `charge_automatically`: Stripe creates/uses a PaymentIntent and attempts payment. If successful → invoice becomes `paid` and a receipt is generated for the charge.
   - If `send_invoice`: Stripe emails the invoice; the customer follows the `hosted_invoice_url` to pay manually (card, bank transfer where supported). Payment updates the invoice to `paid`.
5. **After payment**: Receipt (email) can be sent automatically for charges. You’ll also get webhook events for `invoice.payment_succeeded` or `invoice.payment_failed` to update your system.

---

## 6. Receipts: when and how they’re created

- **Receipts are generated for successful charges** (linked to a Charge or PaymentIntent). For payments triggered by invoices, Stripe generates receipts after the charge completes.
- **Refund receipts**: When you refund a charge, Stripe can send a refund receipt to the customer.
- **Emailing**: Stripe can automatically email receipts if `email_receipts` is enabled in Stripe Dashboard or via API on a per-charge basis. You can also manually trigger sending receipts through the dashboard or API.
- **Contents**: Receipts include payment amount, date, last 4 of card, billing address (optionally), merchant details, and a link to the invoice (if applicable).

**Important difference**: An *invoice PDF* is a billing document (line-itemed bill). A *receipt* is evidence of payment for a specific Charge.

---

## 7. Taxes, VAT, and localization

- **Stripe Tax** integration or manual tax lines can be applied to invoices. When enabled, Stripe calculates tax rates automatically based on customer location and product tax behavior.
- **VAT/GST/Local taxes**: Include `tax_rates` on invoice items or enable Stripe Tax to automatically apply region-specific taxes, collect VAT IDs, and create tax reports.
- **Localization**: Hosted invoice pages and emails can be localized by setting `locale` and by configuring templates in Dashboard.

---

## 8. Discounts, coupons, prorations & credits

- **Coupons / Discounts**: Attach at the invoice or customer level. Discounts reduce subtotal and are reflected on the invoice.
- **Proration**: When changing subscriptions mid-cycle, Stripe computes prorated invoice items and adds them to the upcoming invoice (visible in `/invoices/upcoming`), or when finalizing the invoice.
- **Credit notes & refunds**: If you need to reduce an already-paid invoice, create a **credit note**. Credit notes can be applied to invoices and will result in a negative line item and optional refund to the customer.

---

## 9. Payment attempts, retries, and dunning

- **Retries**: Stripe can auto-retry failed payments depending on your settings. Retries occur for temporary failures (insufficient funds, bank timeouts, etc.).
- **Dunning**: For subscription-based businesses, configure a dunning strategy in the Dashboard (email reminders, retries, pause/ cancel on failure). Dunning helps recover failed payments and reduces churn.
- **Uncollectible**: After retries and dunning rules are exhausted you can mark invoices `uncollectible` (often used for write-offs).

---

## 10. Hosted Invoice Pages and PDF

- **Hosted invoice URL** (`hosted_invoice_url`) is a Stripe-managed page for customers to view/pay the invoice. It supports 3D Secure flows via PaymentIntents if required.
- **Invoice PDF**: Generated by Stripe and available at `invoice_pdf`. Use for accounting and sending attachments.
- **Customization**: Customize logo, business address, and wording in the Dashboard (Branding settings). You can also provide custom fields as `metadata` and `footer` lines.

---

## 11. Webhooks & events to listen to

Watch these events to fully automate invoice/payment handling:
- `invoice.created` — Draft or open invoice created.
- `invoice.finalized` — Invoice finalized and totals locked in.
- `invoice.sent` — Email sent (for `send_invoice`).
- `invoice.payment_succeeded` — Invoice payment completed.
- `invoice.payment_failed` — Payment failed; use to trigger dunning emails or actions.
- `invoice.updated` — Status or fields changed.
- `invoice.marked_uncollectible` — Invoice was marked uncollectible.
- `charge.refunded` or `charge.succeeded` — Useful because invoice payments create charges; receipts are linked to those.

**Best practice:** Subscribe to `invoice.*` and `payment_intent.*` events. Verify webhook signatures and idempotency to avoid double-processing.

---

## 12. Accounting & reconciliation tips

- **Use `metadata` liberally** on invoices (e.g., order_id, project_id, internal references). `metadata` is shown in Dashboard and in exported reports.
- **Record payment_intent/charge IDs** in your ledger so you can map accounting entries to Stripe payouts and transfers.
- **Payout timing vs invoice payment timing**: When an invoice is paid, the funds go to your Stripe balance; payouts to your bank follow your Stripe payout schedule (delay depends on region and account health). Reconcile based on the `payout` objects rather than invoice paid times if you need bank deposit matching.
- **Exporting**: Use the Stripe Dashboard or Reports API to export invoice and payment data for taxes and bookkeeping.

---

## 13. Edge cases & gotchas

- **Strong Customer Authentication (SCA) / 3D Secure**: If a payment requires SCA, Stripe will create a PaymentIntent and may require customer action (3DS) on the hosted_invoice_url. The invoice will remain `open` until the PaymentIntent succeeds.
- **Partially paid invoices**: Stripe supports partial payments (multiple charges applied), and the invoice becomes `paid` only when balance is zero.
- **Multiple currencies**: Invoices are in a single currency. If you accept cross-currency payments, be careful to store currency on invoice and charges for accurate accounting.
- **Idempotency**: When creating invoices and associated invoice items programmatically, use idempotency keys to avoid duplicate invoices on retries.
- **Switching collection_method** mid-cycle: Changing from `charge_automatically` to `send_invoice` after draft creation affects how payment is collected—be explicit in logic.

---

## 14. Common API workflows (conceptual)

- **Create one-off invoice**:
  1. Create `invoiceitem`(s) for customer.
  2. Create `invoice` in draft.
  3. Finalize invoice.
  4. If `charge_automatically`, Stripe will attempt payment; otherwise send invoice.

- **Subscription invoice flow**:
  1. Customer subscribes → subscription starts.
  2. Stripe schedules and creates invoice at billing time.
  3. Finalizes & charges using default payment method → `invoice.payment_succeeded`.

- **Preview/proration**:
  - Use `/invoices/upcoming` to preview results before actually creating or finalizing.

---

## 15. Testing and sandbox behavior

- **Test mode**: Use Stripe test keys. Invoice and receipt behavior is identical except emails may be suppressed based on Dashboard settings.
- **Test cards**: Use Stripe’s test cards to simulate success, failure, SCA, disputes, etc. Ensure you simulate failed charges to test dunning logic.

---

## 16. Troubleshooting common problems

- **Invoice not charging**: Check `collection_method` and whether a `default_payment_method` is set. Inspect `invoice.*` and `payment_intent.*` events.
- **Customer didn’t receive invoice email**: Confirm `billing` email on customer, check Dashboard email settings, and `invoice.sent` webhook.
- **Invoice shows wrong tax**: Verify `tax_rates` on line items or enable Stripe Tax and check customer address region.
- **Payment required action (3DS)**: Use `payment_intent.status` and the `hosted_invoice_url` for customer flow. Listen to `payment_intent.requires_action` and `invoice.payment_action_required` (if used).

---

## 17. Best practices summary

- Use `metadata` for reconciliation and searching.
- Preview invoices `/upcoming` before finalizing to avoid surprises.
- Wire webhooks for `invoice.*`, `payment_intent.*`, and `charge.*` and verify signatures.
- Configure dunning and retries in Dashboard for subscriptions.
- Use hosted invoice URL for seamless customer payment flows and for SCA compliance.
- Keep tax settings centralized via Stripe Tax if you have multi-region customers.
- Use `send_invoice` + `days_until_due` for net terms workflows; use `charge_automatically` for subscriptions with stored payment methods.

---

## 18. Helpful further reading (official docs you should scan)
- Stripe Invoices overview — `https://stripe.com/docs/invoicing`
- PaymentIntents and SCA — `https://stripe.com/docs/payments/payment-intents`
- Receipts & emails — `https://stripe.com/docs/receipts`
- Managing subscriptions & proration — `https://stripe.com/docs/billing/subscriptions`
- Webhooks for invoices — `https://stripe.com/docs/webhooks/events` 


---

If you want, I can now:
- Add example code snippets (Node.js / Python) for creating & finalizing invoices and handling webhooks.
- Create a flow diagram (PNG/SVG) showing the invoice lifecycle and webhook events.
- Add a one-page checklist for migrations from manual billing to Stripe invoices.

Tell me which of the above to add and I’ll include it in this canvas.

