/*
Design a BankAccount class that tracks a single account balance and enforces its own deposit and withdrawal rules.

Implement the BankAccount class:

- BankAccount(String accountNumber, String ownerName) creates an account with the given number and owner. The balance starts at 0.
- boolean deposit(double amount) adds amount to the balance and returns true. If amount is not greater than zero, it changes nothing and returns false.
- boolean withdraw(double amount) subtracts amount from the balance and returns true. If amount is not greater than zero, or the balance is smaller than amount, it changes nothing and returns false.
- double getBalance() returns the current balance.
- String getSummary() returns the account as "<ownerName> (<accountNumber>) | Balance: $<balance>", with the balance formatted to exactly two decimal places and no thousand separators. An account owned by John Doe with number ACC-123 and a balance of 500 gives "John Doe (ACC-123) | Balance: $500.00".

The balance must not be reachable or assignable from outside the class. Every rule above has to be enforced by the object itself.
*/

class BankAccount {
  private balance: number;
  private accountNumber: string;
  private ownerName: string;

  constructor(accountNumber: string, ownerName: string) {
    this.balance = 0;
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
  }

  deposit(amount: number): boolean {
    if (amount <= 0) return false;

    this.balance += amount;
    return true;
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) return false;

    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }

  getSummary(): string {
    return `${this.ownerName} (${this.accountNumber}) | Balance: $${this.balance.toFixed(2)}`;
  }
}
