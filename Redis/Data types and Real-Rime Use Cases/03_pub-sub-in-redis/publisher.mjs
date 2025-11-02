import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect();

await redisClient.publish("node_channel", "Hello");
await redisClient.quit();
