// express-permissions.js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=()"
  );
  res.send(`
    <html>
      <body>
        <h2>Permissions-Policy demo</h2>
        <button id="geo">Request geolocation</button>
        <script>
          document.getElementById('geo').onclick = () => {
            navigator.geolocation.getCurrentPosition(
              pos => console.log('got pos', pos),
              err => console.error('geolocation error', err)
            );
          };
        </script>
      </body>
    </html>
  `);
});

app.listen(4003, () => console.log("listening :4003"));
