import express from "express";
import cluster from "cluster";
import os from "os";

// code to swap the cluster module with a custom implementation
// calculated logical cores

/*
const totalCores = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < totalCores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} is died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  app.listen(3005, () => {
    console.log(`Worker ${process.pid} is listening on port 3005`);
  });
}
*/

const totalWorkers = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary process: ${process.pid}`);
  console.log(`Available logical CPUs: ${totalWorkers}`);
  console.log(`Starting ${totalWorkers} workers...\n`);

  for (let i = 0; i < totalWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting replacement...`);

    cluster.fork();
  });
} else {
  const app = express();

  let requestCount = 0;

  app.get("/benchmark", (req, res) => {
    let result = 0;

    for (let i = 0; i < 1_000_000; i++) {
      result += Math.sqrt(i);
    }

    res.status(200).json({
      success: true,
      workerPid: process.pid,
      result,
    });
  });
    
  app.get("/", (req, res) => {
    requestCount++;

    // Small CPU-bound workload.
    // This helps us observe multiple CPU cores being utilized.
    let result = 0;

    for (let i = 0; i < 5_000_000; i++) {
      result += Math.sqrt(i);
    }

    res.status(200).json({
      message: "Request processed successfully",
      workerPid: process.pid,
      requestCount,
      result,
    });
  });

  app.listen(3005, () => {
    console.log(`Worker ${process.pid} listening on http://localhost:3005`);
  });
}
