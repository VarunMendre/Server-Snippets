# 🚀 What is PromQL?

**PromQL (Prometheus Query Language)** is the language used to query data stored in **Prometheus**.

Prometheus stores **time-series data**.

PromQL allows you to:

- 📊 Fetch metrics
- 🔎 Filter metrics
- 🧮 Calculate rates
- 📈 Aggregate data
- 🚨 Create alert conditions

In simple words:

> PromQL is the language you use to ask Prometheus questions.

Example question:

- “How many requests per second are happening?”
- “What is CPU usage?”
- “What is the p95 latency?”

PromQL answers these.

---

# 📦 PromQL Data Types

PromQL has **4 data types**.

## 1️⃣ Instant Vector (vector) ⏱️

This is the most common.

It is:

> A set of time series, each having ONE value at the current time.

Example:

```promql
http_requests_total
```

Returns:

Multiple series like:

```
http_requests_total{method="GET"} 1024
http_requests_total{method="POST"} 340
```

Each has one value at current (latest) timestamp.

---

## 2️⃣ Range Vector (matrix) ⌛

This contains:

> Multiple samples over a time range.

Example:

```promql
http_requests_total[5m]
```

This returns data like:

```
Series A → values from last 5 minutes
Series B → values from last 5 minutes
```

---

## 3️⃣ Scalar (scalar) 🔢

A single numeric value.

Example:

```promql
1
```

Or result of:

```promql
scalar(sum(http_requests_total))
```

Scalar = just one number.

---

## 4️⃣ String (string) 🧵

Rarely used.

Mostly internal use.

You will almost never use this directly.
