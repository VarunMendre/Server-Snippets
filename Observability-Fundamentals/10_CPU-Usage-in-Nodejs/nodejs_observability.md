# Node.js Observability Methods

## 1. `performance.now()`

Gives you a **high-resolution timestamp** in milliseconds (with sub-millisecond precision), used to measure elapsed time between two points in your code.

```js
const { performance } = require('perf_hooks');

const start = performance.now();

// Simulate some work
for (let i = 0; i < 1e6; i++) {}

const end = performance.now();
console.log(`Elapsed: ${(end - start).toFixed(3)} ms`);
// Elapsed: 2.847 ms
```

**Key traits:**
- Returns time relative to an arbitrary origin (not wall-clock time) — so it's only meaningful as a *difference*
- Far more precise than `Date.now()` which only gives integer milliseconds
- Ideal for benchmarking functions, measuring request latency, or profiling code blocks

---

## 2. `process.cpuUsage()`

Returns the **CPU time consumed** by the Node.js process, split into `user` and `system` time — both in **microseconds**.

```js
const start = process.cpuUsage();

// Simulate CPU-intensive work
let sum = 0;
for (let i = 0; i < 1e7; i++) sum += i;

const delta = process.cpuUsage(start); // pass start to get the diff directly
console.log(delta);
// { user: 38000, system: 1200 }  ← microseconds
```

| Field | Meaning |
|---|---|
| `user` | CPU time spent executing your JS code |
| `system` | CPU time spent in OS-level calls (file I/O, networking, etc.) |

**Key traits:**
- Passing the previous snapshot as an argument gives you the **delta** automatically
- Helps detect CPU-heavy operations, runaway loops, or unexpectedly high system calls
- Note: CPU time can *exceed* wall-clock time on multi-core systems (parallel threads)

---

## 3. `process.uptime()`

Returns **how long the Node.js process has been running**, in seconds (as a float).

```js
console.log(`Process running for: ${process.uptime().toFixed(2)}s`);
// Process running for: 4.32s

// Practical use — log uptime in a health-check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    uptimeHuman: formatUptime(process.uptime())
  });
});
```

**Key traits:**
- Unlike `Date.now()`, it's **not affected by system clock changes** (NTP updates, DST, manual changes)
- Essential for **health check endpoints** — lets you detect unexpected restarts
- Commonly used in monitoring dashboards alongside memory (`process.memoryUsage()`) and CPU stats

---

## Putting It All Together

These three are often combined for a complete observability snapshot:

```js
const { performance } = require('perf_hooks');

function observedOperation() {
  const wallStart = performance.now();
  const cpuStart  = process.cpuUsage();

  // --- your operation ---
  let x = 0;
  for (let i = 0; i < 1e7; i++) x += i;
  // ----------------------

  const wallMs = (performance.now() - wallStart).toFixed(2);
  const cpu    = process.cpuUsage(cpuStart);

  console.log({
    wall_time_ms:    wallMs,
    cpu_user_ms:     (cpu.user   / 1000).toFixed(2),
    cpu_system_ms:   (cpu.system / 1000).toFixed(2),
    process_uptime_s: process.uptime().toFixed(2)
  });
}

observedOperation();
```

---

## Quick Comparison

| Method | Unit | Measures | Best For |
|---|---|---|---|
| `performance.now()` | milliseconds | Wall-clock elapsed time | Latency, benchmarks |
| `process.cpuUsage()` | microseconds | Actual CPU consumed | CPU profiling, detecting hot loops |
| `process.uptime()` | seconds | Process lifetime | Health checks, restart detection |
