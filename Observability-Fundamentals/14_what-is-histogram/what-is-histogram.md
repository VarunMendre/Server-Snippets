# 📊 What Is a Histogram?

A **histogram** is a graph that shows how data is distributed across ranges (called bins or buckets).

Instead of showing every single value, it groups values into ranges and counts how many fall inside each range.

Think of it as:

> 📦 Data → grouped into boxes → count how many items in each box

---

# 🧠 Example 1: Student Marks Histogram

* X-axis → Marks (0–10, 10–20, 20–30, etc.)
* Y-axis → Number of students
* Each bar → How many students scored in that range

For example:

| Marks Range | Students |
| ----------- | -------- |
| 0–10        | 3        |
| 10–20       | 2        |
| 20–30       | 6        |
| 30–40       | 2        |
| 40–50       | 3        |
| 50–60       | 6        |
| 60–70       | 4        |
| 70–80       | 5        |
| 80–90       | 5        |
| 90–100      | 4        |

### 📌 What does this tell us?

* Most students scored between **20–30 and 50–60**
* Very few students scored below 20
* Distribution is somewhat spread out
* No extreme outliers

👉 So the histogram helps us **see performance pattern instantly**.

---

# ⚡ Example 2: Request Response Time Histogram

* X-axis → Response time (milliseconds)
* Y-axis → Number of requests
* Buckets:

  * 100–300 ms
  * 300–500 ms
  * 500–700 ms
  * 700–900 ms
  * 900–1100 ms

### 📊 Counts:

| Response Time | Requests |
| ------------- | -------- |
| 100–300 ms    | 11       |
| 300–500 ms    | 10       |
| 500–700 ms    | 8        |
| 700–900 ms    | 6        |
| 900–1100 ms   | 5        |

### 📌 What does this show?

* Most requests are fast (under 500 ms)
* Fewer requests are slow
* There is a right-side tail → meaning some slow responses exist

This is called:

> Right-skewed distribution

That means:

* Majority fast
* Few slow outliers

---

# 🔍 Important Concepts in Histogram

## 1️⃣ Bins (Buckets)

Bins are ranges.

Example:

* 0–10
* 10–20
* 20–30

Choosing bin size matters:

* Too small → noisy graph
* Too big → lose detail

---

## 2️⃣ Frequency

Height of each bar = how many values fall in that bin.

---

## 3️⃣ Bars Touch Each Other 🚪

Why?

Because data is continuous.

---

# 🧠 Why Histograms Are Powerful

They help you understand:

* 📍 Where most data lies
* ⚠️ If there are outliers
* 📈 If system is skewed
* 📊 Distribution shape

---

# 🔥 In Prometheus

In monitoring systems:

Histogram buckets look like:

```
http_request_duration_seconds_bucket{le="0.1"} 120
http_request_duration_seconds_bucket{le="0.3"} 450
http_request_duration_seconds_bucket{le="1"} 800
```

It counts:

* Requests under 100ms
* Requests under 300ms
* Requests under 1 second

From this, you calculate:

* p50 latency
* p95 latency
* p99 latency

Which is extremely important for production systems.