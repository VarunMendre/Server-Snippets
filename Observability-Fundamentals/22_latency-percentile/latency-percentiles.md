# 📊 What are Latency Percentiles?

A **latency percentile** tells you **how fast requests are for most users**.

It is **not the same as average latency**.

**Average latency →** One single overall number  
**Latency percentile →** Shows how fast or slow requests are at different points

It answers this question:

> For a given percentile, what latency was seen by that percentage of requests?

---

# Example with 10 Requests

Suppose a server handled **10 requests**, and these were their response times in milliseconds.

| Request | Latency |
| ------- | ------- |
| R1      | 120 ms  |
| R2      | 95 ms   |
| R3      | 110 ms  |
| R4      | 300 ms  |
| R5      | 80 ms   |
| R6      | 150 ms  |
| R7      | 100 ms  |
| R8      | 90 ms   |
| R9      | 500 ms  |
| R10     | 130 ms  |

---

# Step 1: Arrange Latencies

First, sort latencies from **lowest to highest**.

| Rank | Latency |
| ---- | ------- |
| 1    | 80 ms   |
| 2    | 90 ms   |
| 3    | 95 ms   |
| 4    | 100 ms  |
| 5    | 110 ms  |
| 6    | 120 ms  |
| 7    | 130 ms  |
| 8    | 150 ms  |
| 9    | 300 ms  |
| 10   | 500 ms  |

---

# Step 2: Percentile Idea

A latency percentile means:

* **P50** → 50% of requests were this fast or faster
* **P90** → 90% of requests were this fast or faster
* **P95** → 95% of requests were this fast or faster
* **P99** → 99% of requests were this fast or faster

In simple terms:

> The higher the percentile, the more it tells you about the slower requests.

---

# Step 3: Simple Formula

For simple understanding, we use this position formula:

```text
Position = ceil((Percentile / 100) × Total requests)
```

Then we pick the value at that position from the sorted list.

---

# Example Calculations

## P50 latency

Total requests = **10**

```text
Position = ceil((50 / 100) × 10)
Position = ceil(5)
Position = 5
```

5th value in sorted list = **110 ms**

✅ **P50 latency = 110 ms**

Meaning:

> 50% of requests took **110 ms or less**.

---

## P75 latency

```text
Position = ceil((75 / 100) × 10)
Position = ceil(7.5)
Position = 8
```

8th value in sorted list = **150 ms**

✅ **P75 latency = 150 ms**

Meaning:

> 75% of requests took **150 ms or less**.

---

## P90 latency

```text
Position = ceil((90 / 100) × 10)
Position = ceil(9)
Position = 9
```

9th value in sorted list = **300 ms**

✅ **P90 latency = 300 ms**

Meaning:

> 90% of requests took **300 ms or less**.

---

## P95 latency

```text
Position = ceil((95 / 100) × 10)
Position = ceil(9.5)
Position = 10
```

10th value in sorted list = **500 ms**

✅ **P95 latency = 500 ms**

Meaning:

> 95% of requests took **500 ms or less**.

---

## P99 latency

```text
Position = ceil((99 / 100) × 10)
Position = ceil(9.9)
Position = 10
```

10th value in sorted list = **500 ms**

✅ **P99 latency = 500 ms**

Meaning:

> 99% of requests took **500 ms or less**.

---

# Final Results Table

| Percentile | Latency |
| ---------- | ------- |
| P50        | 110 ms  |
| P75        | 150 ms  |
| P90        | 300 ms  |
| P95        | 500 ms  |
| P99        | 500 ms  |

---

# What This Tells Us

Looking at the numbers:

* **P50 = 110 ms** → half of the requests are quite fast
* **P75 = 150 ms** → most requests are still reasonably fast
* **P90 = 300 ms** → some requests are becoming much slower
* **P95 = 500 ms**
* **P99 = 500 ms** → worst-case requests are very slow

So even if many requests are fast, there are a few slow requests increasing the higher percentiles.

---

# Why Percentiles Are Better Than Average

Let’s calculate the average latency too:

```text
Average = (80 + 90 + 95 + 100 + 110 + 120 + 130 + 150 + 300 + 500) / 10
Average = 1675 / 10
Average = 167.5 ms
```

✅ **Average latency = 167.5 ms**

But this can be misleading.

Why?

Because most requests are between **80 ms and 150 ms**, but one very slow request of **500 ms** pushes the average up.

So:

* **Average** hides the real distribution
* **Percentiles** show how users actually experience performance

---

# Easy Meaning of Popular Latency Percentiles

## P50

This is the **middle** request.

> Typical latency

## P90

This shows the latency under which **90% of requests** finish.

> Good way to check if most users are getting fast responses

## P95

This focuses more on slower requests.

> Very commonly used in backend monitoring

## P99

This shows the **tail latency**, meaning the slowest edge cases.

> Useful for finding rare but painful slow requests

---

# Important Note

With only **10 requests**, higher percentiles like **P95** and **P99** both become the last value.

That is why in real systems, percentile calculations are more useful when you have **hundreds, thousands, or millions of requests**.

---

# One-Line Summary

**Latency percentile tells you how fast requests are for a certain percentage of users, and it helps you understand real performance much better than average latency.**