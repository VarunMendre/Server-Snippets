import express from "express";
import cookieParse from "cookie-parser";

const app = express();
const PORT = 4000;
let amount = 10000;

app.use(cookieParse());

// Middleware to set CSP
app.use((req, res, next) => {
  if (req.headers.accept?.includes("text/html")) {
    res.setHeader("X-Frame-Options", "DENY");
    // res.setHeader(
    //   "Content-Security-Policy",
    //   `default-src 'self'; script-src 'self' 'unsafe-inline';\
    //    frame-ancestors 'none'`
    // );
  }
  next();
});

// Serve dynamic HTML
app.get("/", (req, res) => {
  if (!req.cookies.sid) {
    return res.send('You are not logged <br> <a href="/login">Login</a>');
  }
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
        // <button type="submit">Pay</button>
      </form>
      <script>
        const form = document.querySelector('form');

        form.addEventListener('submit', async(e) => {
            e.preventDefault();

            await fetch("/pay", {
            method: "POST",
            credentials:"include",
            headers: {
                "X-CSRF-Token": "1235"
            }
        })
            window.location.reload();

          })
      </script>
    </body>
    </html>
  `);
});

// Handle payment
app.post("/pay", (req, res) => {
  console.log(req.cookies.sid);
  if (!req.cookies.sid) {
    return res.send("You are not logged.");
  }

  if (!req.headers["x-csrf-token"]) {
    return res.send("CSRF header is missing!");
  }
  amount -= 1000;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.cookie("sid", "54321", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
