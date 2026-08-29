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

Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");