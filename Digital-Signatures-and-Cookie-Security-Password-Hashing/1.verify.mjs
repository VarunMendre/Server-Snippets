import crypto from "crypto";
import { readFile } from "fs/promises";

const signedFileData = await readFile("loan-agreement-signed.md", "utf8");
const [fileContent, signature] = signedFileData.split("हस्ताक्षर:- ")
const mySecreteKey = "my-super-secret-key";

// console.log(signature);

const newSignature = crypto
  .createHash("sha256")
  .update(fileContent + "हस्ताक्षर:- ")
  .update(mySecreteKey)
  .digest("base64url");

  
if (newSignature === signature) {
  console.log('Perfect the Letter is valid');
} else {
  console.log('Ohh the letter is invalid');
}

// console.log(signature);