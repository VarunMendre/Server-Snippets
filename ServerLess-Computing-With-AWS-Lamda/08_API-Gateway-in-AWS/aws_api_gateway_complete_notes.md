# AWS API Gateway – Complete Notes

---

## 1️⃣ What is AWS API Gateway?

AWS API Gateway is a **fully managed service** that allows developers to create, publish, maintain, monitor, and secure APIs at any scale.

It acts as a **front door** for applications to access backend services such as:
- AWS Lambda
- EC2
- Elastic Beanstalk
- Containers (ECS / EKS)
- Any HTTP endpoint

In simple words:
> API Gateway sits between the client and your backend and manages requests securely and efficiently.

---

## 2️⃣ Why Do We Need API Gateway?

Without API Gateway:
- Clients directly call backend services
- No centralized security
- No rate limiting
- No request validation
- No monitoring or logging control

With API Gateway:
- Centralized authentication & authorization
- Throttling and rate limiting
- Request/response transformation
- Monitoring via CloudWatch
- API versioning
- Caching
- SSL/TLS support

---

## 3️⃣ How API Gateway Works (Flow)

1. Client sends HTTP request
2. API Gateway receives request
3. Applies authentication (if configured)
4. Validates request
5. Forwards request to backend (Lambda / EC2 / etc.)
6. Receives response
7. Sends formatted response back to client

---

# 4️⃣ Types of APIs in AWS API Gateway

AWS provides three main API types:

## 1. REST API
## 2. HTTP API
## 3. WebSocket API

Let’s understand each clearly.

---

# 🔹 1. REST API

### Description:
Fully featured API type. Older but more powerful.

### Key Features:
- Request/response transformation
- API Keys
- Usage Plans
- Caching
- WAF integration
- Stage variables
- Fine-grained IAM authorization
- Custom authorizers (Lambda Authorizer)
- Detailed monitoring

### When to Choose REST API?

Choose REST API when:
- You need **advanced features**
- You require **API keys & usage plans**
- You need **request/response mapping templates**
- You want **caching support**
- You need **fine-grained control**
- Enterprise-level API management

### Drawbacks:
- Higher cost compared to HTTP API
- Slightly higher latency

---

# 🔹 2. HTTP API

### Description:
Lightweight, faster, and cheaper API type introduced after REST API.

### Key Features:
- Lower latency
- Lower cost
- Built-in JWT authorizer (OAuth / Cognito)
- Simple routing
- CORS support
- Auto-deploy option

### When to Choose HTTP API?

Choose HTTP API when:
- You want **cost-efficient solution**
- You need **low latency**
- You are building simple microservices
- You don’t need API keys or usage plans
- You are using JWT-based authentication

### Limitations Compared to REST API:
- No API keys
- No usage plans
- No request/response mapping templates (limited support)
- No caching support

---

# 🔹 3. WebSocket API

### Description:
Used for real-time, bidirectional communication.

### Use Cases:
- Chat applications
- Live notifications
- Multiplayer games
- Real-time dashboards

### How It Works:
- Client establishes persistent WebSocket connection
- Both client and server can send messages anytime

---

# 5️⃣ REST API vs HTTP API (Comparison Table)

| Feature | REST API | HTTP API |
|----------|-----------|-----------|
| Cost | Higher | Lower |
| Latency | Higher | Lower |
| API Keys | Supported | Not Supported |
| Usage Plans | Supported | Not Supported |
| Caching | Supported | Not Supported |
| JWT Authorizer | Via Custom | Built-in |
| Advanced Mapping | Yes | Limited |
| Best For | Enterprise APIs | Microservices |

---

# 6️⃣ Important Concepts in API Gateway

## 🔹 Routes
Defines which request path maps to which backend.

Example:
GET /users → Lambda function

---

## 🔹 Integration
Specifies backend service.

Types:
- Lambda Integration
- HTTP Integration
- Mock Integration
- AWS Service Integration

---

## 🔹 Stages
Logical deployment versions of API.

Example:
- dev
- test
- prod

Each stage has:
- Unique URL
- Separate configuration

---

## 🔹 Authorizers
Used for authentication.

Types:
- IAM
- Cognito
- Lambda Authorizer
- JWT (HTTP API)

---

## 🔹 Throttling
Controls request rate.

Prevents:
- Abuse
- DDoS
- Overload

---

## 🔹 Caching (REST API Only)
Stores responses temporarily to reduce backend load.

---

## 🔹 CORS
Allows cross-origin requests from frontend applications.

---

# 7️⃣ Real-World Architecture Example

Frontend (React App)
        ↓
API Gateway
        ↓
Lambda Function
        ↓
DynamoDB / RDS

API Gateway handles:
- Authentication
- Throttling
- Logging
- Routing

---

# 8️⃣ Best Practices

- Use HTTP API for simple microservices
- Use REST API for enterprise-level APIs
- Enable throttling
- Enable CloudWatch logging
- Use least privilege IAM roles
- Enable CORS properly
- Version APIs using stages

---

# 9️⃣ Summary

AWS API Gateway is a managed service that helps you:
- Secure APIs
- Scale APIs
- Monitor APIs
- Control traffic

### Quick Decision Guide:

If you want:
- Advanced features → REST API
- Low cost & speed → HTTP API
- Real-time communication → WebSocket API

---

✨ These notes are structured so you can directly use them for exam preparation, interviews, or project documentation.

