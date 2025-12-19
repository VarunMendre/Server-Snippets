import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: process.env.RZP_TEST_KEY_ID,
  key_secret: process.env.RZP_TEST_CLIENT_SECRET,
});

// const data = await instance.payments.all({count:1});

// Single payment
// const data = await instance.payments.fetch("pay_RnVhje8LcWa9W6");

// const data = await instance.orders.fetch("order_Rn9Z3GRy8nOl3z");

// const data = await instance.payments.refund("pay_RnBiZ3TYTSP7gg",{amount:50000});

const data = await instance.orders.create({
  amount: 50000,
  currency: "INR"
});
console.log(data);

