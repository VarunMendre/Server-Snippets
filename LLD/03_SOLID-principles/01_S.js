// 01. Single Responsibility Principle

// A class should have one responsibility — meaning one reason to change.
// It prevents a class from becoming responsible for unrelated parts of the system.

// ❌ Bad Code — Parking Lot => ParkingLot is doing parking logic + payment + ticket generation + notifications.

/*
class ParkingLot {
  parkVehicle(vehicle) {
    console.log(`Parking ${vehicle.number}`);
  }

  calculateFee(hours) {
    return hours * 50;
  }

  processPayment(amount) {
    console.log(`Paid ₹${amount}`);
  }

  generateTicket(vehicle) {
    console.log(`Ticket generated for ${vehicle.number}`);
  }

  sendSMS(vehicle) {
    console.log(`SMS sent to ${vehicle.number}`);
  }
}

const parkingLot = new ParkingLot();

parkingLot.parkVehicle({ number: "MH12AB1234" });
parkingLot.generateTicket({ number: "MH12AB1234" });
parkingLot.processPayment(100);
parkingLot.sendSMS({ number: "MH12AB1234" });

*/

/*
What's wrong?

ParkingLot now has multiple reasons to change:

Parking rules change       → modify ParkingLot
Payment provider changes   → modify ParkingLot
Ticket format changes      → modify ParkingLot
SMS provider changes       → modify ParkingLot
*/

// Good Code — Separate Responsibilities

class ParkingLot {
  parkVehicle(vehicle) {
    console.log(`Parking ${vehicle.number}`);
  }
}

class FeeCalculator {
  calculate(hours) {
    return hours * 50;
  }
}

class PaymentService {
  pay(amount) {
    console.log(`Paid ${amount}$`);
  }
}

class TicketService {
  generate(vehicle) {
    console.log(`Ticket generated for ${vehicle.number}`);
  }
}

class NotificationService {
  send(vehicle) {
    console.log(`SMS sent to ${vehicle.number}`);
  }
}

class ParkingService {
  constructor(
    parkingLot,
    feeCalculator,
    paymentService,
    ticketService,
    notificationService,
  ) {
    this.parkingLot = parkingLot;
    this.feeCalculator = feeCalculator;
    this.paymentService = paymentService;
    this.ticketService = ticketService;
    this.notificationService = notificationService;
  }

  park(vehicle, hours) {
    this.parkingLot.parkVehicle(vehicle);
    this.ticketService.generate(vehicle);

    const fees = this.feeCalculator.calculate(hours);

    this.paymentService.pay(fees);
    this.notificationService.send(vehicle);
  }
}

const parkingService = new ParkingService(
  new ParkingLot(),
  new FeeCalculator(),
  new PaymentService(),
  new TicketService(),
  new NotificationService(),
);

parkingService.park({ number: "MH14LN1509" }, 2);
