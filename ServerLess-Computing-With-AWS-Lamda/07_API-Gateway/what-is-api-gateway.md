# 🚪 What is an API Gateway?

An **API Gateway** is a **single entry point** for client requests that routes those requests to different backend services.  
It is **most commonly used in microservices architecture**, where an application is split into multiple independent services. Instead of clients talking to many services directly, they talk to **one gateway**.

---

## 🧠 Why API Gateway is especially useful in Microservices

In a microservices architecture:
- Each feature lives in its own service
- Each service may have its own URL, auth rules, limits, logs

> Without a gateway, clients must manage all that complexity 😵‍💫  
> With a gateway, complexity is centralized and simplified ✨

---

## 🛒 E-commerce Application Example

Let’s imagine an **e-commerce app** with four core capabilities:

1️⃣ User accounts  
2️⃣ Products catalog  
3️⃣ Orders  
4️⃣ Payments  

Internally, these are **four separate services**.

---

## ❌ Without API Gateway (client pain)

Each service exposes its own API.

### Public endpoints the client must call

```text
https://users.shop.com/api/users
https://products.shop.com/api/products
https://orders.shop.com/api/orders
https://payments.shop.com/api/payments
````

### Problems 🚨

* Multiple domains to remember
* CORS setup everywhere
* Authentication duplicated in every service
* Hard to apply rate limits consistently
* Frontend tightly coupled to backend structure

---

## ✅ With API Gateway (clean & simple)

Now introduce **one API Gateway**.

### Single public API 🌍

```text
https://api.shop.com
```

The gateway routes requests internally.

---

## 🎯 Final API Design (what client sees)

All endpoints are **clean and only three levels deep** 👌

### 1️⃣ Users 👤

```http
POST /users/login
GET  /users/me
```

### 2️⃣ Products 🛍️

```http
GET /products
GET /products/:productId
```

### 3️⃣ Orders 📦

```http
POST /orders
GET  /orders/:orderId
```

### 4️⃣ Payments 💳

```http
POST /payments/checkout
```

Client only knows:
👉 `https://api.shop.com`

---

## 🔀 What the API Gateway does behind the scenes

### 🧭 Smart routing

* `/users/*` → User Service
* `/products/*` → Product Service
* `/orders/*` → Order Service
* `/payments/*` → Payment Service

### 🔐 Authentication

* Validate token once
* Forward user identity to services

### 🚦 Rate limiting

* Prevent abuse
* Protect expensive endpoints like payments

### 📊 Observability

* Central logging
* Unified metrics
* Easier debugging

### 🛡️ Security

* Hide internal services
* Block bad traffic early

---

## 🧠 Simple mental model

Client 🧑‍💻
➡️ **API Gateway** 🚪
➡️ Microservices 🧩

The gateway is:

* the **front door**
* the **traffic controller**
* the **security guard**

---

## 🤔 Is API Gateway only for microservices?

No 🚫, but:

* Microservices is where its value is **most obvious**
* It can also be used with:

  * Serverless backends
  * Public APIs
  * Backend-for-Frontend patterns

---

## 🛠️ Examples of API Gateways

### 🆓 Open-source

* Kong
* Traefik
* NGINX
* Envoy
* Apache APISIX

### ☁️ Managed

* AWS API Gateway
* Google Apigee
* Azure API Management
* Cloudflare API Gateway

---

## ✨ Final takeaway

> An API Gateway simplifies how clients talk to complex backend systems, and it is **most commonly used in microservices architectures** to provide one clean, secure, and scalable API surface 🚀