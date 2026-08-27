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

async function getUser() {
  return new Promise((res, rej) => {
    res({ userId: 1234 });
  });
}

async function getPosts() {
  return new Promise((res, rej) => {
    res([
      { postId: 1, content: "Breaking News!" },
      { postId: 2, content: "Cold War!" },
    ]);
  });
}

async function getComments() {
  return new Promise((res, rej) => {
    res([["hahaha!", "Nice!"]]);
  });
}

// Sequential

// const user = await getUser();
// const posts = await getPosts();
// const comments = await getComments();

// Parallel

// const [user, posts, comments] = await Promise.all([getUser(), getPosts(), getComments()]);

async function processUser() {
  try {
    const user = await getUser();
    const orders = await getPosts(user.id);
    return orders;
  } catch (err) {
    console.error(err.message);
  }
}

const result = await processUser();
console.log(result);

async function withTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((res, rej) => {
      setTimeout(() => rej(new Error("TypeError")), timeout);
    }),
  ]);
}
