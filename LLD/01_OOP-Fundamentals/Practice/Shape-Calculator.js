// Define an abstract Shape class that stores its name, declares area()
// and perimeter(), and implements describe() once for every shape.
//
// Implement Circle and Rectangle as concrete Shape subclasses.
// ShapeCalculator is provided. Do not modify it.
class Shape {
    name;
    constructor(name) {
        this.name = name;
    }
    describe() {
        return `Shape: ${this.name}, Area: ${this.area().toFixed(2)}, Perimeter: ${this.perimeter().toFixed(2)}`;
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
class ShapeCalculator {
    shapes = [];
    constructor() { }
    addCircle(radius) {
        this.shapes.push(new Circle(radius));
        return this.shapes.length - 1;
    }
    addRectangle(width, height) {
        this.shapes.push(new Rectangle(width, height));
        return this.shapes.length - 1;
    }
    area(index) {
        return this.shapes[index].area();
    }
    perimeter(index) {
        return this.shapes[index].perimeter();
    }
    describe(index) {
        return this.shapes[index].describe();
    }
    totalArea() {
        return this.shapes.reduce((sum, shape) => sum + shape.area(), 0);
    }
}
export {};
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
