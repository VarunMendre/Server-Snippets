const button = document.querySelector("button");

button.addEventListener("click", () => {
  const rzp = new Razorpay({
    key: "rzp_test_RnAnjbXG3sqHWQ",
    amount: 500000,
    name: "Varun",
    currency: "INR",
    theme: {
      color: "#95e1f2ff",
    },
    description: "Test Transaction",
    order_id: "order_RnkxzpFCPNok5C",
    notes: {
      address: "Varun Corporate Office",
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: "Sharry Kumar", //your customer's name
      email: "sharry.kumar@example.com",
      contact: "+919876543210", //Provide the customer's phone number for better conversion rates
    },
    image:
      "https://imgs.search.brave.com/LZVvz2m6dEdxABLGXG0gsI8DRnezcqYeh1zPBYF3tc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/Y2hhbmdlLWxvY2F0/aW9uLndlYnA",
    notes: {
      course: "NodeJS",
      amount: 10000,
    },
    handler: function (response) {
      console.log(response);
    },
  });

  rzp.on("payment.failed", function (response) {
    console.log(response);
  });
  rzp.open();
});
