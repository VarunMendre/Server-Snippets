// express-hsts.js
import express from "express";
const app = express();

// Example endpoint returning HSTS header — in practice, set this only on HTTPS server
app.get("/", (req, res) => {
  // IMPORTANT: should only be used on HTTPS responses
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  res.send("<h1>HSTS header sent (check response headers)</h1>");
});

app.listen(4001, () =>
  console.log("listening :4001 (remember: test HSTS over HTTPS)")
);
