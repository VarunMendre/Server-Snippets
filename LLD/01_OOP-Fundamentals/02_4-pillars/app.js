// Encapsulation

/*
Encapsulation is the practice of bundling data and the methods that operate on that data into a single unit (class), while restricting direct access to the internal state.

In simple words:
Don't let anyone modify your object's data however they want. Force them to use controlled methods.

What problem does it solve: 
It protects your object from entering an invalid state.

*/

// class Inventory {
//   #stock;

//   constructor(name, stock) {
//     this.name = name;
//     this.#stock = stock;
//   }

//   addStock(quantity) {
//     if (quantity <= 0) return "Quantity should be greater than 0";

//     this.#stock += quantity;
//   }

//   removeStock(quantity) {
//     if (quantity <= 0) return " Quantity should be greater than 0";

//     if (quantity > this.#stock) return "Insufficient stock";

//     this.#stock -= quantity;
//   }

//   getStock() {
//     return this.#stock;
//   }
// }

// const laptop = new Inventory("msi-titan", 5);
// laptop.removeStock(4);
// laptop.removeStock(2);

// console.log(laptop.getStock());

// laptop.addStock(5);

// console.log(laptop.getStock());

// Abstaction

// -------------------- ABSTRACT CLASS --------------------

// class PaymentGateway {
//   pay(amount) {
//     throw new Error("pay() must be implemented");
//   }

//   refund(paymentId) {
//     throw new Error("refund() must be implemented");
//   }
// }

// class CashFreeGateway extends PaymentGateway {
//   #transaction = new Map();

//   pay(amount) {
//     if (amount <= 0) throw new Error("Invalid Amount");

//     const paymentId = "PAY_" + Math.floor(Math.random() * 100000);

//     this.#transaction.set(paymentId, { amount, status: "SUCCESS" });

//     console.log("Payment Successful");
//     console.log("Payment Id: ", paymentId);

//     return paymentId;
//   }

//   refund(paymentId) {
//     if (!this.#transaction.has(paymentId)) {
//       return "Payment not found";
//     }

//     const payment = this.#transaction.get(paymentId);
//     payment.status = "REFUNDED";

//     return "Refunded Successfully";
//   }
// }

// const gateway = new CashFreeGateway();

// const paymentId = gateway.pay(5000);

// gateway.refund(paymentId);

// Inheritance

// Parent Class

// class Notification {
//   validateUser(user) {
//     console.log(`Validating ${user}`);
//   }

//   logNotification(type) {
//     console.log(`${type} notification logged.`);
//   }
// }

// class EmailNotification extends Notification {
//   send(user, message) {
//     this.validateUser(user);

//     console.log(`Sending Email to ${user}`);
//     console.log(`Message : ${message}`);

//     this.logNotification("Email");
//   }
// }

// class SMSNotification extends Notification {
//   send(user, message) {
//     this.validateUser(user);

//     console.log(`Sending SMS to ${user}`);
//     console.log(`Message : ${message}`);

//     this.logNotification("SMS");
//   }
// }

// class PushNotification extends Notification {
//   send(user, message) {
//     this.validateUser(user);

//     console.log(`Sending Push Notification to ${user}`);
//     console.log(`Message : ${message}`);

//     this.logNotification("Push");
//   }
// }

// const email = new EmailNotification();

// email.send("Varun", "Payment Successful");

// console.log("-------------------------");

// const sms = new SMSNotification();
// sms.send("Sophie", "OTP/l 14560");

// Polymorphism

// parent Class

class Notification {
  send(user, message) {
    throw new Error("Implement the send() method");
  }
}

class EmailNotification extends Notification {
  send(user, message) {
    console.log("📧 Email send to: ", user);
    console.log(message);
  }
}

class SMSNotification extends Notification {
  send(user, message) {
    console.log("📱 SMS sent to: ", user);
    console.log(message);
  }
}

class PushNotification extends Notification {
  send(user, message) {
    console.log("🔔 Push sent to: ", user);
    console.log(message);
  }
}

class NotificationService extends Notification {
  notify(notification, user, message) {
    notification.send(user, message);
  }
}

const service = new NotificationService();

service.notify(new EmailNotification(), "Varun", "WelCome!");
service.notify(new SMSNotification(), "David", "OTP: 5421");
service.notify(new PushNotification(), "Angela", "New Offer!");
