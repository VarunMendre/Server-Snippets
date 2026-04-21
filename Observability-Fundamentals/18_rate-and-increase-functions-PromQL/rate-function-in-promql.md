# 🚀 What Is `rate()` in PromQL?

`rate()` calculates:

> **The per-second average increase of a counter over a time range.**

It answers:

> “How fast is this counter increasing per second?”

---

# 🧠 Important: `rate()` Is Only For Counters

Use `rate()` with metrics that:

* Only increase
* Reset only when process restarts

Examples:

* `http_requests_total`
* `process_cpu_seconds_total`
* `node_network_receive_bytes_total`

Never use `rate()` on gauges.

---

# 📐 Basic Syntax

```promql
rate(metric_name[window])
```

Example:

```promql
rate(http_requests_total[1m])
```

This means:

> Calculate average per-second increase over the last 1 minute.

---

# 🔬 How `rate()` Actually Works Internally

Let’s break it step by step.

---

## Step 1️⃣: Collect Samples

If you run:

```promql
rate(http_requests_total[1m])
```

Prometheus:

* Looks back 1 minute from evaluation time
* Collects all samples inside that window

Example samples:

| Time | Value |
| ---- | ----- |
| t0   | 100   |
| t1   | 150   |
| t2   | 200   |
| t3   | 250   |

---

## Step 2️⃣: Detect Counter Resets

For every consecutive pair:

```
delta = current - previous
```

If delta >= 0 → normal  
If delta < 0 → reset detected → treat delta as current value

This ensures negative drops are ignored.

---

## Step 3️⃣: Sum All Valid Increases

Example:

```
100 → 150 = +50
150 → 200 = +50
200 → 250 = +50
```

Total increase = 150

---

## Step 4️⃣: Calculate Effective Time Span

Prometheus does NOT divide by the requested window size.

It divides by:

```
last_sample_timestamp - first_sample_timestamp
```

If first sample = T-60
Last sample = T-5

Effective span = 55 seconds

---

## Step 5️⃣: Divide

```
rate = total_increase / effective_time_span
```

Example:

```
150 / 55 = 2.72 requests per second
```

---

# 🎯 What Does `rate()` Return?

It returns:

> Per-second average increase

Units depend on metric.

Examples:

### For HTTP requests:

```
2.7
```

means 2.7 requests per second.

### For CPU seconds:

```
3.2
```

means 3.2 CPU cores used.
