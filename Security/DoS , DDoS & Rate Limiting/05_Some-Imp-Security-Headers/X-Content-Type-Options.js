// express-x-content-type.js
import express from "express";
const app = express();

app.get("/bad-script.js", (req, res) => {
  // Intentionally wrong content-type to demonstrate blocking
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.send(
    "console.log('You should NOT see this execute if browser respects nosniff');"
  );
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>X-Content-Type-Options demo</h2>
        <script src="/bad-script.js"></script>
        <p>Open console to see whether the script ran.</p>
      </body>
    </html>
  `);
});

app.listen(4000, () => console.log("listening :4000"));
