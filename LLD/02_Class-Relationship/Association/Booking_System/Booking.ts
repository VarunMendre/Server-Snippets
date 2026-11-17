import { Customer } from "./Customer";
import { Show } from "./Show";

export enum BookingStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export class Booking {
  private readonly bookingId: string;
  private readonly totalAmount: number;
  private status: BookingStatus;

  private readonly customer: Customer;
  private readonly show: Show;

  constructor(
    bookingId: string,
    customer: Customer,
    show: Show,
    totalAmount: number,
  ) {
    this.bookingId = bookingId;
    this.customer = customer;
    this.show = show;
    this.totalAmount = totalAmount;
    this.status = BookingStatus.PENDING_PAYMENT;
  }

  getBookingId(): string {
    return this.bookingId;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  getCustomer(): Customer {
    return this.customer;
  }

  getShow(): Show {
    return this.show;
  }

  getStatus(): BookingStatus {
    return this.status;
  }
}
