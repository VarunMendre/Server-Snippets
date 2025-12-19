import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_test_RnAnjbXG3sqHWQ",
  key_secret: "bYOIrGnlBantsQMMw32CBIxh",
});

// Create a Plan
// const plan = instance.plans.create({
//   period: "weekly",
//   interval: 1,
//   item: {
//     name: "Test plan - Weekly",
//     amount: 69900,
//     currency: "INR",
//     description: "Books subscription plan - Weekly",
//   },
//   notes: {
//     notes_key_1: "Richard Hendricks",
//     notes_key_2: "Full Stack Developer",
//   },
// });

// plan
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Fetch all Plans

// const allPlans = await instance.plans.all();
// console.log(allPlans);

// Fetch a Plan by ID

// const singlePlan = await instance.plans.fetch("plan_RtL25ShREbnW62");
// console.log(singlePlan);

// Fetch all subsciptions

// const subscription = await instance.subscriptions.all({
//     count: 30,
// });
// console.log(subscription);

// Fetch a subscription by ID

// const singleSubscription = await instance.subscriptions.fetch("sub_J0l6tXK1b2e3Gh");
// console.log(singleSubscription);

// Create a Subscription

// const subscription = await instance.subscriptions.create({
//     plan_id: "plan_RtJ6nU0rA1dKsf",
//     total_count: 12, // 1 year
// });

// console.log(subscription);

// pause a Subscription
// const subscription = await instance.subscriptions.pause("sub_RtLaPBBZWGF9tP");

// console.log(subscription);

// resume a Subscription
// const subscription = await instance.subscriptions.resume("sub_RtLaPBBZWGF9tP");
// console.log(subscription);

// cancel a Subscription
const subscription = await instance.subscriptions.cancel("sub_RtLaPBBZWGF9tP");
console.log(subscription);

