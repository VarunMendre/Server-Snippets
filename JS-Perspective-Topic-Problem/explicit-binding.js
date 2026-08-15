// const obj = { name: "Varun" };

// function greet(age) {
//   return `Hello ${this.name}, age: ${age}`;
// }

// console.log(greet.call(obj, [22]));

// const obj = { name: "Varun" };

// function greet(age, designation) {
//   return `Hello ${this.name}, age: ${age}, designation: ${designation}`;
// }

// console.log(greet.apply(obj, [22, "backend"]));

// const obj = { name: "Varun" };

// function greet(age, designation) {
//   return `Hello ${this.name}, age: ${age}, designation: ${designation}`;
// }

// const bindFunc = greet.bind(obj);
// console.log(bindFunc(22, "software"))

// const person = { name: "Varun" };

// function sayHi(age) {
//     return `${this.name} is ${age} year's old`;
// }

// console.log(sayHi.call(person, 22));
// console.log(sayHi.bind(person, 22));

/* O/P : 
Varun is 22 year's old
ƒ sayHi(age) {
    return `${this.name} is ${age} year's old`;
}
*/

// const age = 30;

// let person = {
//   name: "Varun",
//   age: 20,
//   getAge: function () {
//     return this.age;
//   },
// };
// let person2 = { age: 24 };

// console.log(person.getAge.call(person2)); // 24

// var status = "first";

// setTimeout(() => {
//   const status = "second";

//   const data = {
//     status: "Third",
//     getStatus() {
//       return this.status;
//     },
//   };

//   console.log(data.getStatus()); // Third
//   console.log(data.getStatus.call(this)); // first
// }, 0);

// const animals = [
//   { species: "Lion", name: "King" },
//   { species: "Whale", name: "Queen" },
// ];

// function printAnimals(i) {
//   this.print = function () {
//     console.log("#" + i + " " + this.species + ": " + this.name);
//   };

//   this.print();
// }

// animals.forEach((item, ind) => {
//   printAnimals.call(animals[ind], ind);
// });

// const arr1 = [1, 2, 3, 4];
// const arr2 = [5, 6, 7, 8];

// arr1.push.apply(arr1, arr2);
// console.log(arr1); // [1, 2, 3, 4, 5, 6, 7, 8]

// MIN & MAX from an array

// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(Math.max.apply(null, nums)); // 9
// console.log(Math.min.apply(null, nums)); // 1

// function f() {
//   console.log(this); // points to window object
// }

// let user = {
//   g: f.bind(null),
// };

// user.g();

// function f() {
//     console.log(this.name);
// }

// f = f.bind({ name: "John" }).bind({ name: "Anna" });

// f(); // John, because once we've give then this context then we cant override or change it

// function f() {
//     console.log(this.name);
// }

// f.apply({ name: "John" }).apply({ name: "Anna" }); // john, but also gives us an TypeError that

// Fix the code :

// function checkPassword(success, failed) {
//   let password = prompt("Password?", "");
//   if (password == "Roadside Coder") success();
//   else failed();
// }

// let user = {
//   name: "Varun Mendre",

//   loginSuccessful() {
//     console.log(`${this.name} Logged in`);
//   },

//   loginFailed() {
//     console.log(`${this.name} failed to Logged in`);
//   },
// };

// checkPassword(user.loginSuccessful.bind(user), user.loginFailed.bind(user));

// function checkPassword(ok, failed) {
//   let password = prompt("Password?", "");
//   if (password == "Roadside Coder") ok();
//   else failed();
// }

// let user = {
//   name: "Varun Mendre",

//   login(result) {
//     console.log(this.name + (result ? "Login Successfully" : "Login Failed"));
//   },
// };

// checkPassword(user.login.bind(user, true), user.login.bind(user, false));

// const age = 10;

// var person = {
//   name: "varun",
//   age: 20,
//   getAgeArrow: () => console.log(this.age),
//   getAge() {
//     console.log(this.age);
//   },
// };

// var person2 = { age: 24 };

// person.getAge.call(person2); // 24
// person.getAgeArrow.call(person2); // undefined

const obj = { name: "Varun" };

function greet(age, designation) {
  console.log(`Hello ${this.name}, age: ${age} work as a ${designation}`);
}

Function.prototype.customCall = function (context = {}, ...args) {
  if (typeof this != "function") throw new Error("should be a callable");

  context.fn = this;
  context.fn(...args);
};

Function.prototype.customApply = function (context = {}, args = []) {
  if (typeof this != "function") throw new Error("should be a callable");

  if (!Array.isArray(args))
    throw new Error("second parameter should be a array");

  context.fn = this;
  context.fn(...args);
};

Function.prototype.customBind = function (context = {}, ...args) {
  if (typeof this != "function")
    throw new Error("this is not a callable function");

  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

// greet.customCall(obj, 22, "software engineer");
// greet.customApply(obj, [22, "SDE-1"]);

// const bindFunction = greet.customBind(obj, 22);
// bindFunction("SDE-2");

function introduce() {
  console.log(`Hi, I'm ${this.name}`);
}

const user1 = {
  name: "Varun",
};
const user2 = {
  name: "Rahul",
};

// introduce.call(user1)
// introduce.call(user2)

// function calculateSalary(bonus, deduction) {
//   console.log(`${this.name} your monthly salary is: ${this.basicSalary + bonus - deduction}`);
// }

// const employee = {
//   name: "Varun",
//   basicSalary: 50000,
// };

// calculateSalary.call(employee, 10000, 5000);

function calculateTotal(price, tax, discount) {
  console.log(`${this.name} will cost: ${price + tax - discount}`);
}

const product = {
  name: "Laptop",
};

const values = [50000, 5000, 3000];

// calculateTotal.call(product, ...values);
// calculateTotal.apply(product, values);

const user = {
  name: "Varun",
  age: 24,

  introduce() {
    console.log(`${this.name} is ${this.age} years old`);
  },
};

const anotherUser = {
  name: "Rahul",
  age: 30,
};

// user.introduce.call(anotherUser);

const user3 = {
  name: "Varun",
};

function greet1(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

// const bindFunction1 = greet1.bind(user3);
// bindFunction1("Hello");
// bindFunction1("Good Morning");
// bindFunction1("Welcome");

// function calculate(a, b, c) {
//   console.log(a + b + c);
// }

// const addTen = calculate.bind(null, 10);

// addTen(20, 30);
// addTen(5, 15);

const user4 = {
  name: "varun",

  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

setTimeout(() => {
  user4.greet.bind(user4)();
}, 1000);

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function")
    throw new Error(this + "should be a callable");

  context.fn = this;

  const result = context.fn(...args);
  delete context.fn;

  return result;
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function")
    throw new Error(this + "should be a callable");

  context.fn = this;

  const result = context.fn(...args);
  delete context.fn;

  return result;
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function")
    throw new Error(this + "should be a callable");

  const originalFunction = this;

  return function (...newArgs) {
    return originalFunction.myCall(context, ...args, ...newArgs);
  };
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const BoundPerson = Person.bind(null, "Varun");
const person = new BoundPerson(24);

console.log(person); // returns Person {name: "Varun", age: 24}

// Safest way to create call, apply & bind

Function.prototype.myCustomCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }

  context = context | globalThis;

  const funcKey = Symbol("fn");
  context[funcKey] = this;

  const result = context[funcKey](...args);

  delete context[funcKey];
  return result;
};

Function.prototype.myCustomApply = function (context = {}, argsArray = []) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }

  if (!Array.isArray(argsArray) && argsArray !== null) {
    throw new TypeError("given input is not a array");
  }

  context = context | globalThis;

  const funcKey = Symbol("fn");
  context[funcKey] = this;

  const result = context[funcKey](...(argsArray || []));

  delete context[funcKey];
  return result;
};

Function.prototype.myCustomBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }

  const targetFunction = this;

  const boundFunction = function (...callArgs) {
    return targetFunction.myCustomApply(context, [...boundArgs, ...callArgs]);
  };

  if (targetFunction.prototype) {
    boundFunction.prototype = Object.create(targetFunction.prototype);
  }

  return boundFunction;
};
