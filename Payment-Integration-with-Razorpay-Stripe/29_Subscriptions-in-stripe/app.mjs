import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u"
);

const newCheckOutSession = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [
    {
      price: "price_1Sfy9w0lFnwouU5DzaN6lBkd",
      quantity: 1,
    },
  ],
  success_url: "https://example.com/success",
});

console.log(newCheckOutSession.url);
