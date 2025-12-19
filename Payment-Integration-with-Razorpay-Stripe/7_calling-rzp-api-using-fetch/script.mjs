const token = btoa("rzp_test_RnAnjbXG3sqHWQ:bYOIrGnlBantsQMMw32CBIxh");

const response = await fetch("https://api.razorpay.com/v1/payments?count=2", {
  headers: {
    Authorization:
      `Basic ${token}`,
  },
});
const data = await response.json();
console.log({data});