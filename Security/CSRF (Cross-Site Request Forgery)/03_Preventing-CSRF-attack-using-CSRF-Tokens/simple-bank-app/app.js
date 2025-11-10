import express from "express";
import cookieParse from "cookie-parser";
import { randomBytes } from "crypto";

const app = express();
const PORT = 4000;
let amount = 10000;

app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));

const csrfTokens = {}

// Middleware to set CSP
app.use((req, res, next) => {
  if (req.headers.accept?.includes("text/html")) {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'self';\
       frame-ancestors 'none'`
    );
  }
  next();
});

// Serve dynamic HTML
app.get("/", (req, res) => {
  const csrfToken = randomBytes(16).toString("hex");
  

  if (!req.cookies.sid) {
    return res.send('You are not logged <br> <a href="/login">Login</a>');
  }

  csrfTokens[req.cookies.sid] = csrfToken;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bank App</title>
      <meta charset="UTF-8" />
    </head>
    <body>
      <h1>Amount: ₹<span id="amount">${amount}</span></h1>
      <form method="POST" action="/pay">
        <input type="hidden" name="csrfToken" value="${csrfToken}">
        <button type="submit">Pay</button>
      </form>
    </body>
    </html>
  `);
});

// Handle payment
app.post("/pay", (req, res) => {
  if (!req.cookies.sid) {
    return res.send("You are not logged.");
  }

    console.log("cookie token:", req.cookies.csrfToken);
    console.log("body token:", req.body.csrfToken);

  if (csrfTokens[req.cookies.sid] !== req.body.csrfToken) {
    return res.send({ error: "Invalid CSRF token" });
  }

  amount -= 1000;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  const sid = randomBytes(16).toString("hex");
  res.cookie("sid", sid, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
