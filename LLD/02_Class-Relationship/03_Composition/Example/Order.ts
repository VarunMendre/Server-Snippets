class Product {
  constructor(
    private readonly productId: string,
    private readonly name: string,
    private readonly price: number,
  ) {}

  getProductId(): string {
    return this.productId;
  }

  getPrice(): number {
    return this.price;
  }
}

class OrderItem {
  constructor(
    private readonly productId: string,
    private readonly quantity: number,
    private readonly unitPrice: number,
  ) {}

  getProductId(): string {
    return this.productId;
  }

  getLineTotal(): number {
    return this.quantity * this.unitPrice;
  }
}

enum OrderStatus {
  CREATED = "CREATED",
  SHIPPED = "SHIPPED",
}

class Order {
  private status: OrderStatus = OrderStatus.CREATED;
  private totalAmount = 0;
  private readonly items: OrderItem[] = [];

  constructor(private readonly orderId: string) {}

  addItem(product: Product, quantity: number): void {
    if (quantity <= 0) throw new Error("Quantity must be positive");

    this.ensureNotShipped();

    const item = new OrderItem(
      product.getProductId(),
      quantity,
      product.getPrice(),
    );
    this.items.push(item);
    this.totalAmount += item.getLineTotal();
    }
    
    removeItem(productId: string): void {
        this.ensureNotShipped();
        const index = this.items.findIndex((item) => item.getProductId() === productId);

        if (index !== -1) {
            const [removed] = this.items.splice(index, 1);
            this.totalAmount -= removed.getLineTotal();
        }
    }

  getItems(): readonly OrderItem[] {
    return [...this.items];
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  ship(): void {
    this.status = OrderStatus.SHIPPED;
  }

  private ensureNotShipped(): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new Error("Cannot modify a shipped order");
    }
  }
}
