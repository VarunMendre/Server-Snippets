class Vehicle {
    make;
    model;
    year;
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    startEngine() {
        console.log(`Engine Started.`);
    }
    stoptEngine() {
        console.log(`Engine Stopped!`);
    }
    displayInfo() {
        console.log(`In  Year: ${this.year} ${this.make} has invented ${this.model}`);
    }
}
class ElectricCar extends Vehicle {
    batteryCapacity;
    constructor(make, model, year, batteryCapacity) {
        super(make, model, year);
        this.batteryCapacity = batteryCapacity;
    }
    chargeBattery() {
        console.log(`Charging ${this.batteryCapacity}kWh battery`);
    }
}
class GasCar extends Vehicle {
    fuelTankSize;
    constructor(make, model, year, fuelTankSize) {
        super(make, model, year);
        this.fuelTankSize = fuelTankSize;
    }
    fillTank() {
        console.log(`Filling ${this.fuelTankSize}L fuel tank`);
    }
}
export {};
