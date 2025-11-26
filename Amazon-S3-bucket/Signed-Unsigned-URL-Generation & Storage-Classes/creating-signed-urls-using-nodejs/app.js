import { getSignedS3Url } from "./urlSigner.js";

const signedUrl = getSignedS3Url({
  bucketName: "varunmendre-nodejs-bucket",
  objectKey: "app.js",
  method: "GET",
});

console.log(signedUrl);
