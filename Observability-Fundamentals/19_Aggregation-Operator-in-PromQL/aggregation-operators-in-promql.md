# 1. Basic Aggregation Operators

## 1️⃣ sum()

Adds values together.

Example: total RPS across all routes

```promql
sum(http_requests_total)
```

---

## 2️⃣ avg()

Average of multiple time series.

Example:

```promql
avg(http_requests_total)
```

---

## 3️⃣ min()

Returns minimum value among series.

Example: lowest RPS among routes

```promql
min(rate(http_requests_total[1m]))
```

Use case:

* Finding under-utilized instance
* Finding fastest route

---

## 4️⃣ max()

Returns maximum value among series.

Example: highest RPS route

```promql
max(rate(http_requests_total[1m]))
```

Use case:

* Find hottest endpoint
* Peak CPU usage

---

## 5️⃣ count()

Counts number of time series.

Example: how many endpoints exist

```promql
count(http_requests_total)
```

Use case:

* Count active instances
* Count unique label combinations

---

# 2. Grouping: by() and without()

When you aggregate, Prometheus drops all labels by default.

You must tell it what to preserve.

---

## 🔹 sum by()

Keep specific labels.

Example: RPS per route

```promql
sum by (path) (rate(http_requests_total[1m]))
```

This means:

* Sum across everything
* But keep `path`

Example: RPS per method + status

```promql
sum by (method, status) (rate(http_requests_total[1m]))
```

---

## 🔹 sum without()

Opposite logic: remove specific labels.

Example:

```promql
sum without (instance) (rate(http_requests_total[1m]))
```

This means:

* Drop `instance`
* Keep everything else

This is very useful in multi-instance setups.

---

# 3. Instant vs Range Aggregations

There are two types of aggregation:

### A) Across series

(sum, avg, min, max)

### B) Across time

(max_over_time, avg_over_time, min_over_time, sum_over_time)

---

## 🔹 sum_over_time()

Total increase over time.

Example:

```promql
sum_over_time(http_requests_total[10s])
```

---

## 🔹 avg_over_time()

Average over time window.

Example:

```promql
avg_over_time(http_requests_total[10s])
```

---

## 🔹 max_over_time()

Peak value in time window.

Example:

```promql
max_over_time(http_requests_total[10s])
```