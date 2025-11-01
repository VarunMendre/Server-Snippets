// Node.js equivalents of Redis Search commands
import { createClient } from "redis";

const client = createClient();
await client.connect();

// 🔎 Fuzzy Search (Approximate Matching)
const fuzzy = await client.ft.search("userIdx", "%Kumar%");
console.log(`Fuzzy: ${fuzzy}`);

// 🌠 Search by Any Word (Logical OR)
const logicalOR = await client.ft.search("userIdx", "Bhupesh|Sahil");
console.log(`Logical OR: ${logicalOR}`);

// 📃 Paging Results (Pagination)
const Paging = await client.ft.search("userIdx", "Delhi", {
  LIMIT: {
    from: 10,
    size: 5,
  },
});
console.log(`Paging: ${Paging}`);

// 🚫 Excluding Words from Search
const excludeWords = await client.ft.search("userIdx", "-Sanat");
console.log(` Excluding Words: ${excludeWords}`);


// 🔠 Partial Word Search
// Prefix Match
const prefix = await client.ft.search("userIdx", "Kum*");
console.log(`prefix: ${prefix}`);

// Suffix Match
const suffix =  await client.ft.search("userIdx", "*mar");
console.log(`suffix: ${suffix}`);

// Specific Suffix Match
// await client.ft.search("userIdx", "*maar");
// console.log(`Fuzzy: ${fuzzy}`);

// Disconnect when done
await client.quit();
