// express-coop.js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  // make top-level browsing context isolated
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.send(`
    <html>
      <body>
        <h2>COOP demo</h2>
        <button id="open">Open cross-origin popup</button>
        <script>
          document.getElementById('open').onclick = () => {
            const w = window.open('https://example.com', '_blank');
            // With COOP: same-origin, the opened cross-origin page will be in a separate
            // browsing context group; you cannot access w.opener if cross-origin.
            try {
              console.log('opener is', w.opener); // likely null or inaccessible cross-origin
            } catch (e) {
              console.error('Cannot access opener (as intended):', e);
            }
          };
        </script>
      </body>
    </html>
  `);
});

app.listen(4005, () => console.log("listening :4005"));
