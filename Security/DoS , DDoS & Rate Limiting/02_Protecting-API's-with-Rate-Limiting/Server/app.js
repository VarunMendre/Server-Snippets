import express from "express";
import bcrypt from "bcrypt";

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

const rateLimitStore = {};

function rateLimiter({ windowSize, numberOfRequest }) {
  return function (req, res, next) {
    const currentTime = Date.now();

    if (!rateLimitStore[req.ip]) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
      return next();
    }
    if (currentTime - rateLimitStore[req.ip].startTime > windowSize) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
    } else {
      rateLimitStore[req.ip].count++;
      if (rateLimitStore[req.ip].count > numberOfRequest) {
        return res
          .status(429)
          .json({ error: "Too many request, please slow down your req" });
      }
    }
    console.log(rateLimitStore);
    next();
  };
}
app.get(
  "/register",
  rateLimiter({ windowSize: 60000, numberOfRequest: 10 }),
  (req, res) => {
    bcrypt.hashSync("123456", 14);
    return res.json({ message: "Registered Successfully" });
  }
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Visit http://localhost:${PORT}`);
});
