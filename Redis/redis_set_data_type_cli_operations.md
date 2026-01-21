# Redis SET Data Type – CLI Operations (Complete Guide)

Redis **SET** is an unordered collection of **unique** strings. It is optimized for fast membership checks and set algebra operations like intersection, union, and difference.

---

## Key Properties of Redis SET

- ✅ No duplicate elements
- ❌ No guaranteed order
- ⚡ O(1) time complexity for most operations
- 🔥 Ideal for tags, permissions, followers, groups, deduplication

---

## 1. SADD – Add members to a Set

```bash
SADD bikes:racing:france bike:1
```

**Output**
```
(integer) 1
```

- Returns number of **new elements added**
- Duplicate insertions are ignored

```bash
SADD bikes:racing:france bike:1
```
```
(integer) 0
```

### Add multiple members
```bash
SADD bikes:racing:france bike:2 bike:3
```

---

## 2. SISMEMBER – Check membership

```bash
SISMEMBER bikes:racing:usa bike:1
```

**Output**
```
(integer) 1
```

```bash
SISMEMBER bikes:racing:usa bike:2
```
```
(integer) 0
```

- O(1) operation
- Used for fast permission / access checks

---

## 3. SMISMEMBER – Check multiple members

```bash
SMISMEMBER bikes:racing:france bike:2 bike:3 bike:4
```

**Output**
```
1 1 0
```

- More efficient than calling SISMEMBER multiple times

---

## 4. SMEMBERS – Get all members

```bash
SMEMBERS bikes:racing:france
```

**Output (unordered)**
```
1) "bike:1"
2) "bike:2"
3) "bike:3"
```

⚠️ Order is not guaranteed

---

## 5. SCARD – Get set size

```bash
SCARD bikes:racing:france
```

**Output**
```
(integer) 3
```

---

## 6. SINTER – Intersection of sets

```bash
SINTER bikes:racing:france bikes:racing:usa
```

**Output**
```
1) "bike:1"
```

📌 Finds **common elements** across sets

---

## 7. SUNION – Union of sets

```bash
SUNION bikes:racing:france bikes:racing:usa bikes:racing:italy
```

**Output**
```
bike:1 bike:2 bike:3 bike:4
```

📌 Combines all unique members

---

## 8. SDIFF – Difference between sets

```bash
SDIFF bikes:racing:france bikes:racing:usa
```

**Output**
```
bike:2 bike:3
```

📌 Elements in **first set but not in others**

⚠️ Order matters

```bash
SDIFF bikes:racing:usa bikes:racing:france
```

```
bike:4
```

---

## 9. SREM – Remove specific members

```bash
SREM bikes:racing:france bike:1
```

**Output**
```
(integer) 1
```

---

## 10. SPOP – Remove & return random member

```bash
SPOP bikes:racing:france
```

**Output**
```
"bike:3"
```

📌 Useful for job distribution, load balancing

---

## 11. SRANDMEMBER – Get random member (no removal)

```bash
SRANDMEMBER bikes:racing:france
```

**Output**
```
"bike:4"
```

📌 Non-destructive random access

---

## 12. DEL – Delete the entire set

```bash
DEL bikes:racing:france
```

---

## SET vs LIST (Interview Comparison)

| Feature | SET | LIST |
|------|----|----|
| Order | ❌ No | ✅ Yes |
| Duplicates | ❌ No | ✅ Yes |
| Membership Check | O(1) | O(N) |
| Use Case | Tags, Groups | Queues |

---

## When to Use Redis SET

- ✅ Unique identifiers
- ✅ Permissions & roles
- ✅ Followers / likes
- ✅ Deduplication
- ✅ Fast existence checks

---

### Interview Tip
> If you need **uniqueness + fast membership checks**, SET is always better than LIST.

---

**Next topics you can add:**
- Redis SETs in Node.js patterns
- Reliable job queues with SET + LIST
- SET vs HASH vs ZSET
- Red