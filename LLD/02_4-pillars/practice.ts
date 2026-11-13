/* Problem:

Design a Car class that remembers both its identity and its current speed as it is driven. 
The brand and model stay the same for the lifetime of the object, while the speed changes after every acceleration or braking operation.

Implement the Car class:

- Car(String brand, String model) creates a car with the given brand and model. Every new car starts at 0 km/h.
- int accelerate(int amount) increases the current speed by amount, stores the result, and returns the new speed.
- int brake(int amount) decreases the current speed by amount, stores the result, and returns the new speed. If braking would make the speed negative, set it to 0 instead.
- int getSpeed() returns the car's current speed without changing it.
- String describe() returns the latest state in the exact format "<brand> <model> at <speed> km/h".

All method calls operate on the same object. For example, accelerating by 20 and then by 15 produces a speed of 35, not 15. Braking by more than 35 then brings the car to a stop at 0.

*/

/* solution:

class Car {
  private brand: string;
  private model: string;
  private speed: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
  }

  accelerate(amount: number): number {
    if (!Number.isFinite(amount) || amount < 0)
      throw new Error("Amount must be a non-negative number");

    return (this.speed += amount);
  }

  brake(amount: number): number {
    if (!Number.isFinite(amount) || amount < 0)
      throw new Error("Amount must be a non-negative number");

    this.speed = Math.max(0, this.speed - amount);
    return this.speed;
  }

  getSpeed(): number {
    return this.speed;
  }

  describe(): string {
    return `${this.brand} ${this.model} at ${this.speed} km/h`;
  }
}
*/

