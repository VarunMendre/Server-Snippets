# Is our current flow okay?

**Our Current flow:**

1. Front-end gets success callback → sends `order_id` to backend
2. Backend verifies with Razorpay → updates subscription
3. If front-end dies, you’ll verify later on the _next user visit_ by looking up the saved `order_id`.

**Pros**

- Simple, fewer moving parts.
- No public webhook endpoint to secure initially.
- Works even if the first round-trip fails (eventual consistency when user returns).

**Cons / blind spots**

- **Delayed entitlements & ops:** If the user pays and never comes back, you’ll under-report revenue, skip emails/invoices, GST entries, affiliate attribution, etc., until much later.
- **No server-side source of truth:** If the tab closes before sending anything, your backend stays “blind” until the user reappears.
- **Time-sensitive products:** Anything that must trigger _now_ (seat allocation, shipping workflow) will lag.
- **Support noise:** Users may pay, close the app, and then contact support because they didn’t get an email/receipt/activation immediately.

---

## When “immediate update” matters (even if the front-end fails)

Real examples where **webhooks + server-side verification** are critical:

- **Seat/Inventory allocation**

  - Event tickets, workshops with limited seats, flash sales—must reserve/confirm **right when payment captures** to prevent overselling.

- **Physical order fulfillment**

  - As soon as payment is captured, an **ops workflow** (pick/pack/ship) or **vendor webhook** must trigger—can’t wait for the buyer to reopen your app.

- **Live / time-bound access**

  - Webinars, live classes, limited-time streams—access must start immediately on capture; the user may join on another device without reopening your app.

- **Regulatory / bookkeeping**

  - Auto-generate invoices, post accounting entries, update GST ledgers the moment funds are captured; these should not depend on user return.

---

## TL;DR

- Our “verify when user returns” plan is okay as a fallback.
- For production reliability and instant operations, **add webhooks**.
- This gives you: immediate activations when needed, correct books, fewer support tickets, and no dependency on the client surviving long enough to talk to your backend.
