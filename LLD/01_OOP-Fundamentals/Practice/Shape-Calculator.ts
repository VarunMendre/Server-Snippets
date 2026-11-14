// Define an abstract Shape class that stores its name, declares area()
// and perimeter(), and implements describe() once for every shape.
//
// Implement Circle and Rectangle as concrete Shape subclasses.
// ShapeCalculator is provided. Do not modify it.

abstract class Shape {
  protected constructor(private readonly name: string) {}

  abstract area(): number;
  abstract perimeter(): number;
  describe(): string {
    return `Shape: ${this.name}, Area: ${this.area().toFixed(2)}, Perimeter: ${this.perimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private readonly radius: number) {
    super("Circle");
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
class Rectangle extends Shape {
  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    super("Rectangle");
  }

  area(): number {
    return this.width * this.height;
  }
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class ShapeCalculator {
  private readonly shapes: Shape[] = [];

  constructor() {}

  addCircle(radius: number): number {
    this.shapes.push(new Circle(radius));
    return this.shapes.length - 1;
  }

  addRectangle(width: number, height: number): number {
    this.shapes.push(new Rectangle(width, height));
    return this.shapes.length - 1;
  }

  area(index: number): number {
    return this.shapes[index].area();
  }

  perimeter(index: number): number {
    return this.shapes[index].perimeter();
  }

  describe(index: number): string {
    return this.shapes[index].describe();
  }

  totalArea(): number {
    return this.shapes.reduce((sum, shape) => sum + shape.area(), 0);
  }
}

/**
 * Your ShapeCalculator object will be instantiated and called as such:
 * const obj = new ShapeCalculator();
 * const param_1 = obj.addCircle(radius);
 * const param_2 = obj.addRectangle(width, height);
 * const param_3 = obj.area(index);
 * const param_4 = obj.perimeter(index);
 * const param_5 = obj.describe(index);
 * const param_6 = obj.totalArea();
 */
