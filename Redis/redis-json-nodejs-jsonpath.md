
# RedisJSON with Node.js – Complete Guide (JSONPath Explained)

## 1. Setup & Helper Methods

```js
import redisClient from "./db.mjs";
```

### setJSON()
Stores a JS object directly into Redis using RedisJSON.

```js
await redisClient.setJSON("user:1", { name: "Alice", age: 30 });
```

➡ Internally calls:
```bash
JSON.SET user:1 $ {...}
```

### getJSON()
Fetches and parses JSON back into JS object.

```js
const user = await redisClient.getJSON("user:1");
```

---

## 2. Understanding JSONPath (`$` is CRITICAL)

### `$`
- Root of the JSON document

```bash
JSON.GET user:1 $
```

---

## 3. String Operations on JSON

```js
await client.json.set("bike", "$", '"Hyperion"');
```

### JSON.GET
```js
await client.json.get("bike", { path: "$" });
```

### JSON.TYPE
```js
await client.json.type("bike", { path: "$" });
```

### JSON.STRLEN
```js
await client.json.strLen("bike", { path: "$" });
```

### JSON.STRAPPEND
```js
await client.json.strAppend("bike", '" (Enduro bikes)"');
```

---

## 4. Number Operations

```js
await client.json.set("crashes", "$", 0);
await client.json.numIncrBy("crashes", "$", 1);
```

✔ Atomic  
✔ No GET + SET required

---

## 5. Arrays in RedisJSON

### Create Array
```js
await client.json.set("newbike", "$", ["Deimos", { "crashes": 0 }, null]);
```

### Access Array Index
```js
$.[1].crashes
```

### Delete Last Element
```js
$.[-1]
```

---

## 6. Array Commands

| Command | Purpose |
|-------|--------|
| ARRAPPEND | Add items |
| ARRINSERT | Insert at index |
| ARRTRIM | Keep range |
| ARRPOP | Remove last |

---

## 7. Objects in RedisJSON

```js
await client.json.set("bike:1", "$", {
  model: "Deimos",
  brand: "Ergonom",
  price: 4972
});
```

### OBJLEN
Returns number of keys

```js
await client.json.objLen("bike:1", { path: "$" });
```

### OBJKEYS
```js
await client.json.objKeys("bike:1", { path: "$" });
```

---

## 8. Complex Inventory Example

```js
await redisClient.json.set("bikes:inventory", "$", inventoryJSON);
```

---

## 9. JSONPath Deep Dive (MOST IMPORTANT)

### Wildcard `*`
```js
$.inventory.*
```

---

### Recursive `..`
```js
$..model
```

---

### Array Index
```js
$.inventory.mountain_bikes[0].model
```

---

### Array Slice
```js
$..mountain_bikes[0:2].model
```

---

### Filter
```js
$..mountain_bikes[?(@.price < 3000)]
```

---

### Multiple Conditions
```js
$..mountain_bikes[?(@.price < 3000 && @.specs.weight < 10)]
```

---

### Regex Match
```js
$..[?(@.specs.material =~ '(?i)al')]
```

---

### Dynamic Regex
```js
@.specs.material =~ @.regex_pat
```

---

## 10. Bulk Updates

```js
$..price
```

```js
$.inventory.*[?(@.price < 2000)].price
```

---

## 11. Conditional Array Update

```js
$.inventory.*[?(@.price < 2000)].colors
```

---

## 12. Interview Gold ⭐

- `$` always means root
- RedisJSON supports partial updates
- JSONPath avoids full reads
- RedisJSON + Search = powerful querying

---

## 13. Use Cases

✔ Caching  
✔ Sessions  
✔ Product catalogs  
✔ Search & filter  
✔ Real-time dashboards  

---

## 14. Key Takeaway

RedisJSON turns Redis into a **high-speed JSON document store** with atomic updates and JSONPath queries.
