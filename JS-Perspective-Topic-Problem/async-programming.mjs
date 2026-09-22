/*
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("A");

await delay(5000);

console.log("B");
*/

// function myPromiseAll (promises) {
//   return new Promise((resolve, reject) => {
//     let result = [];
//     let settled = 0;

//     promises.forEach((promise, i) => {
//       Promise.resolve(promise)
//         .then((value) => {
//           result[i] = value;
//           settled++;
//           if (settled == promises.length) resolve(result);
//         })
//         .catch(reject);
//     });
//   });
// };

// myPromiseAll([
//   Promise.resolve(10),
//   Promise.reject("20"),
//   Promise.resolve(30),
// ]).then(console.log);

// function myPromiseRace(promises) {
//   return new Promise((resolve, reject) => {
//     promises.forEach((promise) => {
//       Promise.resolve(promise).then(resolve).catch(reject);
//     });
//   });
// }

// myPromiseRace([
//   new Promise(res => setTimeout(() => res("fast"), 100)),
//   new Promise(res => setTimeout(() => res("slow"), 3000))
// ]).then(console.log);
// // "fast"  (resolves after ~100ms)

// myPromiseRace([
//   Promise.resolve("instant"),
//   new Promise(res => setTimeout(() => res("slow"), 5000))
// ]).then(console.log);
// // "instant"

// async function retry(fn, retries) {
//   for (let i = 0; i < retries; i++) {
//     console.log("Attempt no: ", i + 1);
//     try {
//       await fn();
//     } catch (err) {
//       if (i == retries - 1) throw err;
//     }
//   }
// }

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function retryWithBackoff(fn, retries) {
//   for (let i = 0; i < retries; i++) {
//     console.log("Attempt no: ", i + 1);
//     try {
//       return await fn(i + 1);
//     } catch (err) {
//       if (i == retries - 1) throw err;
//       const backoff = 1000 * Math.pow(2, i);
//       console.log(`Failed Retying in ${backoff}ms...`);
//       await delay(backoff);
//     }
//   }
// }

// async function fetchData(index) {
//   return await fetch("http://localhost:4000");
// }

// retryWithBackoff(fetchData, 3)
//   .then((res) => console.log("Success"))
//   .catch((err) => console.log("All retries failed: ", err.message));

// async function getUser() {
//   return new Promise((res, rej) => {
//     res({ userId: 1234 });
//   });
// }

// async function getPosts() {
//   return new Promise((res, rej) => {
//     res([
//       { postId: 1, content: "Breaking News!" },
//       { postId: 2, content: "Cold War!" },
//     ]);
//   });
// }

// async function getComments() {
//   return new Promise((res, rej) => {
//     res([["hahaha!", "Nice!"]]);
//   });
// }

// Sequential

// const user = await getUser();
// const posts = await getPosts();
// const comments = await getComments();

// Parallel

// const [user, posts, comments] = await Promise.all([getUser(), getPosts(), getComments()]);

// async function processUser() {
//   try {
//     const user = await getUser();
//     const orders = await getPosts(user.id);
//     return orders;
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// const result = await processUser();
// console.log(result);

// async function withTimeout(promise, timeout) {
//   return Promise.race([
//     promise,
//     new Promise((res, rej) => {
//       setTimeout(() => rej(new Error("TypeError")), timeout);
//     }),
//   ]);
// }

// async function processItem(id) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Processing ${id}...`);
//       resolve(id);
//     }, 1000);
//   });
// }

// async function run() {
//   const ids = [1, 2, 3, 4, 5, 6];

//   for (let i of ids) {
//     await processItem(i);
//   }
//   console.log("Completed!")
// }

// run();

// async function asyncMap(array, asyncFn) {
//   let result = [];

//   for (let i = 0; i < array.length; i++) {
//     result.push(asyncFn(array[i]));
//   }

//   return Promise.all(result);
// }

// const result = await asyncMap([1, 2, 3], async (num) => num * 2);
// console.log(result);

// const urls = ["/api/1", "/api/2", "/api/3", "/api/4", "/api/5", "/api/6"];

// async function fetchUrl(url) {
//   console.log(`Fetching ${url}`);
//   await new Promise((r) => setTimeout(r, 1000));
//   return { url, status: 200 };
// }

// async function asyncPool(limit, tasks, fn) {
//   const results = [];

//   for (let i = 0; i < tasks.length; i += limit) {
//     const chunk = tasks.slice(i, i + limit);
//     const promises = [];

//     for (let j = 0; j < chunk.length; j++) {
//       promises.push(fn(chunk[j]));
//     }

//     results.push(...(await Promise.all(promises)));
//   }

//   return results;
// }

// const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];

// async function executeTask(task) {
//   console.log(`Executing ${task}...`);
//   await new Promise((r) => setTimeout(r, 1000));
//   return { task, status: 200 };
// }

// async function promisePool(tasks, limit, fn) {
//   const results = [];

//   for (let i = 0; i < tasks.length; i += limit) {
//     const chunk = tasks.slice(i, i + limit);
//     const promises = [];

//     for (let j = 0; j < chunk.length; j++) {
//       promises.push(fn(chunk[j]));
//     }

//     results.push(...(await Promise.all(promises)));
//   }

//   return results;
// }

// const result = await promisePool(tasks, 3, executeTask);
// console.log(result);

// const user = Array.from(100, (_, i) => ({ id: i + 1 }));

// async function processInBatches(items, batchSize, asyncFn) {
//   let result = [];

//   for (let i = 0; i < items.length; i += batchSize) {
//     const batch = items.slice(i, i + batchSize);
//     const promises = await batch.map(asyncFn);
//     const batchResults = await Promise.all(promises);
//     result.push(...batchResults);
//   }

//   return result;
// }

// const users = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));

// async function processUser(user) {
//   console.log(`Processing user ${user.id}`);
//   await new Promise((r) => setTimeout(r, 1000));
//   return { ...user, processed: true };
// }

// const results = await processInBatches(users, 10, processUser);
// console.log(`Done: ${results.length} users`);

// async function fetchUsers() {
//   return new Promise((res, rej) => {
//     res([{ userId: 1234 }, { userId: 1235 }, { userId: 1236 }]);
//   });
// }

// async function fetchProducts() {
//   return new Promise((res, rej) => {
//     res([
//       { productId: 1, name: "T-shirt" },
//       { productId: 2, name: "Pants" },
//     ]);
//   });
// }

// async function fetchOrders() {
//   return new Promise((res, rej) => {
//     res([
//       { orderId: 101, price: 1500 },
//       { orderId: 102, price: 5200 },
//       { orderId: 103, price: 9200 },
//     ]);
//   });
// }

// async function loadDashboard() {
//   const [users, products, orders] = Promise.allSettled(
//     fetchUsers(),
//     fetchProducts(),
//     fetchOrders(),
//   );

//   const errors = [];

//   [users, products, orders].forEach((item, i) => {
//     if (item.status === "rejected")
//       errors.push({ section: i, error: item.reason });
//   });
//   return {
//     users: users.status === "fulfilled" ? users.value : [],
//     products: products.status === "fulfilled" ? products.value : [],
//     orders: orders.status === "fulfilled" ? orders.value : [],
//     errors,
//   };
// }

// console.log("1");

// setTimeout(() => console.log("2"), 0);

// Promise.resolve().then(() => console.log("3"));

// queueMicrotask(() => console.log("4"));

// console.log("5");

// Promise.resolve().then(() => {
//   console.log("A");

//   Promise.resolve().then(() => {
//     console.log("B");
//   });
// });

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");

/*
async function worker(tasks, result, nextIndex) {
  while (nextIndex.value < tasks.length) {
    const index = nextIndex.value;
    nextIndex.value++;

    result[index] = await tasks[index]();
  }
}

async function runWithConcurrency(tasks, limit) {
  const result = new Array(tasks.length);
  const workers = [];

  const nextIndex = { value: 0 };

  for (let i = 0; i < limit; i++) {
    workers.push(worker(tasks, result, nextIndex));
  }

  await Promise.all(workers);
  return result;
}

const tasks = [
  () => Promise.resolve("A"),
  () => Promise.resolve("B"),
  () => Promise.resolve("C"),
  () => Promise.resolve("D"),
];

const result = await runWithConcurrency(tasks, 2);

console.log(result);
 */

/*
async function process(tasks) {
  return Promise.all(tasks.map((task) => task()));
}

async function processInBatches(tasks, limit) {
  const result = [];

  for (let i = 0; i < tasks; i += limit) {
    const task = tasks.slice(i, i + limit);

    const resolved = await process(task);

    result.push(...resolved);
  }

  return result;
}
*/

/*
console.log("A"); // 1

setTimeout(() => {
  console.log("B"); // 5

  Promise.resolve().then(() => {
    console.log("C"); // 6
  });
}, 0);

Promise.resolve().then(() => {
  console.log("D"); // 3

  setTimeout(() => {
    console.log("E"); // 7
  }, 0);
});

queueMicrotask(() => {
  console.log("F"); // 4
});

console.log("G"); // 2

*/

/*  Call, Apply & Bind Polyfills  
const user = {
  name: "Varun",
};

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error(this, " must be callable");

  context = context || globalThis;

  const funcKey = Symbol("fn");
  context[funcKey] = this;

  const result = context[funcKey](...args);

  delete context[funcKey];

  return result;
};

// greet.myCall(user, "Hello"); // Hello, Varun

Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply: not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("args must be an array");
  }

  context = context || globalThis;

  const funcKey = Symbol("fn");
  context[funcKey] = this;

  const result = context[funcKey](...args);
  delete context[funcKey];

  return result;
};

function greet1(greeting, designation) {
  console.log(`${greeting}, I'm ${this.name} a ${designation}`);
}


greet1.myApply(user, ["Hello", "Software Developer"]) // Hello, I'm Varun a Software Developer

Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") throw new TypeError("myBind: not a callable");

  const targetFunction = this;
  const boundFunction = function (...args) {
    return targetFunction.myApply(context, [...boundArgs, ...args]);
  };

  if (targetFunction.prototype)
    boundFunction.prototype = Object.create(targetFunction.prototype);

  return boundFunction;
};

function greet2(greeting, designation) {
  console.log(`${greeting}, I'm ${this.name} a ${designation}`);
}

const resultFunction = greet2.myBind(user, "Hello");

resultFunction("Software Developer"); //Hello, I'm Varun a Software Developer

*/

/*   Retry with Exponential Backoff

// trying to fail this api always


async function fetchExternalAPI() {
  const response = await fetch("https://api.example.com/data");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

async function retry(fn, maxRetries, delay) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt < maxRetries) {
        console.log("API failed to fetch on Attempt: ", attempt);
        await new Promise((resolve) => setTimeout(resolve, delay * 2 ** attempt+1));
      }
    }
  }

  throw new Error(lastError);
}
 

const result = await retry(() => fetchExternalAPI(), 3, 1000);
console.log(result);   
*/
/*
- microtask queue: console.log("G"); 
- process.nextTick queue: 
- callback queue:   console.log("B") 
*/

// As per Module JS this is output :

/* 

console.log("A"); // 1

setTimeout(() => {
  console.log("B");  // 8
}, 0);

Promise.resolve().then(() => {
  console.log("C");  // 3
});

process.nextTick(() => {
  console.log("D"); // 5 
});

queueMicrotask(() => {
  console.log("E"); // 4
});

process.nextTick(() => {
  console.log("F"); // 6

  Promise.resolve().then(() => {
    console.log("G");  // 7
  });
});

console.log("H"); // 2

// final output in module.js  : A H C E D F G B


*/


/*
const original = {
  name: "Varun",
  skills: ["JavaScript", "Node.js"],
  address: {
    city: "Pune",
  },
};

const copy = { ...original };

copy.name = "John";
copy.skills.push("TypeScript");
copy.address.city = "Mumbai";

console.log(original.name); // Varun
console.log(original.skills); // TypeScript
console.log(original.address.city); // Mumbai
*/


// console.log("A");

// const promise = new Promise((resolve, reject) => {
//     console.log("B");

//     resolve("C");

//     console.log("D");
// });

// promise.then((value) => {
//     console.log(value);
// });

// console.log("E");

/*
1. A
2. B
3. D
4. E
5. C
*/




// console.log("Start");

// const promise = Promise.resolve("Resolved");

// promise.then((value) => {
//   console.log("Then 1:", value);
// });

// promise.then((value) => {
//   console.log("Then 2:", value);
// });

// console.log("End");


/*
1. Start
2. End
3. Then 1: Resolved
4. Then 2: Resolved
*/


// console.log("Start");

// Promise.resolve(10)
//     .then((value) => {
//         console.log("A:", value);
//         return value * 2;
//     })
//     .then((value) => {
//         console.log("B:", value);
//         return value + 5;
//     })
//     .then((value) => {
//         console.log("C:", value);
//     });

// console.log("End");



/*
1. Start 
2. End 
3. A: 10
4. B: 20
5. C: 25
*/




// Promise.resolve(5)
//   .then((value) => {
//     console.log("A:", value);

//     value * 2;
//   })
//   .then((value) => {
//     console.log("B:", value);

//     return value + 10;
//   })
//   .then((value) => {
//     console.log("C:", value);
//   });


Promise.resolve(10)
    .then((value) => {
        console.log("A:", value);

        throw new Error("Something went wrong");
    })
    .then((value) => {
        console.log("B:", value);
    })
    .catch((error) => {
        console.log("Caught:", error.message);

        return 50;
    })
    .then((value) => {
        console.log("C:", value);
    });

    




