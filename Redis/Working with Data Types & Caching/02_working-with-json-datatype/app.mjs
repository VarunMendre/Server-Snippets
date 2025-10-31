import redisClient from "./redis.js";



// const result = await redisClient.json.get("user:1", {
//     path: '$.location.city'
// })
// console.log(result);


// const result = await redisClient.json.arrPop("user:1", {
//     path: '$.hobbies'
// }, 0);
// console.log(result);

// const result = await redisClient.json.arrLen(
//   "user:1",
//   {
//     path: "$.hobbies",
//   },
// );
// console.log(result);

// const result = await redisClient.json.set("user:1", '$.address', {
//     name: "Pune"
// });
// console.log(result);

// const result = await redisClient.json.get("user:1", {
//   path: "$.address",
// });
// console.log(result);

// const result = await redisClient.json.get("user:1", {
//   path: "$.hobbies[*]",
// });
// console.log(result);


const result = await redisClient.json.get("user:1", {
  path: "$..name",
});
console.log(result);
redisClient.quit()