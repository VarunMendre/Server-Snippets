# 🌩️ **What is a CloudFront Function?**

A **CloudFront Function** is a lightweight JavaScript function that runs directly on AWS **edge locations**, close to your users.
It allows you to **inspect, modify, or generate HTTP requests and responses** instantly — without sending the request all the way to your server or S3 bucket.

It’s like having a **mini middleware at the CDN level** — ultra-fast, globally distributed, and cost-effective.

---

# ⚙️ **When It Runs**

CloudFront Functions can be attached at two points:

| Stage               | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Viewer Request**  | Runs before CloudFront serves the content. Used to modify or inspect the request.                |
| **Viewer Response** | Runs before CloudFront returns the response to the browser. Used to modify headers or responses. |

They’re ideal for small, logic-only operations such as **redirects, rewrites, and header manipulation**.

---

# 💡 **Common Use Cases**

### 🧭 Modify Request

* Redirect `http → https`
* Redirect `example.com → www.example.com`
* Rewrite SPA routes (`/login → /index.html`)
* Add or remove headers
* Allow/deny access based on IP or cookies

### 📦 Modify Response

* Add **CORS** or **security** headers
* Change response status codes (e.g., `301`, `302`)
* Return maintenance or error pages

---

# 💻 **Example 1 — Rewrite URL for SPA Routing**

```js
function handler(event) {
  console.log("Cloudfront function started!!");
  const request = event.request;

  if (!request.uri.includes('.')) {
    request.uri = '/index.html';
  }

  console.log("Cloudfront function end!!");
  return request;
}
```

🧠 **Explanation:**
This ensures that any route like `/login` or `/dashboard` loads `index.html` instead of returning 404.
Perfect for React, Vite, or Angular single-page apps where routing happens on the client side.

---

# 💻 **Example 2 — Add Security Headers**

```js
function handler(event) {
  const response = event.response;
  const headers = response.headers;

  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubDomains; preload' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['x-content-type-options'] = { value: 'nosniff' };

  return response;
}
```

🧠 **Explanation:**
Adds important security headers before sending the response — improves browser protection and SEO compliance.

---

# ⚡ **Performance Advantages**

* Executes in **under 1 millisecond**
* Runs at **400+ AWS edge locations**
* Deployed globally in **seconds**
* Handles **millions of requests per second**
* No cold starts, no infrastructure, no scaling required

---

# 💰 **Pricing**

| Metric              | Price                                          |
| ------------------- | ---------------------------------------------- |
| **Invocations**     | **$0.10 per 1 million invocations**            |
| **Additional Cost** | None (execution time & data transfer included) |

Even **100 million executions = only $10** — making it one of AWS’s most cost-efficient features.

---

# 🚀 **In short**

> CloudFront Functions let you run **instant JavaScript logic at the edge** —
> perfect for **redirects, rewrites, and headers**, running globally in microseconds at almost no cost.