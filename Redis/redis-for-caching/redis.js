import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

await redisClient.connect();
console.log("Redis DB Connected!");

export default redisClient;
