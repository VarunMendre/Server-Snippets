import crypto from "crypto";
import { createWriteStream } from "fs";
import { readFile } from "fs/promises";

const fileData = await readFile("loan-agreement.md");
const mySecreteKey = "my-super-secret-key";

const signature = crypto
  .createHash("sha256")
  .update(fileData)
  .update(mySecreteKey)
  .digest("base64url");

const writeStream = createWriteStream("loan-agreement-verified.md")
writeStream.write(fileData);
writeStream.end(signature);

console.log(signature);