// Encapsulation:
// process of binding data i.e., method & properties together into a single unit called class & restricting direct access to the internal details of that class. by providing controlled access to internal state
// Achieved through access modifiers: public, private, protected that control visibility & getters/setters to provide controller access to private data
// Here's a minimal example showing the difference:
// 1. Access Modifiers: public, private, protected
class Product1 {
    // Only this class can access
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getName() {
        // Anyone can read the name
        return this.name;
    }
    getPrice() {
        // Anyone can read the price
        return this.price;
    }
}
// 2. Getters and Setters:
class Product2 {
    _name;
    _price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    set name(name) {
        if (name.trim() === "")
            throw new Error("Name cannot be empty");
        this._name = name;
    }
    set price(price) {
        if (!Number.isFinite(price) || price <= 0)
            throw new Error("Price must be a positive finite number greater than zero");
        this._price = price;
    }
}
// Encapsulation in-practice
class BankAccount {
    balance;
    accHolder;
    static INITIAL_BALANCE = 500;
    constructor(accHolder) {
        if (accHolder.trim().length === 0) {
            throw new Error("Account holder accHolder cannot be empty");
        }
        this.accHolder = accHolder;
        this.balance = BankAccount.INITIAL_BALANCE;
    }
    get currentBalance() {
        return this.balance;
    }
    get accountHolder() {
        return this.accHolder;
    }
    deposit(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Deposit amount must be a finite number greater than 0");
        }
        this.balance += amount;
    }
    withdraw(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Withdrawal amount must be a finite number greater than 0");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient bank balance");
        }
        this.balance -= amount;
    }
}
const account = new BankAccount("Varun");
account.deposit(1000);
account.withdraw(200);
console.log(account.currentBalance); // 1300
console.log(account.accountHolder); // Varun
export {};
