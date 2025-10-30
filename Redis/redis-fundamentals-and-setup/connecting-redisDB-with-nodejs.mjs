import { createClient } from "redis";

try {
  const redisClient = await createClient().connect();

  // GET

  const result2 = await redisClient.set("Obj1", jsonObj);
  console.log(result2);

  // SET
  const result1 = await redisClient.set("Obj1");
  console.log(result1);

  await redisClient.quit();
} catch (err) {
  console.log(err);
}
