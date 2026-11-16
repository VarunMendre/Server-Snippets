enum OrderStatus {
  PLACED = "PLACED",
  PACKED = "PACKED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const ALLOWED_NEXT: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PLACED]: [OrderStatus.PACKED, OrderStatus.CANCELLED],
  [OrderStatus.PACKED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

function statusFromName(name: string): OrderStatus | null {
  for (const status of Object.values(OrderStatus)) {
    if (status === name) {
      return status;
    }
  }
  return null;
}

class OrderTracker {
  private current: OrderStatus = OrderStatus.PLACED;
  private steps = 0;

  constructor() {}

  status(): string {
    return this.current;
  }

  advanceTo(target: string): boolean {
    const next = statusFromName(target);
    if (next === null || !ALLOWED_NEXT[this.current].includes(next)) {
      return false;
    }
    this.current = next;
    this.steps++;
    return true;
  }

  allowedNext(): string[] {
    return ALLOWED_NEXT[this.current].map((s) => s as string);
  }

  isTerminal(): boolean {
    return ALLOWED_NEXT[this.current].length === 0;
  }

  stepCount(): number {
    return this.steps;
  }
}
