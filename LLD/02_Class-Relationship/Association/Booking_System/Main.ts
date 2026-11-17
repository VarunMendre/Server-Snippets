import { Booking } from "./Booking";
import { Customer } from "./Customer";
import { Show } from "./Show";

function printBooking(booking: Booking): void {
  const customer = booking.getCustomer();
  const show = booking.getShow();
  console.log(
    `${booking.getBookingId()}: ${customer.getName()}, ${show.getMovie()} at ${show.getStartTime()}`,
  );
}

function main(): void {
  // The customer and the shows already exist in the system
  const alice = new Customer("C-17", "Alice", "alice@mail.com");
  const inception = new Show("SH-7", "Inception", "19:00");
  const dune = new Show("SH-8", "Dune", "21:30");

  // Each booking is connected to them, not given new copies
  const first = new Booking("BK-1042", alice, inception, 500);
  const second = new Booking("BK-1043", alice, dune, 350);

  printBooking(first);
  printBooking(second);

  if (first.getCustomer() === second.getCustomer()) {
    console.log("Both bookings reference the same Customer object");
  }
}

main();
