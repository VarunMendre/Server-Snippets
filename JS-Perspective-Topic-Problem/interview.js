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
