// express-referrer.js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.send(`
    <html>
      <body>
        <h2>Referrer-Policy demo</h2>
        <a href="https://example.com/test?secret=123">Go to example.com (click and check Referer)</a>
        <script>
          // If you click link, browser sends Referer depending on header above.
        </script>
      </body>
    </html>
  `);
});

app.listen(4002, () => console.log("listening :4002"));

