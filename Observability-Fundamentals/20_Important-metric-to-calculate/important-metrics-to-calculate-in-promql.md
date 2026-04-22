## 1) Requests per second (RPS)

**Overall RPS**

```promql
sum(rate(http_requests_total[1m]))
```

**RPS by route**

```promql
sum by (path) (rate(http_requests_total[1m]))
```

**RPS by route + status**

```promql
sum by (path, status) (rate(http_requests_total[1m]))
```

**RPS by method**

```promql
sum by (method) (rate(http_requests_total[1m]))
```

---

## 2) Error rate and success rate

**5xx error RPS**

```promql
sum(rate(http_requests_total{status=~"5.."}[1m]))
```

**Error percentage (5xx / all)**

```promql
100 *
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

**Success percentage (2xx / all)**

```promql
100 *
sum(rate(http_requests_total{status=~"2.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

**404 rate**

```promql
sum by (path) (rate(http_requests_total{status="404"}[5m]))
```

---

## 3) Average request duration (mean latency)

We have a histogram with `_sum` and `_count`, so mean is `rate(sum)/rate(count)`.

**Global mean duration (seconds)**

```promql
sum(rate(http_request_duration_seconds_sum[5m]))
/
sum(rate(http_request_duration_seconds_count[5m]))
```

**Mean duration by route**

```promql
sum by (path) (rate(http_request_duration_seconds_sum[5m]))
/
sum by (path) (rate(http_request_duration_seconds_count[5m]))
```

**Mean duration by route + status**

```promql
sum by (path, status) (rate(http_request_duration_seconds_sum[5m]))
/
sum by (path, status) (rate(http_request_duration_seconds_count[5m]))
```

---

## 4) “Slow request” ratio

You can compute “% of requests below a threshold”.

Example: **percent of requests under 250ms**:

```promql
100 *
sum(rate(http_request_duration_seconds_bucket{le="0.25"}[5m]))
/
sum(rate(http_request_duration_seconds_count[5m]))
```

Example: **percent under 100ms by route**

```promql
100 *
sum by (path) (rate(http_request_duration_seconds_bucket{le="0.1"}[5m]))
/
sum by (path) (rate(http_request_duration_seconds_count[5m]))
```

Example: **slow requests over 1s (RPS)**

```promql
sum(rate(http_request_duration_seconds_count[5m]))
-
sum(rate(http_request_duration_seconds_bucket{le="1"}[5m]))
```

---

## 5) In-flight requests (concurrency)

Your gauge is perfect for “how many requests currently being processed”.

**Total in-flight**

```promql
sum(http_requests_in_flight)
```

**In-flight by route**

```promql
sum by (path) (http_requests_in_flight)
```

## 6) CPU usage from `process_cpu_seconds_total`

This metric is “CPU seconds consumed”. Use `rate()` to get “CPU seconds per second”, which is effectively “number of cores worth of CPU”.

**CPU cores used (average over 1m)**

```promql
rate(process_cpu_seconds_total[1m])
```

If it shows `0.25`, that means your process used ~25% of one core on average in that window.

**CPU percent**

```promql
100 * rate(process_cpu_seconds_total[1m])
```

or

```promql
100 * rate(process_cpu_seconds_total[1m]) / Number of total cores
```
