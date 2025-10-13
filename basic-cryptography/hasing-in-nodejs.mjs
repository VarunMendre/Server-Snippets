import crypto from "node:crypto";
import { readFileSync } from "node:fs";

const fileData = readFileSync(
  "E:\\VARUN\\NodeJs_crash_course\\NodeJs\\Section_14_Mastering-Authentication-&-Authorization\\VSCodeUserSetup-x64-1.105.0.exe"
);

const hash = crypto.createHash("SHA-256")
    .update("Hello")
    .digest("hex");
console.log(hash);


console.log(Buffer.from("hy5OUM6ZkNiwQTMMR8nd0Rvsa1A66ThqmdqFhOm7EsQ=", "base64url").toString('hex'));