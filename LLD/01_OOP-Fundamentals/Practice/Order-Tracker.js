var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PLACED"] = "PLACED";
    OrderStatus["PACKED"] = "PACKED";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
const ALLOWED_NEXT = {
    [OrderStatus.PLACED]: [OrderStatus.PACKED, OrderStatus.CANCELLED],
    [OrderStatus.PACKED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.CANCELLED]: [],
};
function statusFromName(name) {
    for (const status of Object.values(OrderStatus)) {
        if (status === name) {
            return status;
        }
    }
    return null;
}
class OrderTracker {
    current = OrderStatus.PLACED;
    steps = 0;
    constructor() { }
    status() {
        return this.current;
    }
    advanceTo(target) {
        const next = statusFromName(target);
        if (next === null || !ALLOWED_NEXT[this.current].includes(next)) {
            return false;
        }
        this.current = next;
        this.steps++;
        return true;
    }
    allowedNext() {
        return ALLOWED_NEXT[this.current].map((s) => s);
    }
    isTerminal() {
        return ALLOWED_NEXT[this.current].length === 0;
    }
    stepCount() {
        return this.steps;
    }
}
export {};
