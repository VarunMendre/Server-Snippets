import express from "express";
import fs from "fs";
import { resolve } from "path/win32";
import promClient from "prom-client";

const app = express();
const PORT = 4000;

const httpsRequestTotal = new promClient.Counter({
  name: "http_request_total",
  help: "http request-response details",
  labelNames: ["method", "path", "status"],
});

const gaugeMetrics = new promClient.Gauge({
  name: "http_request_in_flight",
  help: "Total requests being processed",
  labelNames: ["method", "path"],
});

app.use((req, res, next) => {
  if (req.path === "/metrics") return next();
  const { path, method } = req;

  gaugeMetrics.labels(method, path).inc();

  res.on("finish", () => {
    gaugeMetrics.labels(method, path).dec();
    httpsRequestTotal.labels(method, path, res.statusCode).inc();
  });

  req.on("aborted", () => {
    gaugeMetrics.labels(method, path).dec();
  });

  req.on("close", () => {
    gaugeMetrics.labels(method, path).dec();
  });

  req.on("error", () => {
    gaugeMetrics.labels(method, path).dec();
  });

  req.on("end", () => {
    gaugeMetrics.labels(method, path).dec();
  });

  next();
});

promClient.collectDefaultMetrics(); // collects the default metrics and stores in an obj called register

app.get("/metrics", async (req, res) => {
  const metrics = await promClient.register.metrics(); // accessing metrics from the register object and storing in a variable called metrics
  res.set("Content-Type", promClient.register.contentType);
  res.end(metrics);
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the demo Express app 👋",
  });
});

app.get("/unstable", async (req, res) => {
  const delays = [500, 1000, 2000];
  const delay = delays[Math.floor(Math.random() * delays.length)];

  const shouldFail = Math.random() < 0.4;

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (shouldFail) {
    const errorTypes = [
      { status: 500, message: "Internal Server Error" },
      { status: 503, message: "Service Unavailable" },
      { status: 504, message: "Gateway Timeout" },
      { status: 400, message: "Bad Request" },
    ];

    const error = errorTypes[Math.floor(Math.random() * errorTypes.length)];

    return res.status(error.status).json({
      error: error.message,
      delay,
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    message: "Unstable endpoint succeeded 🚀",
    delay,
    timestamp: new Date().toISOString(),
  });
});

app.get("/user-cpu", (req, res) => {
  const start = performance.now();
  const cpuUseTime = process.cpuUsage(); // 5 seconds
  while (performance.now() - start < 5000) {
    Math.sqrt(Math.random());
  }

  res.json({ ok: true, cpuUseTime });
});

app.get("/system-cpu", (req, res) => {
  for (let i = 0; i < 10; i++) {
    // use this command to generate the bigfile
    // dd if=/dev/urandom of=bigfile.dat bs=1M count=500
    fs.readFileSync("./bigfile.dat");
  }

  res.json({
    message: "Heavy sync file IO done",
  });
});

app.get("/cpu-usage", (req, res) => {
  const { user, system } = process.cpuUsage();

  // for (let i = 0; i < 10; i++) {
  //   fs.readFileSync("./bigfile.dat");
  // }

  // / cpu percent : > 13467 - 11015
  // 2452
  // > 2452 / 50
  // 49.04
  // > 49.04 / 8
  // 6.13

  res.json({
    user: user / 1000, // Convert microseconds to milliseconds
    system: system / 1000, // Convert microseconds to milliseconds
    total: (user + system) / 1000, // Total CPU time in milliseconds
    upTime: performance.now(), // Uptime in milliseconds
    cpuUsagePercentOfLast30Seconds: `${((user + system) / 30000).toFixed(2) / 8}%`, // Assuming the CPU usage is measured over the last 30 seconds
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
