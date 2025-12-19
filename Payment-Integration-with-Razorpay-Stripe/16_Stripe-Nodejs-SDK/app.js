import Stripe from "stripe";

/*
|--------------------------------------------------------------------------
| Initialize Stripe
|--------------------------------------------------------------------------
| ⚠️ IMPORTANT:
| Never hardcode your Stripe Secret Key in production or public repositories.
| Always use environment variables instead.
|
| Example:
| const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
|--------------------------------------------------------------------------
*/

const stripe = new Stripe("sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

/*
|--------------------------------------------------------------------------
| Stripe API Examples (For Learning / Debugging)
|--------------------------------------------------------------------------
| Uncomment any block to test a specific Stripe feature
|--------------------------------------------------------------------------
*/

// List all customers
// const customers = await stripe.customers.list();
// console.log(customers);

// List checkout sessions (default)
// const { data } = await stripe.checkout.sessions.list();
// console.log(data);

// List checkout sessions with limit
// const { data } = await stripe.checkout.sessions.list({
//   limit: 100,
// });
// console.log(data);

// Retrieve a specific checkout session
// const session = await stripe.checkout.sessions.retrieve(
//   "cs_test_XXXXXXXXXXXXXXXXXXXXXXXX"
// );
// console.log(session);

// Retrieve a payment intent
// const paymentIntent = await stripe.paymentIntents.retrieve(
//   "pi_XXXXXXXXXXXXXXXXXXXXXXXX"
// );
// console.log(paymentIntent);

// List all charges
// const charges = await stripe.charges.list();
// console.log(charges);

// Retrieve a specific charge
// const charge = await stripe.charges.retrieve(
//   "ch_XXXXXXXXXXXXXXXXXXXXXXXX"
// );
// console.log(charge);

/*
|--------------------------------------------------------------------------
| List Charges for a Specific Payment Intent
|--------------------------------------------------------------------------
*/

const charges = await stripe.charges.list({
  payment_intent: "pi_3ScSX40lFnwouU5D0hbxhFty",
});

console.log(charges);
