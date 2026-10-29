/* 1. 
var a = 500;

{
    var a = -500;
}

let b = a;

{
    let b = -1000;
}

console.log(b); // -500
*/

/*
console.log({} === {}); // false 
console.log({} == {});  // false

*/

// const arr = ["Varun", 88, 21, "there", 'c', 'a'];

/*
function separation(arr) {
    const numbers = [];
    const strings = [];
    const characters = [];

    for (let el of arr) {
        if (typeof el === "number")
            numbers.push(el);
        else if (typeof el === 'string') {
            if (el.length > 1)
                strings.push(el)
            else
                characters.push(el);
        } 
        
    }

    return [numbers, strings, characters];
}


const [numbers, strings, characters] = separation(arr);

console.log(numbers);
console.log(strings);
console.log(characters);

*/

// console.log([] + {}); // [object Object]

// console.log([] + []);

// console.log(typeof NaN)

// const result = [1, 2, 3, 4].filter((val) => val > 4)
// console.log(result)

// let arr1 = [1, 2, 3, ["varun", ["mendre"]]];

// function flatten(arr) {
//     let result = [];

//     for (let num of arr) {
//         if (Array.isArray(num)) {
//             result.push(...flatten(num));
//         } else {
//             result.push(num);
//         }
//     }

//     return result;
// }

// const result = flatten(arr1);
// console.log(result);

/*  Exponential Backoff

async function fetchRequest(url) {
  return fetch(url);
}

async function exponentialBackoff(url, totalAttempt = 3, initialDelay = 1000) {
  let delay = initialDelay;

  for (let attempt = 0; attempt < totalAttempt; attempt++) {
      console.log("Attempt no: ", attempt);
      try {
      const response = await fetchRequest(url);

      if (response.ok) {
        return await response.json();
      }

      if (
        response.status >= 400 &&
        response.status < 500 &&
        response.status !== 408 &&
        response.status !== 429
      ) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      if (attempt === totalAttempt - 1) {
        throw new Error(`Request failed: HTTP ${response.status}`);
      }
    } catch (error) {
      if (error.message.startsWith("HTTP error:")) {
        throw error;
      }

      if (attempt === totalAttempt - 1) {
        throw error;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    delay *= 2;
  }

  throw new Error("Request failed after all attempts");
}

// Example:
exponentialBackoff("https://api.cloudvault.cloud/users")
  .then(console.log)
  .catch(console.error);
*/

// console.log({} + '[]');

// console.log(2 - "2" + 3);

/*
var a = {
  id: 104,
  title: "Hello",
  text: "Varun",
}

var b = {
  id: 105,
  title: "Hello World",
}

var c = { ...a, ...b };

console.log(c);
*/

// const arr = ["rudra", "duaa"];

/*
function doesOccur(arr) {
  let mpp = new Map();
  let source = arr[1].split("");
  for (let i = 0; i < source.length; i++) {
    if (!mpp.has(source[i])) {
      mpp.set(source[i], 1);
    } else {
      mpp.set(source[i], mpp.get(source[i]) + 1);
    }
  }

  let searchArr = arr[0].split("");
  for (let i = 0; i < searchArr.length; i++) {
    if (!mpp.has(searchArr[i])) {
      mpp.set(searchArr[i], 1);
    } else {
      mpp.set(searchArr[i], mpp.get(searchArr[i]) + 1);
    }
  }

  let isValid = true;
  mpp.forEach((val) => {
    console.log(val);
    if (val > 2) isValid = false;
  });

  console.log(isValid);
}

doesOccur(arr);

*/

// const arr = [10, 13, 17, 18, 21, 14];

// const totalSum = arr.reduce((acc, cur) => acc + cur, 0);

// console.log(totalSum);

// console.log("abc" - 100);

/*
let value = 10;
function a() {
  function b() {
    function c() {
      console.log(value);
    }
    c();
  }
  b();
}
a(); // 10
*/

// if([] == false) {
//   console.log("Varun");
// }

/*
var a = 10;
if (function echo() { }) {
  a = a + typeof echo;
} 

console.log(a);

*/

/*
function sum(a) {
  return function (b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}

const result1 = sum(1);
const result2 = sum(1)(1);

console.log(result1);
console.log(result2);
*/

/*
function fun(a, ...b) {
  console.log(typeof a)
  console.log(typeof b)
}

fun(10, 20, "Varun", 50);
*/

// let arr1 = [1, 2, "Varun", "Mendre", "H", "E", "L", 7, 3];

/*
function separation(arr) {
  let words = [];
  let characters = [];

  for (let c of arr) {
    if (typeof c === "string") {
      if (c.length > 1)
        words.push(c);
      else
        characters.push(c);
    }
  }

  return [words, characters];
}
*/

// let [wordResult, characterResult] = separation(arr1);

// console.log(wordResult);
// console.log(characterResult);

class Node {
  constructor(key, value) {
    this.next = null;
    this.prev = null;
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0)
      throw new Error("capacity cannot be negative");

    this.capacity = capacity;
    this.mpp = new Map();
    this.head = new Node(null, null);
    this.tail = new Node(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  addToFront(node) {
    const temp = this.head.next;

    this.head.next = node;
    node.prev = this.head;

    temp.prev = node;
    node.next = temp;
  }

  moveToFront(node) {
    this.removeNode(node);
    this.addToFront(node);
  }

  evictLRU() {
    const lruNode = this.tail.prev;
    this.removeNode(lruNode);
    this.mpp.delete(lruNode.key);
  }

  get(key) {
    if (!this.mpp.has(key)) return -1;

    const node = this.mpp.get(key);
    this.moveToFront(node);

    return node.value;
  }

  put(key, value) {
    if (this.mpp.has(key)) {
      const node = this.mpp.get(key);
      node.value = value;

      this.moveToFront(node);
    } else {
      const node = new Node(key, value);

      this.mpp.set(key, node);
      this.addToFront(node);

      if (this.mpp.size > this.capacity) this.evictLRU();
    }
  }
}


function printCache(cache, operation) {
  const items = [];
  let current = cache.head.next;

  while (current !== cache.tail) {
    items.push(`${current.key}:${current.value}`);
    current = current.next;
  }

  console.log(`\n${operation}`);
  console.log("Cache (MRU → LRU):", items);
  console.log("Map keys:", [...cache.mpp.keys()]);
}

const cache = new LRUCache(1);

console.log("=== Test 1: Insert two entries ===");

cache.put(1, 100);
printCache(cache, "put(1, 100)");

cache.put(2, 200);
printCache(cache, "put(2, 200)");

console.log("\n=== Test 2: Access an existing key ===");

console.log("get(1) =", cache.get(1));
printCache(cache, "After get(1)");

console.log("\n=== Test 3: Insert when cache is full ===");

cache.put(3, 300);
printCache(cache, "put(3, 300)");

console.log("\n=== Test 4: Access an evicted key ===");

console.log("get(2) =", cache.get(2));
printCache(cache, "After get(2)");

console.log("\n=== Test 5: Update an existing key ===");

cache.put(1, 111);
printCache(cache, "put(1, 111)");

console.log("get(1) =", cache.get(1));
printCache(cache, "After get(1)");

console.log("\n=== Test 6: Access a missing key ===");

console.log("get(99) =", cache.get(99));
printCache(cache, "After get(99)");
