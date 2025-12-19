import Stripe from "stripe";
import express from "express";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from Next.js app
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Initialize Stripe with secret key
const stripe = new Stripe(
  "sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u"
);

// Endpoint to create a Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const newCheckoutSession = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel", // Redirect here if user cancels payment
      line_items: [
        {
          price: "price_1SZx1S0lFnwouU5DxE7gjmWl",
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    res.status(201).json({ url: newCheckoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to verify payment status using Session ID
app.post("/verify-payment", async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the payment was successful
    if (session.payment_status === "paid") {
      return res.status(200).json({ paid: true, detail: "Payment successful" });
    }

    return res.status(200).json({ paid: false, detail: "Payment not successful" });
  } catch (err) {
    console.error("Error verifying payment:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
