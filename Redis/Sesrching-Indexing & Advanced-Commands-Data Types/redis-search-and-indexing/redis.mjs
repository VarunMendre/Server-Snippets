import { createClient, SchemaFieldTypes } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
  process.exit(1);
});

await redisClient.connect();


await redisClient.ft.dropIndex("ageIdx", { DD: true });

redisClient.quit();
export default redisClient;
