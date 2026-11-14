// 03 -> Liskov Substitution Principle

/*
    if S is a subtype of T, 
    then objects of type T may be replaced with objects of type S
    without altering any of the desirable properties of that program (correctness, task performed, etc.)
*/

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

function increaseRectangleWidth(rectangle) {
  rectangle.setWidth(rectangle.width + 1);
}

const rectangle1 = new Rectangle(5, 10);
const rectangle2 = new Rectangle(5, 5);

const square = new Square(5, 5);

increaseRectangleWidth(rectangle1);
increaseRectangleWidth(rectangle2);
increaseRectangleWidth(square);

/*

console.log(`Rectangle area: ${rectangle1.area()}`); // Rectangle area: 60
console.log(`Rectangle area: ${rectangle2.area()}`); // Rectangle area: 30

console.log(`Square area: ${square.area()}`); // Square area: 36

*/

// The output of the code demonstrates a violation of the Liskov Substitution Principle (LSP).
// because the square object does not behave as expected when used in place of a rectangle object.

// so to solve this problem we can create a new class called Shape and
// then create two subclasses called Rectangle and Square that inherit from Shape.

/*
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    } 
    
}

class Square extends Shape {
    constructor(side) {
        this.side = side;
    }

    setWidth(width) {
        this.width = width;
        this.height = width;
    }

    setHeight(height) {
        this.height = height;
        this.width = height;
    }
}

// Usecase:

function increaseShapeWidth(shape) {
  shape.setWidth(shape.width + 1);
}


const rectangle3 = new Rectangle(5, 10);
const square3 = new Square(5);

increaseShapeWidth(rectangle3);
increaseShapeWidth(square3);

*/

/* 
console.log(`Rectangle area: ${rectangle3.area()}`); // Rectangle area: 60
console.log(`Square area: ${square3.area()}`); // Square area: 36
*/

// Now, the code adheres to the Liskov Substitution Principle (LSP) because both Rectangle and Square can be used interchangeably as Shape objects without violating any expectations.
// but still its voilating LSP substitution principle because the square class is not implementing the area method and also the setWidth and setHeight methods are not implemented in the Shape class.

// Example 2

class FlyingBird {
  fly() {
    console.log("I can fly!");
  }
}

class SwimmingBird {
  swim() {
    console.log("I can swim!");
  }
}

class Duck extends FlyingBird {
  quack() {
    console.log("Quack!");
  }
}

class Penguin extends SwimmingBird {}

function makeBirdFly(bird) {
  bird.fly();
}

function makeBirdSwim(bird) {
  bird.swim();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck); // I can fly!
makeBirdSwim(penguin); // I can swim!


// This Example 2 is passing the LSP because both Duck and Penguin
// can be used interchangeably as FlyingBird and SwimmingBird objects without violating any expectations.

// note: Parent class object responsibilities should be implemented in the child class otherwise it will violate the LSP.
// both Parent & Child class should have the same behavior and expectations.



