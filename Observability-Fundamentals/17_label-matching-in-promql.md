# 🧠 1️⃣ Label Matching (Metric Selectors)

Basic structure:

```promql
metric_name{label_matchers}
```

Inside `{}` you write match conditions.

There are **4 label match operators**.

---

## ✅ 1. Exact Match (`=`)

Matches exact label value.

```promql
http_requests_total{method="GET"}
```

Meaning:
Only GET requests.

---

## ❌ 2. Not Equal (`!=`)

Exclude specific label value.

```promql
http_requests_total{status!="200"}
```

Meaning:
All statuses except 200.

---

## 🔎 3. Regex Match (`=~`)

Match using regular expression.

```promql
http_requests_total{status=~"5.."}
```

Matches:
500, 501, 502, etc.

Another example:

```promql
http_requests_total{route=~"/api/.*"}
```

Matches:
All routes starting with `/api/`

---

## 🚫 4. Regex Not Match (`!~`)

Exclude based on regex.

```promql
http_requests_total{route!~"/health|/metrics"}
```

Exclude:

* /health
* /metrics

---

# 📌 Multiple Label Conditions

You can combine inside `{}` using commas.

```promql
http_requests_total{
  method="GET",
  status=~"5..",
  route!="/health"
}
```

All conditions must match (logical AND).

Important:
Inside `{}` → conditions are always AND.

There is no OR inside `{}`.