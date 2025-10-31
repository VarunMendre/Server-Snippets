import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Error:", err);
  process.exit(1);
});

await redisClient.connect();

export default redisClient;
