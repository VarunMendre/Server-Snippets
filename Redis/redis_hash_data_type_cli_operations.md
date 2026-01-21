# Redis HASH Data Type – CLI Operations (Complete Guide)

Redis **HASH** stores field–value pairs inside a single key. It is ideal for representing objects (like JSON but flatter) and is memory‑efficient.

---

## Key Properties of Redis HASH

- Stores **multiple fields under one key**
- Field names are strings
- Values are strings (numbers stored as strings)
- Supports atomic increments
- Very memory efficient for small objects

---

## 1. HSET – Create / Update Hash Fields

```bash
HSET bike:1 model Deimos brand Ergonom type "Enduro bikes" price 4972
```

**Output**
```
(integer) 4
```

📌 Returns number of **new fields added**

---

## 2. HGET – Get a Single Field

```bash
HGET bike:1 model
```

**Output**
```
"Deimos"
```

```bash
HGET bike:1 price
```

```
"4972"
```

⚠️ Numbers are returned as strings

---

## 3. HGETALL – Get Entire Hash

```bash
HGETALL bike:1
```

**Output**
```
1) "brand"   2) "Ergonom"
3) "model"   4) "Deimos"
5) "price"   6) "4972"
7) "type"    8) "Enduro bikes"
```

📌 Returns flat list (field → value)

---

## 4. HMGET – Get Multiple Fields

```bash
HMGET bike:1 model price
```

**Output**
```
1) "Deimos"
2) "4972"
```

---

## 5. HINCRBY – Increment Numeric Field

```bash
HINCRBY bike:1 price 100
```

**Output**
```
(integer) 5072
```

```bash
HINCRBY bike:1 price -100
```

```
(integer) 4972
```

📌 Atomic operation (safe for counters)

---

## 6. Using HASH as Counters / Stats Store

```bash
HINCRBY bike:1:stats rides 1
```

**Output**
```
(integer) 1
```

Repeated increments:
```bash
HINCRBY bike:1:stats rides 1
HINCRBY bike:1:stats rides 1
```

```
(integer) 3
```

Add more counters:
```bash
HINCRBY bike:1:stats crashes 1
HINCRBY bike:1:stats owners 1
```

---

## 7. Reading Stats Data

```bash
HGET bike:1:stats rides
```

```
"3"
```

```bash
HMGET bike:1:stats crashes owners
```

```
1) "1"
2) "1"
```

---

## 8. Additional Important HASH Commands

### HEXISTS – Check if field exists
```bash
HEXISTS bike:1 model
```

### HDEL – Delete fields
```bash
HDEL bike:1 type
```

### HLEN – Number of fields
```bash
HLEN bike:1
```

### HKEYS – Get all field names
```bash
HKEYS bike:1
```

### HVALS – Get all values
```bash
HVALS bike:1
```

---

## HASH vs JSON vs STRING (Interview)

| Feature | HASH | JSON | STRING |
|------|------|------|------|
| Structure | Flat | Nested | Single value |
| Partial update | ✅ | ✅ | ❌ |
| Memory usage | 🔥 Low | Medium | Low |
| Querying | Limited | Advanced | None |

---

## When to Use Redis HASH

- User profiles
- Product metadata
- Counters & stats
- Configurations
- Objects with fixed fields

---

### Interview Tip
> If you don’t need nesting or querying, **HASH is faster and lighter than JSON**.

---

**Next topics you can add:**
- HASH in Node.js patterns
- HASH vs ZSET
- Redis Leaderboards
- Redis HASH interview questions

