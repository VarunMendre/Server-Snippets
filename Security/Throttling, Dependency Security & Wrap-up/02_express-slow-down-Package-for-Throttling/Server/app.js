import express from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { slowDown } from "express-slow-down";

const app = express();
const PORT = 4000;

const limiter = rateLimit({
  windowMs: 20000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, wait a while !!",
});

const throttle = slowDown({
  windowMs: 5000,
  delayMs: (hits) => hits * 1000, // Add 100 ms of delay to every request after the 5th one.

  /**
   * So:
   *
   * - requests 1-5 are not delayed.
   * - request 6 is delayed by 600ms
   * - request 7 is delayed by 700ms
   * - request 8 is delayed by 800ms
   *
   * and so on. After 15 minutes, the delay is reset to 0.
   */
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(limiter, throttle);

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
