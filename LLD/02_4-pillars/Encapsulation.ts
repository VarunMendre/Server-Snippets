// Encapsulation:
// process of binding data i.e., method & properties together into a single unit called class & restricting direct access to the internal details of that class. by providing controlled access to internal state
// Achieved through access modifiers: public, private, protected that control visibility & getters/setters to provide controller access to private data

// Here's a minimal example showing the difference:

// 1. Access Modifiers: public, private, protected
class Product1 {
  // Only this class can access
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getName(): string {
    // Anyone can read the name
    return this.name;
  }

  getPrice(): number {
    // Anyone can read the price
    return this.price;
  }
}

// 2. Getters and Setters:

class Product2 {
  private _name!: string;
  private _price!: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  set name(name: string) {
    if (name.trim() === "") throw new Error("Name cannot be empty");
    this._name = name;
  }

  set price(price: number) {
    if (!Number.isFinite(price) || price <= 0)
      throw new Error(
        "Price must be a positive finite number greater than zero",
      );
    this._price = price;
  }
}

// Encapsulation in-practice

class BankAccount {
  private balance: number;
  private readonly accHolder: string;

  private static readonly INITIAL_BALANCE = 500;

  constructor(accHolder: string) {
    if (accHolder.trim().length === 0) {
      throw new Error("Account holder accHolder cannot be empty");
    }

    this.accHolder = accHolder;
    this.balance = BankAccount.INITIAL_BALANCE;
  }

  get currentBalance(): number {
    return this.balance;
  }

  get accountHolder(): string {
    return this.accHolder;
  }

  deposit(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Deposit amount must be a finite number greater than 0");
    }

    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(
        "Withdrawal amount must be a finite number greater than 0",
      );
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
console.log(account.accountHolder);  // Varun