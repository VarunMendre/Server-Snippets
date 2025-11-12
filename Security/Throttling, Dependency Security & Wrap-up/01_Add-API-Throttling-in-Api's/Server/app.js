import express from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 4000;

const limiter = rateLimit({
  windowMs: 20000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, wait a while !!",
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(limiter, throttling(2000));

function throttling(waitTime = 2000) {
  const throttleData = {};
  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip;

    const { previousDelay, lastRequest } = throttleData[ip] || {
      previousDelay: 0,
      lastRequest: now - waitTime,
    };
    const timePassed = now - lastRequest;
    const delay = Math.max(0, waitTime + previousDelay - timePassed);

    throttleData[ip] = {
      previousDelay: delay,
      lastRequest: now,
    };

    setTimeout(next, delay);
  };
}
app.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

app.get("/register", (req, res) => {
  bcrypt.hashSync("123456", 14);
  return res.json({ message: "Registered Successfully" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Visit http://localhost:${PORT}`);
});
