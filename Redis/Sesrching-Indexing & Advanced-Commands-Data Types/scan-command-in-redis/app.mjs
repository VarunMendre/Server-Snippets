import { createClient } from "redis";

const redisClient = await createClient().connect();

// Blocks the Redis DB not NodeJS thread
// const keys = await redisClient.keys("*");
// console.log(keys);

let cursor = 0;

do {
    const { cursor: nextCursor, keys } = await redisClient.scan(cursor, {
        COUNT: 5,    
  });
  console.log(keys);
  cursor = nextCursor;
} while (cursor !== 0);

redisClient.quit();
