# Important Default Metrics

## 1) `process_cpu_seconds_total`

**Meaning:** Total CPU time consumed by the process (user + system), in seconds.
This is not “CPU percent”. It is “how many seconds of CPU this process has burned”.

**Why it matters:** Tells you if your app is CPU-heavy over time. In Prometheus you use `rate()` to turn it into CPU cores used.

**Get it in Node.js:**

```js
const { user, system } = process.cpuUsage(); // microseconds since process start
const cpuSecondsTotal = (user + system) / 1e6;
```

---

## 2) `process_start_time_seconds`

**Meaning:** Unix timestamp (seconds) when the current process instance started.

**Why it matters:** Restart detection, uptime, correlating counter resets.

**Get it in Node.js:**

```js
const startTimeSeconds = Math.floor(performance.timeOrigin / 1000);
```

---

## 3) `process_resident_memory_bytes`

**Meaning:** RSS (Resident Set Size) tells you how much actual RAM your process is taking up at this moment..

**Why it matters:** This is your real RAM cost. This is what can trigger OOM (Out Of Memory) kills.

**Get it in Node.js:**

```js
const rssBytes = process.memoryUsage().rss;
```

---

## 4) `nodejs_eventloop_lag_max_seconds`

**Meaning:** The maximum observed event loop delay in the recent measurement window.

If something blocks the main thread for 5 seconds, this will jump close to 5.

**Why it matters:** This metric clearly shows that the main thread was blocked for some time, causing the system to freeze temporarily.

**Get it in Node.js:**

```js
import { monitorEventLoopDelay } from "perf_hooks";

const h = monitorEventLoopDelay({ resolution: 10 });
h.enable();

setInterval(() => {
  const lagMaxSeconds = h.max / 1e9; // h.max is in nanoseconds
  console.log({ lagMaxSeconds });
  h.reset(); // optional, makes it interval-based
}, 1000);
```

---

## 5) `nodejs_heap_size_used_bytes`

**Meaning:** V8 heap used by JavaScript objects (arrays, objects, strings, closures).

**Why it matters:** JS memory growth and leaks show up here. “JS heap out of memory” crashes are about this area.

**Get it in Node.js:**

```js
const heapUsedBytes = process.memoryUsage().heapUsed;
```

---

## 6) `nodejs_external_memory_bytes`

**Meaning:** Memory allocated outside the V8 heap but referenced by JS. Mostly Buffers, ArrayBuffers, and native allocations.

**Why it matters:** You can have low heapUsed but huge RSS if external memory grows (Buffer-heavy workloads, native leaks, big file reads).

**Get it in Node.js:**

```js
const externalBytes = process.memoryUsage().external;
```
