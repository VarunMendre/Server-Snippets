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
