export class Customer {
  constructor(
    private readonly customerId: string,
    private readonly name: string,
    private readonly email: string,
  ) {}

  getCustomerId(): string {
    return this.customerId;
  }

  getName(): string {
    return this.name;
  }
}
