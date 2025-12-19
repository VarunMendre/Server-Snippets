# Stripe Payment Flow - Node.js & Next.js

This project demonstrates a simple payment flow using Node.js (Express) for the backend and Next.js for the frontend, integrated with Stripe Checkout.

## Features

-   **Backend:** Express server handling Stripe session creation and payment verification.
-   **Frontend:** Next.js application with a clean UI to initiate payments.
-   **Stripe Integration:** Secure checkout flow using Stripe's hosted payment page.
-   **Payment Verification:** Verifies payment status via the backend.

## Project Structure

```
├── app.js               # Backend Express server
├── my-payment-app/      # Frontend Next.js application
│   ├── app/
│   │   ├── page.tsx     # Home page (Product display & "Pay Now")
│   │   └── success/     # Payment success page
```

## Prerequisites

-   Node.js installed
-   A Stripe account (for API keys)

## Setup & Installation

### 1. Backend Setup

1.  Navigate to the root directory.
2.  Install dependencies:
    ```bash
    npm install express stripe cors
    ```
3.  **Important:** Replace the hardcoded Stripe Secret Key in `app.js` with your own test key from the Stripe Dashboard.
    ```javascript
    const stripe = new Stripe("sk_test_...");
    ```
4.  Start the backend server:
    ```bash
    node app.js
    ```
    The server runs on `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd my-payment-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app runs on `http://localhost:3000`.

## How It Works

1.  **Initiate Payment:**
    -   User clicks "Pay Now" on the frontend.
    -   Frontend calls `POST /create-checkout-session` on the backend.
    -   Backend creates a Stripe Session and returns a URL.
    -   Frontend redirects the user to the Stripe Checkout page.

2.  **Process Payment:**
    -   User completes payment on Stripe.
    -   Stripe redirects the user back to `http://localhost:3000/success?session_id=...`.

3.  **Verify Payment:**
    -   The `/success` page extracts the `session_id` from the URL.
    -   It calls `POST /verify-payment` on the backend.
    -   Backend retrieves the session from Stripe to confirm `payment_status` is `paid`.
    -   Frontend displays the success message and course content.

## API Endpoints

### `POST /create-checkout-session`
-   **Description:** Creates a new Stripe Checkout session.
-   **Response:** JSON object containing the `url` for redirection.

### `POST /verify-payment`
-   **Body:** `{ "sessionId": "cs_test_..." }`
-   **Description:** Verifies if a session was paid.
-   **Response:** `{ "paid": true, "detail": "..." }`

## License

MIT
