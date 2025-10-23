import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;
const TOKEN_FILE = path.join(__dirname, "latest-token.txt");

function send(res, status, body, headers = {}) {
  const h = { "content-type": "application/json; charset=utf-8", ...headers };
  res.writeHead(status, h);
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/token") {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        const contentType = req.headers["content-type"] || "";
        let token = null;
        if (contentType.includes("application/json")) {
          const json = JSON.parse(data || "{}");
          token = json.token;
        } else if (contentType.includes("text/plain")) {
          token = data.toString().trim();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams(data.toString());
          token = params.get("token");
        }
        if (!token) {
          return send(res, 400, { error: "Missing token in request body" });
        }
        fs.writeFileSync(TOKEN_FILE, token, { encoding: "utf8" });
        return send(res, 200, { ok: true });
      } catch (e) {
        return send(res, 400, { error: e.message || "Invalid body" });
      }
    });
    return;
  }

  if (req.method === "GET" && req.url === "/token") {
    try {
      const token = fs.readFileSync(TOKEN_FILE, "utf8");
      return send(res, 200, { token });
    } catch {
      return send(res, 404, { error: "No token stored yet" });
    }
  }

  if (req.method === "DELETE" && req.url === "/token") {
    try {
      fs.unlinkSync(TOKEN_FILE);
      return send(res, 204, "", { "content-type": "text/plain" });
    } catch {
      return send(res, 204, "", { "content-type": "text/plain" });
    }
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Dev token server listening on http://localhost:${PORT}`);
  console.log("POST /token with { token } to update. GET /token to read.");
});


