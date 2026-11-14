// 1. Compile-time Polymorphism (Method Overloading)
class Calculator {
  add(a: number, b: number): number;
  add(a: number, b: number, c: number): number;
  add(a: number, b: number, c?: number): number {
    if (c !== undefined) return a + b + c;
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
  protected recipient: string;
  protected message: string;

  constructor(recipient: string, message: string) {
    this.recipient = recipient;
    this.message = message;
  }

  send(): void {
    console.log(`Sending generic notification to: ${this.recipient}`);
  }
}

class EmailNotification extends Notification {
  private subject: string;

  constructor(recipient: string, message: string, subject: string) {
    super(recipient, message);
    this.subject = subject;
  }

  send(): void {
    console.log(
      `Sending EMAIL to ${this.recipient} | Subject: ${this.subject}`,
    );
  }
}

class SMSNotification extends Notification {
  private phoneNumber: string;

  constructor(recipient: string, message: string, phoneNumber: string) {
    super(recipient, message);
    this.phoneNumber = phoneNumber;
  }

  send(): void {
    console.log(
      `Sending SMS to ${this.phoneNumber} | Message: ${this.message}`,
    );
  }
}

class PushNotification extends Notification {
  private deviceToken: string;

  constructor(recipient: string, message: string, deviceToken: string) {
    super(recipient, message);
    this.deviceToken = deviceToken;
  }

  send(): void {
    console.log(
      `Sending Push to device ${this.deviceToken} | Message: ${this.message}`,
    );
  }
}

const notifications: Notification[] = [
  new EmailNotification(
    "alice@example.com",
    "Your order shipped!",
    "Order Update",
  ),
  new SMSNotification("Bob", "Code: 482910", "+1-555-0123"),
  new PushNotification("Charlie", "New message", "d8a3f4b2c1e5a9b7"),
];

for (const n of notifications) {
  n.send();
}
