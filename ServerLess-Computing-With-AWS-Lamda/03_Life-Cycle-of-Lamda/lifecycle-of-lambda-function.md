# Life Cycle of a Lambda Function

## 1) You hit the Function URL 🌐➡️⚡

When you call the Function URL:

* AWS receives an HTTPS request.
* Lambda maps that HTTP request into an **event object** (method, path, headers, query, body, etc.).
* Then Lambda must decide: **Do we already have a running execution environment ready for this function?**

That decision leads to:

* ❄️ **Cold start** (create a new environment)
* ✅ **Warm start** (reuse an existing environment)

---

## 2) Cold start vs warm start ❄️✅

### ❄️ Cold start (slow path)

If there is no environment available (first request, scaled concurrency, environment got recycled (deleted), new version, etc.):

Lambda must create a fresh isolated runtime environment. That creation is what adds cold start latency.

---

## 3) What Lambda actually creates on a cold start 🧱🖥️

### Firecracker 🔥🧨

AWS Lambda uses a technology called **Firecracker**.

Firecracker is a lightweight virtualization tech made by AWS that runs **microVMs**.

### MicroVM 🧩

A **microVM** is like a very small virtual machine:

* Strong isolation like a VM (safer than sharing a process)
* Much faster startup than traditional VMs
* Designed for serverless and containers

So on a cold start, Lambda typically does something like:

1. ✅ Pick capacity on an AWS host machine
2. 🔥 Launch a **Firecracker microVM**
3. 🧠 Allocate memory and CPU share based on your configured memory
4. 🧰 Boot a minimal OS environment and runtime support layer

Think of it like AWS quickly spinning up a tiny dedicated execution box for your function. 📦

---

## 4) Execution environment lifecycle inside that microVM 🏗️

Inside the microVM, Lambda sets up an **execution environment**, which includes:

* Your language runtime (Node.js, Python, Java, etc.)
* Lambda runtime interface layer (the “glue” that talks to Lambda service)
* A sandboxed filesystem with:

  * Your code package mounted read-only (conceptually)
  * A writable temp directory **`/tmp`** (limited size)

Important: `/tmp` is the only writable space designed for temporary files during execution. 🗂️

---

## 5) The Init phase (initialization) 🧠⚙️

This is one of the most important parts.

On a cold start, before your handler is called, Lambda runs **initialization** steps:

### A) Start the language runtime 🏁

Example for Node.js:

* The Node process starts
* The runtime loads core libs and starts up

### B) Load your module and run top-level code 📦

Everything that happens outside your handler runs here, like:

* `import ...` / `require(...)`
* Creating DB clients
* Reading config into globals
* Building reusable objects

Example mental model:

```js
// runs during Init (cold start)
const client = new DbClient()

export async function handler(event) {
  // runs each request (Invoke)
}
```

So:

* Init runs **once per environment**
* Handler runs **per request**

### C) Init outcome ✅❌

* If Init succeeds, Lambda proceeds to Invoke
* If Init fails (exception during import or setup), the request fails

Also important:

* Your function timeout applies to the whole request, including Init.
  So extremely slow initialization can cause timeouts. ⏳

---

## 6) The Invoke phase (your request actually runs) ▶️🧾

Now Lambda calls your handler with:

* `event`: contains the HTTP request info (method, rawPath, headers, query params, body)
* `context`: metadata (request id, function name, remaining time, etc.)

Your code runs.

Then you return a response shaped for Function URL, typically:

* `statusCode`
* `headers`
* `body`
* `isBase64Encoded` (when needed)

Lambda sends that back to the caller. 🌐✅

---

## 7) Freeze phase (what happens after response) 🧊💤

After the response is returned:

Lambda often **freezes** the execution environment.

Freeze means:

* The microVM stays around
* Your process state stays in memory
* Global variables remain
* Open connections may remain open (DB connections, keep-alive sockets)
* `/tmp` contents remain

But:

* There is no guarantee how long it stays warm
* It could be reused soon, or recycled (deleted) later

No billing happens while it is frozen and idle. 💸🚫

---


## 8) Next request: Warm start (fast path) ✅⚡

If you hit the Function URL again while the environment is still warm:

* No new microVM
* No Init phase
* Lambda just unfreezes the environment and runs the handler again

This is warm start.

That’s why people reuse clients outside the handler, so warm invocations are faster. ⚡🧠

---

## 9) Concurrency and scaling (why multiple cold starts can happen) 📈❄️❄️

Important rule:

### One environment handles one invocation at a time ✅

If 50 requests hit at once, Lambda needs concurrency.

What Lambda does:

* It creates multiple environments (multiple microVMs) as needed
* Some of those will be cold starts
* Each environment runs one request at a time

So:

* Increased traffic spikes cause cold starts because new microVMs are created. 📈🔥

---

## 10) Termination phase (environment gets destroyed) 🧨🧹

At some point, AWS will terminate the environment:

Reasons:

* It’s been idle long enough
* AWS needs the capacity back
* Internal maintenance or recycling
* Scaling down

When terminated:

* microVM is stopped
* memory is gone
* `/tmp` is wiped
* all global state is lost
* connections are dropped

Important:

* You do not get a reliable “shutdown hook”
* So do not depend on cleanup code on termination. 🚫🧯

---

## 11) The full flow as a timeline ⏱️

### Cold start request ❄️

🌐 Hit Function URL  
➡️ No environment available  
🔥 Firecracker launches microVM  
🧠 Init (runtime start + imports + top-level code)  
▶️ Invoke (handler runs)  
✅ Response returned  
🧊 Freeze (environment kept warm)  

### Warm request ✅

🌐 Hit Function URL  
➡️ Warm environment exists  
▶️ Invoke immediately  
✅ Response returned  
🧊 Freeze again  

---

## Practical mental notes (super important) 📝✅

* ✅ **Globals persist only in warm starts**, never rely on it
* ✅ **Init happens only on cold start**
* ✅ **Cold starts happen again** when Lambda scales or environment is recycled (deleted)
* ✅ **Firecracker microVMs** are the isolation boundary
* ✅ `/tmp` persists only while the same environment lives

https://www.youtube.com/watch?v=E20B8Izr5fI