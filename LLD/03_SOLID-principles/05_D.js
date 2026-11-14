// 05 (D) -> Dependency Inversion Principle

// Abstract Concept:

/*
    you've a store which depends on stripe API so its tight coupled to stripe API
    
    |  Store | ------> | Stripe API |
    

    problem with this approach that is 
    - what if we've to test our application we've to make all calls to stripe API, also we don't ve to call it while testing 
    - what if we've to add a new Payment method to our system, to do that we've to change ton's of line of code in our system 

                                           
    | Store |  ----> | Payment Processor | -----> STRIPE API
                     |                   | -----> RazorPay API 
                     
    so in DIP you add a middle-man / interface between those, that contains all the behavior that our api needs
    so in future if we add any another payment gateway 
    so they all will use same exact api / underline function 
    so thats a abstract idea of different types of payment we can make 
    
    note: - we create a wrapper around you're external dependencies so that way your code depends on your wrapper and not on actual implementation 
          - you won't want your High Level code (Store Class) to depend on low-level implementation of your dependencies 
          - we don't depend on that payment processor which wraps those functionalities, so we could control Both to look similar to our application 


    so if we change our Stripe or razorpay it doesn't matter nothing will change in our store code 
*/

// Concrete Example

/*

class Store {
  constructor(name) {
    this.stripe = new Stripe(name);
  }

  purchaseBike(quantity) {
    this.stripe.makePayment(200 * quantity * 100);
  }

  purchaseHelmet(quantity) {
    this.stripe.makePayment(15 * quantity * 100);
  }
} 


class Stripe {
  constructor(user) {
    this.user = user;
  }

    makePayment(amountsInCents) {
        console.log(`${this.user} made payment of $${amountsInCents / 100} with Stripe`);
  }
}

const store = new Store("Varun");

store.purchaseBike(2);
store.purchaseHelmet(2);


// Lets say now we've to switch to Razorpay API

class Razorpay {
    makePayment(user, amountsInDollars) {
        console.log(
          `${user} made payment of $${amountsInDollars} with Razorpay`,
        );
    }
}

*/

// so to accept the Razorpay in our store we need to modify the constructor of store to define a new, also it won't accepts a user

/* 
  constructor(name) {
    this.stripe = new Stripe(name);
    this.razorpay = new RazorPay();
    this.name = name;
  }
  
  so again we've to change the payment methods of both in the Store Class 

      purchaseBike(quantity) {
    this.razorpay.makePayment(this.user, 200 * quantity);
  }

  purchaseHelmet(quantity) {
    this.razorpay.makePayment(this.user, 15 * quantity);
  }

  so it is real pain to change these many things in real application 
*/

class Store {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelmet(quantity) {
    this.paymentProcessor.pay(15 * quantity);
  }
}

class StripePaymentProcessor {
  constructor(user) {
    this.stripe = new Stripe(user);
  }

  pay(amountsInDollars) {
    this.stripe.makePayment(amountsInDollars * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountsInCents) {
    console.log(
      `${this.user} made payment of $${amountsInCents / 100} with Stripe`,
    );
  }
}

class RazorpayPaymentProcessor {
  constructor(user) {
    this.user = user;
    this.rzp = new Razorpay();
  }

  pay(amountsInDollars) {
    this.rzp.makePayment(this.user, amountsInDollars);
  }
}

class Razorpay {
  makePayment(user, amountsInDollars) {
    console.log(`${user} made payment of $${amountsInDollars} with Razorpay`);
  }
}

const stipePaymentProcessor = new StripePaymentProcessor("Varun");
const razorpayPaymentProcessor = new RazorpayPaymentProcessor("John");

const store1 = new Store(stipePaymentProcessor);
store1.purchaseBike(2);
store1.purchaseHelmet(2);

const store2 = new Store(razorpayPaymentProcessor);
store2.purchaseBike(2);
store2.purchaseHelmet(2);


// with this approach we don't ve to change any code in Store class because we've dedicated abstract or interface between those Gateway 