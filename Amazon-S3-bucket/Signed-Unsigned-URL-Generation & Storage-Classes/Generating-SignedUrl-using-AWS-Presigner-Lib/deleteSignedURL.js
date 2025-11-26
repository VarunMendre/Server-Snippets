import {DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  profile: "NodeJs-User",
});

const command = new DeleteObjectCommand({
  Bucket: "varunmendre-nodejs-bucket",
  Key: "PostgreSQL-basic-to-advance.pdf",
  ContentType: "application/pdf",
});

const url = await getSignedUrl(s3Client, command);
console.log(url);