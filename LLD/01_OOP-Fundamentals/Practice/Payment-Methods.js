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
class Payment {
    reference;
    method;
    amount;
    constructor(reference, method, amount) {
        this.reference = reference;
        this.method = method;
        this.amount = amount;
    }
    settlement() {
        return this.amount - this.fee();
    }
    receipt() {
        return (`${this.reference} (${this.method}): charged $${this.amount.toFixed(2)}, ` +
            `fee $${this.fee().toFixed(2)}, settled $${this.settlement().toFixed(2)}`);
    }
}
class CardPayment extends Payment {
    static RATE = 0.02;
    constructor(reference, amount) {
        super(reference, "Card", amount);
    }
    fee() {
        return this.amount * CardPayment.RATE;
    }
}
class UpiPayment extends Payment {
    constructor(reference, amount) {
        super(reference, "UPI", amount);
    }
    fee() {
        return 0;
    }
}
class WalletPayment extends Payment {
    static RATE = 0.01;
    static MAX_FEE = 10;
    constructor(reference, amount) {
        super(reference, "Wallet", amount);
    }
    fee() {
        return Math.min(this.amount * WalletPayment.RATE, WalletPayment.MAX_FEE);
    }
}
class PaymentGateway {
    payments = [];
    constructor() { }
    addCard(reference, amount) {
        this.payments.push(new CardPayment(reference, amount));
        return this.payments.length - 1;
    }
    addUpi(reference, amount) {
        this.payments.push(new UpiPayment(reference, amount));
        return this.payments.length - 1;
    }
    addWallet(reference, amount) {
        this.payments.push(new WalletPayment(reference, amount));
        return this.payments.length - 1;
    }
    fee(index) {
        return this.payments[index].fee();
    }
    settlement(index) {
        return this.payments[index].settlement();
    }
    receipt(index) {
        return this.payments[index].receipt();
    }
    totalFees() {
        return this.payments.reduce((total, payment) => total + payment.fee(), 0);
    }
}
export {};
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
