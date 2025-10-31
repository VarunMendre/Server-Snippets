import redisClient from "./redis.js";


// const result = await redisClient.setJSON("test", { name: "Varun", age: 40, blood: "O ve+" });
const result = await redisClient.getJSON("test");
console.log(result);

redisClient.quit()