# Redis Lists Data Type – Complete Guide

## 1. What is a Redis List?
Redis List is an ordered collection of strings implemented internally as a linked list. It allows fast insertions and deletions from both ends.

### Key Characteristics
- Ordered data structure
- Allows duplicate values
- Stores only strings
- Supports push/pop from both left and right
- O(1) time complexity for push/pop operations

---

## 2. Creating & Adding Elements

### LPUSH (Insert from Left)
```bash
LPUSH mylist A B C
```
Result:
```
C B A
```

### RPUSH (Insert from Right)
```bash
RPUSH mylist A B C
```
Result:
```
A B C
```

---

## 3. Reading Data

### LRANGE (Read elements)
```bash
LRANGE mylist 0 -1
```
- 0 → First element
- -1 → Last element

---

## 4. Removing Elements

### LPOP (Remove from Left)
```bash
LPOP mylist
```

### RPOP (Remove from Right)
```bash
RPOP mylist
```

### LLEN (Length of List)
```bash
LLEN mylist
```

---

## 5. Blocking Operations (Real-Time Use)

### BLPOP / BRPOP
```bash
BLPOP mylist 0
```
- Blocks client until data is available
- Used in message queues and worker systems

---

## 6. Index-Based Operations

### LINDEX
```bash
LINDEX mylist 1
```

### LSET
```bash
LSET mylist 1 UpdatedValue
```

---

## 7. Insert Relative to Element

### LINSERT
```bash
LINSERT mylist BEFORE A X
```

---

## 8. Trimming Lists

### LTRIM
```bash
LTRIM mylist 0 9
```
Keeps only first 10 elements

---

## 9. Remove Specific Values

### LREM
```bash
LREM mylist 2 A
```
- Positive count → from left
- Negative count → from right
- 0 → remove all

---

## 10. Moving Elements Between Lists

### RPOPLPUSH
```bash
RPOPLPUSH source destination
```
Atomic operation used in reliable queue systems

---

## 11. Common Use Cases
- Task Queues
- Activity Feeds
- Chat Messages
- Job Processing Systems

---

## 12. Performance Notes
- Push/Pop: O(1)
- Index access: O(N)
- Max size: ~4 bill