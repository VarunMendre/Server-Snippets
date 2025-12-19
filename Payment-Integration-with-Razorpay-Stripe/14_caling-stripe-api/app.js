console.log("Checkout sessions :");
const response = await fetch(
  "https://api.stripe.com/v1/checkout/sessions?limit=100",
  {
    headers: {
      Authorization:
        "Bearer sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u",
    },
  }
);

const data = await response.json();
console.log(data);

console.log("payment intents :");
const response1 = await fetch(
  "https://api.stripe.com/v1/payment_intents?limit=100",
  {
    headers: {
      Authorization:
        "Bearer sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u",
    },
  }
);

const data1 = await response1.json();
console.log(data1);


console.log("Charges :");
const response2 = await fetch(
  "https://api.stripe.com/v1/charges?limit=100&payment_intent=pi_3ScSX40lFnwouU5D0hbxhFty",
  {
    headers: {
      Authorization:
        "Bearer sk_test_51SZwvz0lFnwouU5D6o1iZvDsf4Xrk16vbl80Fgj6fXcHbvIAHpeCb19Vj1AM348nHm8TNShBZ2rqvbuirZwMYI5c00tycaum2u",
    },
  }
);

const data2 = await response2.json();
console.log(data2);