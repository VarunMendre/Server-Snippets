import { createClient } from "redis";
import { MongoClient } from "mongodb";

const redisClient = createClient();
const mongoClient = new MongoClient("mongodb://admin:admin@localhost");

await redisClient.connect();
await mongoClient.connect();

const db = mongoClient.db();
const collection = db.collection("mongoTest");


// await redisClient.flushAll();
// await collection.deleteMany();


// Redis write

// console.time("Redis Write");
// await redisClient.json.set("user", "$", { _id: "123", name: "Varun" });
// console.timeEnd("Redis Write");

// // MongoDB Write

// console.time("MongoDB write");
// await collection.insertOne({ _id: "123", name: "Varun" });
// console.timeEnd("MongoDB write");

// Redis Read

// console.time("Redis Read");
// const data1 = await redisClient.json.get("user");
// console.log(data1);
// console.timeEnd("Redis Read");

// MongoDB Read

// console.time("MongoDB Read");
// const data2 = await collection.findOne({ _id: "123" });
// console.log(data2);
// console.timeEnd("MongoDB Read");



// console.time("Redis Write");
// await redisClient.set("userString", JSON.stringify({ _id: "123", name: "Varun" }));
// console.timeEnd("Redis Write");

console.time("Redis String Read");
const stringData = await redisClient.get("userString");
console.log(JSON.parse(stringData));
console.timeEnd("Redis String Read");

console.time("Redis JSON Read");
const jsonData = await redisClient.json.get("user");
console.log(jsonData);
console.timeEnd("Redis JSON Read");



await redisClient.quit();
await mongoClient.close();



