import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { verifyGoogleIdToken } from "./googleOAuthLibrary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientId = process.env.GOOGLE_CLIENT_ID || "341508182755-lcdl3f8mjnntpk1f9amuoa4i36vl6st5.apps.googleusercontent.com";
const TOKEN_FILE = path.join(__dirname, "latest-token.txt");

function readToken() {
  if (process.env.ID_TOKEN) return process.env.ID_TOKEN;
  try {
    return fs.readFileSync(TOKEN_FILE, "utf8").trim();
  } catch {
    return null;
  }
}

(async () => {
  try {
    const token = readToken();
    if (!token) {
      console.error("No token found. Start dev-token-server and POST a token, or set ID_TOKEN env.");
      process.exit(1);
    }
    const payload = await verifyGoogleIdToken(token, { clientId });
    console.log(payload.aud === clientId);
    console.log(payload);
  } catch (err) {
    console.error("Verification failed:", err);
  }
})();