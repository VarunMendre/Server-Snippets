import { createClient } from "redis";

// 1st way :

// const client = createClient({
//   username: "default",
//   password: "<you-password>",
//   socket: {
//     host: "<you-hostname>",
//     port: <port>,
//   },
// });

// 2nd way :

// const client = createClient({
//   url: "redis://default:<you-password>@<you-hostname>:<port>",
// });

// 3rd way:

const client = createClient({
    url: "redis://<you-hostname>:<port>",
    password:"<you-password>",
});


client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar

const result = await client.keys("*");
console.log(result);

client.quit();