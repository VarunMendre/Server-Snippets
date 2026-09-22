const fs = require("fs")
const _ = require('lodash');

const original = {
  name: 'John',
  age: 30,
  address: { city: 'New York', zip: '10001' },
  tags: ['dev', 'node']
};

const copy = _.cloneDeep(original);

// Modify the copy
copy.address.city = 'LA';
copy.tags.push('react');

console.log(original.address.city); // "New York" ✅ unaffected
console.log(original.tags);         // ['dev', 'node'] ✅ unaffected
console.log(copy.address.city);     // "LA"
console.log(copy.tags);             // ['dev', 'node', 'react']   

/*
- process.nextTick queue:  
- microtask queue: 
- callback queue: 
*/

// As per CommonJs this is the output : 
console.log("A"); // 1

setTimeout(() => {
  console.log("B");  // 8
}, 0);

Promise.resolve().then(() => {
  console.log("C");  // 5
});

process.nextTick(() => {
  console.log("D"); // 3
});

queueMicrotask(() => {
  console.log("E"); // 6
});

process.nextTick(() => {
  console.log("F"); // 4

  Promise.resolve().then(() => {
    console.log("G");  // 7
  });
});

console.log("H"); // 2

// final output in common.js : A H D F C E G B