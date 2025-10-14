import crypto from "crypto";
import { readFile } from "fs/promises";

const mySecreteKey = "my-secret-key";
const fileData = await readFile("mac.md");

const hmac = crypto
  .createHmac("SHA-256", mySecreteKey)
  .update(fileData)
  .digest("hex");

console.log(hmac);
