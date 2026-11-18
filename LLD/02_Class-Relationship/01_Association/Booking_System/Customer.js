export class Customer {
    customerId;
    name;
    email;
    constructor(customerId, name, email) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
    }
    getCustomerId() {
        return this.customerId;
    }
    getName() {
        return this.name;
    }
}
