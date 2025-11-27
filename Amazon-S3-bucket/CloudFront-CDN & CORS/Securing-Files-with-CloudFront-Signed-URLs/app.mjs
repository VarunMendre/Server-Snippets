import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { readFile } from "fs/promises";

const url = `https://d3jhrualg135qy.cloudfront.net/image/image.webp`;
const privateKey = await readFile("./private_key.pem", "utf8");
const keyPairId = "KFH2L97DOVGW7";
const dateLessThan = "2025-11-28"; // any Date constructor compatible

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan,
  privateKey,
});

console.log(signedUrl);

// openssl genrsa -out private_key.pem 2048
// openssl rsa -in private_key.pem -pubout -out public_key.pem
