import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u"
);


// const newCheckoutSession = await stripe.checkout.sessions.create({
//   success_url: "https://google.com/",
//   line_items: [
//     {
//       price: "price_1SZx1S0lFnwouU5DxE7gjmWl",
//       quantity: 2,
//     },
//   ],
//   mode: "payment"
// });

const newCheckoutSession = await stripe.checkout.sessions.create({
  success_url: "https://google.com?session_id={CHECKOUT_SESSION_ID}",
  billing_address_collection: 'required',
  customer_email: "varunmendre@asmedu.org",
  line_items: [
    {
      price_data: {
        product_data: {
          name: "T-shirt",
          description: "Comfortable cotton polo shirt",
          images: [
            "https://imgs.search.brave.com/I5kJQq8UNojBXCkLRgaLIr5W7CIi9cPhKI9xFuM5q0A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbnRv/bmlvc2Nsb3RoaW5n/LmNvbS9jZG4vc2hv/cC9maWxlcy9TZTcw/OWI3YTFiZjBkNDVm/Y2I0MzYyMjI4NGRj/ZTkwZmI3LndlYnA_/dj0xNzQxMDI3Mzk0/JndpZHRoPTE1MDA",
          ],
        },
        unit_amount: 20000,
        currency: "usd",
      },
      adjustable_quantity: {
        enabled: true,
      },
      quantity: 1,
    },
    {
      price_data: {
        product_data: {
          name: "T-shirt",
          description: "Comfortable cotton Blue polo shirt",
          images: [
            "https://imgs.search.brave.com/N7DTCjR72uqd3r7blFATJu-CjYylmVpzNPPSFHfA3LU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZS1vbGQtbW9uZXku/Y29tL2Nkbi9zaG9w/L2ZpbGVzL1QtU2hp/cnQtUG9sby1PbGQt/TW9uZXktOS53ZWJw/P2Nyb3A9Y2VudGVy/JmhlaWdodD03MjAm/dj0xNzIwMjAzNjQz/JndpZHRoPTcyMA",
          ],
        },
        unit_amount: 30000,
        currency: "usd",
      },
      adjustable_quantity: {
        enabled: true,
      },
      quantity: 1,
    },
  ],
  mode: "payment",
});

console.log(newCheckoutSession.url);


// on UI give pay button xyz amount then he will call this checkout.session.create API and BE will give the URL to FE and FE will redirect on success page 
// then on from that success page take session id send it to verify-payment endpoint and verify it the payment is success or not, and send the response 