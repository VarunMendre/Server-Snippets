# AWS S3 Static Website Hosting Guide

This guide will walk you through uploading your files to AWS S3 and configuring it to serve your static website publicly.

## Prerequisites
- An AWS Account.
- The files you just created (`index.html`, `style.css`, `script.js`).

## Step 1: Create an S3 Bucket
1.  Log in to the **AWS Management Console**.
2.  Navigate to the **S3** service.
3.  Click **Create bucket**.
4.  **Bucket name**: Enter a globally unique name (e.g., `my-awesome-static-site-2024`).
5.  **Region**: Choose a region close to your target audience.
6.  **Object Ownership**: Keep "ACLs disabled" (recommended).
7.  **Block Public Access settings for this bucket**:
    - **Uncheck** "Block all public access".
    - Check the warning box that appears, acknowledging that the current settings might result in this bucket and the objects within becoming public.
8.  Click **Create bucket** at the bottom.

## Step 2: Upload Files
1.  Click on the name of your newly created bucket.
2.  Click **Upload**.
3.  Click **Add files** and select `index.html`, `style.css`, and `script.js` from your local folder.
4.  Click **Upload** at the bottom.

## Step 3: Enable Static Website Hosting
1.  Go to the **Properties** tab of your bucket.
2.  Scroll down to the very bottom to find **Static website hosting**.
3.  Click **Edit**.
4.  Select **Enable**.
5.  **Hosting type**: "Host a static website".
6.  **Index document**: Enter `index.html`.
7.  **Error document**: (Optional) You can enter `index.html` here as well for now.
8.  Click **Save changes**.

## Step 4: Add Bucket Policy (Make it Public)
Even though you unblocked public access, you still need to explicitly allow public read access to the objects.

1.  Go to the **Permissions** tab.
2.  Scroll down to **Bucket policy**.
3.  Click **Edit**.
4.  Paste the following JSON policy. **IMPORTANT**: Replace `YOUR-BUCKET-NAME` with your actual bucket name.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```
5.  Click **Save changes**.

## Step 5: Visit Your Website
1.  Go back to the **Properties** tab.
2.  Scroll down to **Static website hosting**.
3.  You will see your **Bucket website endpoint** URL (e.g., `http://my-awesome-static-site-2024.s3-website-us-east-1.amazonaws.com`).
4.  Click the link to see your live website!

---
**Note**: S3 website endpoints do not support HTTPS by default. For HTTPS, you would need to set up AWS CloudFront, but that is an advanced step.
