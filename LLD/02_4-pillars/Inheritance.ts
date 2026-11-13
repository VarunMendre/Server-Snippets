class Vehicle {
  protected make: string;
  protected model: string;
  protected year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  startEngine(): void {
    console.log(`Engine Started.`);
  }

  stoptEngine(): void {
    console.log(`Engine Stopped!`);
  }

  displayInfo(): void {
    console.log(
      `In  Year: ${this.year} ${this.make} has invented ${this.model}`,
    );
  }
}

class ElectricCar extends Vehicle {
  private batteryCapacity: number;
  constructor(
    make: string,
    model: string,
    year: number,
    batteryCapacity: number,
  ) {
    super(make, model, year);
    this.batteryCapacity = batteryCapacity;
  }

  chargeBattery(): void {
    console.log(`Charging ${this.batteryCapacity}kWh battery`);
  }
}

class GasCar extends Vehicle {
  private fuelTankSize: number;

  constructor(make: string, model: string, year: number, fuelTankSize: number) {
    super(make, model, year);
    this.fuelTankSize = fuelTankSize;
  }

  fillTank(): void {
    console.log(`Filling ${this.fuelTankSize}L fuel tank`);
  }
}


