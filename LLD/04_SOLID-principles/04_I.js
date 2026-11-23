// 04 (I) -> Interface Segregation Principl
// Now, each class can implement only the interfaces that are relevant to it:
class RegularParkingSpot {
    park(vehicle) {
        console.log(`Parking ${vehicle} in a regular spot.`);
    }
}
class EVChargingParkingSpot {
    chargeEV(vehicle) {
        console.log(`Charging ${vehicle} at an EV charging spot.`);
    }
    park(vehicle) {
        console.log(`Parking ${vehicle} in an EV charging spot.`);
    }
}
class PremiumParkingSpot {
    wash() {
        console.log("Washing the parking spot.");
    }
    park(vehicle) {
        console.log(`Parking ${vehicle} in a washing spot.`);
    }
}
class UltraPremiumParkingSpot {
    serviceCar(vehicle) {
        console.log(`Servicing ${vehicle} in an ultra-premium spot.`);
    }
    park(vehicle) {
        console.log(`Parking ${vehicle} in an ultra-premium spot.`);
    }
    wash() {
        console.log("Washing the ultra-premium parking spot.");
    }
}
export {};
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
