import { createClient, SchemaFieldTypes } from "redis";

const client = createClient({ url: "redis://localhost:6379" });
await client.connect();

console.log("Redis Connected ✅");
console.log(SchemaFieldTypes);
