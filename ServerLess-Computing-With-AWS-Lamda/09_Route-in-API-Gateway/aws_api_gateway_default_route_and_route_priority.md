# AWS API Gateway – Default Route & Route Priority

---

# 1️⃣ What is a Route in API Gateway?

In AWS API Gateway (especially HTTP APIs), a **route** defines how an incoming request is matched and forwarded to a backend integration.

A route consists of:
- HTTP Method (GET, POST, PUT, DELETE, etc.)
- Path (/users, /orders/{id}, etc.)

Example:
GET /users → Lambda Function A
POST /users → Lambda Function B

---

# 2️⃣ What is a Default Route?

The **Default Route** is a special route that handles any request that does not match a defined route.

In HTTP API, it is written as:

$default

It acts as a fallback handler.

---

## 🔹 Why Do We Need a Default Route?

Sometimes:
- A client sends an unknown path
- A route is not explicitly defined
- You want to handle all unmatched requests centrally

Instead of returning 404 immediately, API Gateway forwards the request to the integration configured for $default.

---

## 🔹 Example

Defined routes:
- GET /users
- POST /users

If someone calls:
GET /products

And you have configured $default → Lambda X

Then:
API Gateway forwards this request to Lambda X.

---

## 🔹 Use Cases of Default Route

- Global error handling
- Logging unmatched requests
- Proxy-style API (single Lambda handling all routes)
- Dynamic routing logic inside backend

---

# 3️⃣ Route Priority in API Gateway

When multiple routes could potentially match a request, API Gateway uses **route priority rules** to decide which one to execute.

Route matching is based on:
1. Exact path match
2. Parameterized routes
3. Greedy path variables
4. $default route (lowest priority)

---

# 4️⃣ Route Matching Order (Highest to Lowest Priority)

## 1️⃣ Exact Match (Highest Priority)

Example:
GET /users/list

If request is:
GET /users/list

This exact match route is chosen.

---

## 2️⃣ Path Parameter Match

Example:
GET /users/{id}

If request is:
GET /users/101

Then {id} = 101

This has lower priority than exact match.

---

## 3️⃣ Greedy Path Variable

Written as:

/{proxy+}

This matches multiple segments.

Example:
GET /files/{proxy+}

If request is:
GET /files/images/2026/photo.png

proxy = images/2026/photo.png

Lower priority than specific parameter routes.

---

## 4️⃣ $default Route (Lowest Priority)

If no route matches, $default is executed.

It acts as the final fallback.

---

# 5️⃣ Route Priority Example (Important for Interviews)

Assume these routes exist:

1. GET /users/list
2. GET /users/{id}
3. GET /users/{proxy+}
4. $default

If request is:
GET /users/list

→ Route 1 selected (Exact match)

If request is:
GET /users/123

→ Route 2 selected (Parameterized)

If request is:
GET /users/a/b/c

→ Route 3 selected (Greedy path)

If request is:
GET /unknown

→ $default selected

---

# 6️⃣ Important Notes

- $default is mainly used in HTTP APIs.
- REST APIs typically use proxy resources like {proxy+} instead.
- Route priority ensures predictable request handling.
- Always design routes carefully to avoid conflicts.

---

# 7️⃣ Best Practices

- Use exact routes for critical endpoints.
- Avoid too many overlapping parameter routes.
- Use greedy routes carefully.
- Use $default for logging or centralized error handling.

---

# 8️⃣ Quick Summary

Default Route:
→ Handles unmatched requests
→ Written as $default
→ Lowest priority

Route Priority Order:
Exact Match > Path Parameter > Greedy Path > $default

---

✨ These notes are structured clearly for exams, interviews, and real-world AWS architecture understanding.

