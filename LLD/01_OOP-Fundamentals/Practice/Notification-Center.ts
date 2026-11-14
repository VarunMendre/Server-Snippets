/*
Design a notification center that can send messages through Email, SMS, and Push channels.Every channel has a destination and can identify itself, but each one renders messages differently.

NotificationCenter class should support these operations:

- NotificationCenter() creates a center with no channels.
- int addEmail(String to) adds an Email channel and returns its index.
- int addSms(String phone) adds an SMS channel and returns its index.
- int addPush(String device) adds a Push channel and returns its index.
- int count() returns how many channels have been added.
- String channelOf(int index) returns "email", "sms" or "push".
- String send(int index, String message) returns what that channel produces.
- String[] sendAll(String message) returns what every channel produces, in the order they were added.

Each channel owns its rendering rule:
 - Email returns "EMAIL to <to>: <message>" without changing the message.
 - SMS returns "SMS to <phone>: <message>", shortening messages longer than 20 characters to their first 20 characters.
 - Push returns "PUSH to <device>: <MESSAGE>", converting the message to uppercase.
 - Indexes are assigned in the order channels are added, starting at 0. An index outside that range returns "UNKNOWN" from both send and channelOf.

also implement the abstract Alert base class and the concrete EmailAlert, SmsAlert, and PushAlert subclasses. The center should be able to call channel and render through the shared type without checking which concrete channel it holds.
*/

abstract class Alert {
  protected constructor(protected readonly target: string) {}

  abstract channel(): string;
  abstract render(message: string): string;
}

class EmailAlert extends Alert {
  constructor(to: string) {
    super(to);
  }

  channel(): string {
    return "email";
  }

  render(message: string): string {
    return `EMAIL to ${this.target}: ${message}`;
  }
}
class SmsAlert extends Alert {
  private static readonly LIMIT = 20;
  constructor(phone: string) {
    super(phone);
  }

  channel(): string {
    return "sms";
  }

  render(message: string): string {
    return `SMS to ${this.target}: ${message.slice(0, SmsAlert.LIMIT)}`;
  }
}
class PushAlert extends Alert {
    constructor(device: string) {
        super(device);
    }

    channel(): string {
        return "push"
    }

    render(message: string): string {
        return `PUSH to ${this.target}: ${message.toUpperCase()}`;
    }
}

class NotificationCenter {
    private readonly channels: Alert[] = [];

    constructor() {
    }

    private channelAt(index: number): Alert | null {
        if (index < 0 || index >= this.channels.length) {
            return null;
        }
        return this.channels[index];
    }

    addEmail(to: string): number {
        this.channels.push(new EmailAlert(to));
        return this.channels.length - 1;
    }

    addSms(phone: string): number {
        this.channels.push(new SmsAlert(phone));
        return this.channels.length - 1;
    }

    addPush(device: string): number {
        this.channels.push(new PushAlert(device));
        return this.channels.length - 1;
    }

    count(): number {
        return this.channels.length;
    }

    channelOf(index: number): string {
        const channel = this.channelAt(index);
        return channel === null ? "UNKNOWN" : channel.channel();
    }

    send(index: number, message: string): string {
        const channel = this.channelAt(index);
        return channel === null ? "UNKNOWN" : channel.render(message);
    }

    sendAll(message: string): string[] {
        return this.channels.map((channel) => channel.render(message));
    }
}