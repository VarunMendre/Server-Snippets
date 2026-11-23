// 04 (I) -> Interface Segregation Principl

// Example 1 ISP violation: One huge interface forces every parking spot to support everything:

/*

interface ParkingSpot {
  park(vehicle: string): void;
  chargeEV(vehicle: string): void;
  wash(): void;
}

class RegularParkingSpot implements ParkingSpot {
  park(vehicle: string): void {
    console.log(`Parking ${vehicle} in a regular spot.`);
  }

  chargeEV(vehicle: string): void {
    throw new Error("Regular parking spots cannot charge EVs.");
  }

  wash(): void {
    throw new Error("Regular parking spots do not have washing facilities.");
  }
}

*/

// Problem with this code is that RegularParkingSpot is forced to implement methods that it does not support,
// violating the Interface Segregation Principle (ISP). That's exactly the problem ISP addresses.

// Definition of ISP: "Clients should not be forced to depend on interfaces they do not use." 

// Example 2 : ✅ Good — segregate the interfaces

interface ParkingSpot {
  park(vehicle: string): void;
}

interface EVChargingSpot {
  chargeEV(vehicle: string): void;
}

interface WashingSpot {
  wash(): void;
}

interface CarServicingSpot {
  serviceCar(vehicle: string): void;
}
// Now, each class can implement only the interfaces that are relevant to it:

class RegularParkingSpot implements ParkingSpot {
  park(vehicle: string): void {
    console.log(`Parking ${vehicle} in a regular spot.`);
  }
}

class EVChargingParkingSpot implements EVChargingSpot, ParkingSpot {
  chargeEV(vehicle: string): void {
    console.log(`Charging ${vehicle} at an EV charging spot.`);
  }

  park(vehicle: string): void {
    console.log(`Parking ${vehicle} in an EV charging spot.`);
  }
}

class PremiumParkingSpot implements WashingSpot, ParkingSpot {
  wash(): void {
    console.log("Washing the parking spot.");
  }

  park(vehicle: string): void {
    console.log(`Parking ${vehicle} in a washing spot.`);
  }
}

class UltraPremiumParkingSpot
  implements CarServicingSpot, WashingSpot, ParkingSpot
{
  serviceCar(vehicle: string): void {
    console.log(`Servicing ${vehicle} in an ultra-premium spot.`);
  }

  park(vehicle: string): void {
    console.log(`Parking ${vehicle} in an ultra-premium spot.`);
  }

  wash(): void {
    console.log("Washing the ultra-premium parking spot.");
  }
}

/* what Problem does ISP solve?
 - It prevents classes from being forced to implement methods they don't need.
 - It promotes the creation of smaller, more focused interfaces that are easier to understand and maintain.
 - It reduces the complexity of maintaining and updating the codebase.
 - It allows for more flexible and modular design, enabling classes to implement only the functionality they require.
*/


/* When to use ISP? 
    - When you have a large interface that classes do not need all the methods defined in the interface.
    - When you want to create a more modular and flexible design.
    - When you want to improve code maintainability and reduce the risk of introducing bugs when making changes to the codebase.
*/

