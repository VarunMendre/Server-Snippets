// 1. Compile-time Polymorphism (Method Overloading)
class Calculator {
    add(a, b, c) {
        if (c !== undefined)
            return a + b + c;
        return a + b;
    }
}
/*
const cal = new Calculator();

console.log(cal.add(1, 2, 3)); // 6
console.log(cal.add(1, 2)); // 3
*/
// 2. Runtime Polymorphism (Method Overriding / Dynamic Dispatch)
class Notification {
    recipient;
    message;
    constructor(recipient, message) {
        this.recipient = recipient;
        this.message = message;
    }
    send() {
        console.log(`Sending generic notification to: ${this.recipient}`);
    }
}
class EmailNotification extends Notification {
    subject;
    constructor(recipient, message, subject) {
        super(recipient, message);
        this.subject = subject;
    }
    send() {
        console.log(`Sending EMAIL to ${this.recipient} | Subject: ${this.subject}`);
    }
}
class SMSNotification extends Notification {
    phoneNumber;
    constructor(recipient, message, phoneNumber) {
        super(recipient, message);
        this.phoneNumber = phoneNumber;
    }
    send() {
        console.log(`Sending SMS to ${this.phoneNumber} | Message: ${this.message}`);
    }
}
class PushNotification extends Notification {
    deviceToken;
    constructor(recipient, message, deviceToken) {
        super(recipient, message);
        this.deviceToken = deviceToken;
    }
    send() {
        console.log(`Sending Push to device ${this.deviceToken} | Message: ${this.message}`);
    }
}
const notifications = [
    new EmailNotification("alice@example.com", "Your order shipped!", "Order Update"),
    new SMSNotification("Bob", "Code: 482910", "+1-555-0123"),
    new PushNotification("Charlie", "New message", "d8a3f4b2c1e5a9b7"),
];
for (const n of notifications) {
    n.send();
}
export {};
