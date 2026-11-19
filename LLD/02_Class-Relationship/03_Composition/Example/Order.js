class Product {
    productId;
    name;
    price;
    constructor(productId, name, price) {
        this.productId = productId;
        this.name = name;
        this.price = price;
    }
    getProductId() {
        return this.productId;
    }
    getPrice() {
        return this.price;
    }
}
class OrderItem {
    productId;
    quantity;
    unitPrice;
    constructor(productId, quantity, unitPrice) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    getProductId() {
        return this.productId;
    }
    getLineTotal() {
        return this.quantity * this.unitPrice;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CREATED"] = "CREATED";
    OrderStatus["SHIPPED"] = "SHIPPED";
})(OrderStatus || (OrderStatus = {}));
class Order {
    orderId;
    status = OrderStatus.CREATED;
    totalAmount = 0;
    items = [];
    constructor(orderId) {
        this.orderId = orderId;
    }
    addItem(product, quantity) {
        if (quantity <= 0)
            throw new Error("Quantity must be positive");
        this.ensureNotShipped();
        const item = new OrderItem(product.getProductId(), quantity, product.getPrice());
        this.items.push(item);
        this.totalAmount += item.getLineTotal();
    }
    removeItem(productId) {
        this.ensureNotShipped();
        const index = this.items.findIndex((item) => item.getProductId() === productId);
        if (index !== -1) {
            const [removed] = this.items.splice(index, 1);
            this.totalAmount -= removed.getLineTotal();
        }
    }
    getItems() {
        return [...this.items];
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    ship() {
        this.status = OrderStatus.SHIPPED;
    }
    ensureNotShipped() {
        if (this.status === OrderStatus.SHIPPED) {
            throw new Error("Cannot modify a shipped order");
        }
    }
}
export {};
