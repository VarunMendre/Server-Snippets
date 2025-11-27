import {PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});

const command = new PutObjectCommand({
  Bucket: "varun-personal-stuff",
  Key: "1.png",
  ContentType: "image/png",
});

const url = await getSignedUrl(s3Client, command, {
  expiresIn: 3600,
  signableHeaders: new Set(["content-type"]),
});
console.log(url);