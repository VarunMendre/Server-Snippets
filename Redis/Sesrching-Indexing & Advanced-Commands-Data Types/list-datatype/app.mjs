import { createClient } from "redis";

const redisClient = await createClient().connect();

// left push
// for (let i = 1; i < 6; i++) {
//   await redisClient.LPUSH("users", `user:${i}`);
// }

// right push
// for (let i = 1; i < 6; i++) {
//   await redisClient.RPUSH("users", `user:${i}`);
// }

// Left POP // returns the pop element name
// const returnVal = await redisClient.LPOP("users");
// console.log(returnVal);

// Right POP // returns the pop element name
// const returnVal = await redisClient.RPOP("users");
// console.log(returnVal);

// Gives the value of between that range index
// const returnVal = await redisClient.LRANGE("users", 0, 1);
// console.log(returnVal);

// returns Length of List
// const returnVal = await redisClient.LLEN("users");
// console.log(returnVal);

// Remove elements by value
// const returnVal = await redisClient.LREM("users",1, "user:2");
// console.log(returnVal);

// Get element by index
// const returnVal = await redisClient.LINDEX("users",0);
// console.log(returnVal);

// Keep only a specified range, return OK 
// const returnVal = await redisClient.LTRIM("users",2, 3);
// console.log(returnVal);

redisClient.quit();
