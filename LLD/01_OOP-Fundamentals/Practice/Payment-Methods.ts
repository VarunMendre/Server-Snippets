/*

Design a payment processing model for three methods: Card, UPI, and Wallet.Every payment has a reference and charge amount, and every payment can report its processing fee, merchant settlement, and receipt.What changes from one method to another is the fee calculation.

PaymentGateway class supports these operations:

- PaymentGateway() creates a gateway with no payments recorded.
- int addCard(String reference, double amount) records a card payment and returns the index it was stored at.
- int addUpi(String reference, double amount) records a UPI payment and returns the index it was stored at.
- int addWallet(String reference, double amount) records a wallet payment and returns the index it was stored at.-
- double fee(int index) returns the processing fee for the payment at index:
        - Card is 2% of the amount.
        - UPI is free.
        - Wallet is 1% of the amount, but never more than 10.
- double settlement(int index) returns the amount the merchant receives, which is the amount less the fee.
- String receipt(int index) returns "<reference> (<method>): charged $<amount>, fee $<fee>, settled $<settlement>", where the method is Card, UPI, or Wallet and every monetary value displays exactly two decimal places.
- double totalFees() returns the sum of every payment's full-precision fee.

Indices are assigned in insertion order starting at 0. Adding a fourth payment method later must not require changing receipt, settlement or totalFees.

Your task is to implement the abstract Payment base class and the concrete CardPayment, UpiPayment, and WalletPayment subclasses. Do not modify the provided PaymentGateway class. Keep shared settlement and receipt behavior on the base class, and place each fee rule inside the corresponding subclass.

*/
abstract class Payment {
  protected constructor(
    private readonly reference: string,
    private readonly method: string,
    protected readonly amount: number,
  ) {}

  abstract fee(): number;

  settlement(): number {
    return this.amount - this.fee();
  }

  receipt(): string {
    return (
      `${this.reference} (${this.method}): charged $${this.amount.toFixed(2)}, ` +
      `fee $${this.fee().toFixed(2)}, settled $${this.settlement().toFixed(2)}`
    );
  }
}

class CardPayment extends Payment {
  private static readonly RATE = 0.02;

  constructor(reference: string, amount: number) {
    super(reference, "Card", amount);
  }

  fee(): number {
    return this.amount * CardPayment.RATE;
  }
}

class UpiPayment extends Payment {
  constructor(reference: string, amount: number) {
    super(reference, "UPI", amount);
  }

  fee(): number {
    return 0;
  }
}

class WalletPayment extends Payment {
  private static readonly RATE = 0.01;
  private static readonly MAX_FEE = 10;

  constructor(reference: string, amount: number) {
    super(reference, "Wallet", amount);
  }

  fee(): number {
    return Math.min(this.amount * WalletPayment.RATE, WalletPayment.MAX_FEE);
  }
}

class PaymentGateway {
  private readonly payments: Payment[] = [];

  constructor() {}

  addCard(reference: string, amount: number): number {
    this.payments.push(new CardPayment(reference, amount));
    return this.payments.length - 1;
  }

  addUpi(reference: string, amount: number): number {
    this.payments.push(new UpiPayment(reference, amount));
    return this.payments.length - 1;
  }

  addWallet(reference: string, amount: number): number {
    this.payments.push(new WalletPayment(reference, amount));
    return this.payments.length - 1;
  }

  fee(index: number): number {
    return this.payments[index].fee();
  }

  settlement(index: number): number {
    return this.payments[index].settlement();
  }

  receipt(index: number): string {
    return this.payments[index].receipt();
  }

  totalFees(): number {
    return this.payments.reduce((total, payment) => total + payment.fee(), 0);
  }
}

/**
 * Your PaymentGateway object will be instantiated and called as such:
 * const obj = new PaymentGateway();
 * const param_1 = obj.addCard(reference, amount);
 * const param_2 = obj.addUpi(reference, amount);
 * const param_3 = obj.addWallet(reference, amount);
 * const param_4 = obj.fee(index);
 * const param_5 = obj.settlement(index);
 * const param_6 = obj.receipt(index);
 * const param_7 = obj.totalFees();
 */
