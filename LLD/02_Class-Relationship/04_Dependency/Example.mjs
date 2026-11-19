class Order {
    orderId;
    subTotal;
    discount;
    status = "PENDING";
    constructor(orderId, subTotal, discount) {
        this.orderId = orderId;
        this.subTotal = subTotal;
        this.discount = discount;
    }
    getOrderId() {
        return this.orderId;
    }
    getSubtotal() {
        return this.subTotal;
    }
    getDiscount() {
        return this.discount;
    }
    getStatus() {
        return this.status;
    }
    confirm() {
        this.status = "CONFIRMED";
    }
}
class PricingCalculator {
    calculatePrice(order) {
        return order.getSubtotal() - order.getDiscount();
    }
}
class CheckoutService {
    checkout(order, calculator) {
        const amount = calculator.calculatePrice(order);
        this.processPayment(amount);
        order.confirm();
    }
    processPayment(amount) {
        console.log(`Processing payment of ${amount.toFixed(2)}`);
    }
}
function main() {
    const order = new Order("ORD-1042", 120.0, 12.0);
    const checkoutService = new CheckoutService();
    // The calculator is used for this one call, then dropped
    checkoutService.checkout(order, new PricingCalculator());
    console.log(`${order.getOrderId()} status: ${order.getStatus()}`);
}
main();
export {};
