/**
 * DEPENDENCY (weakest class relationship)
 * - Class A uses Class B as a method parameter or local variable.
 * - No field, no ownership, no lifecycle control.
 * - Relationship exists only during that one method call.
 * - UML: dashed arrow ┄┄➤
 *
 * Here: CheckoutService depends on PricingCalculator,
 * but does NOT store it as a field.
 */

class Order {
  private status = "PENDING";

  constructor(
    private readonly orderId: string,
    private readonly subTotal: number,
    private readonly discount: number,
  ) {}

  getOrderId(): string {
    return this.orderId;
  }

  getSubtotal(): number {
    return this.subTotal;
  }

  getDiscount(): number {
    return this.discount;
  }

  getStatus(): string {
    return this.status;
  }

  confirm(): void {
    this.status = "CONFIRMED";
  }
}

class PricingCalculator {
  calculatePrice(order: Order): number {
    return order.getSubtotal() - order.getDiscount();
  }
}

/*
class CheckoutService {
  // No field like: private calculator: PricingCalculator
  // → no long-term reference, just a method parameter

  checkout(order: Order, calculator: PricingCalculator) {
    // 'calculator' is a local reference — used briefly, then gone
    const amount = calculator.calculatePrice(order);
    this.processPayment(amount);
    order.confirm();
  }

  private processPayment(amount: number): void {
    console.log(`Processing payment of ${amount.toFixed(2)}`);
  }
}
*/

// Dependency Injection

interface PaymentProcessor {
  processPayment(amount: number): boolean;
}

class StripePaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(`Charging ${(amount * 0.4).toFixed(2)} with Stripe`);
    return true;
  }
}

class RazorpayPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(`Charging ${(amount * 0.2).toFixed(2)} with Razorpay`);
    return true;
  }
}

class CheckoutService {
  constructor(private readonly processor: PaymentProcessor) {}

  checkout(order: Order, calculator: PricingCalculator) {
    const amount = calculator.calculatePrice(order);
    this.processor.processPayment(amount);
    order.confirm();
  }
}


