import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});

const command = new GetObjectCommand({
    Bucket: "varunmendre-nodejs-bucket",
    Key: "app.js"
});

const url = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
});
console.log(url);