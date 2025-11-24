## 🔐 What Are IAM Policies?

An **IAM Policy** is a **JSON document** that defines **permissions** — it tells AWS **who can do what and where**.

> ✅ It controls **access** to AWS services and resources.

IAM policies can be attached to:

* Users
* Groups
* Roles

---

## 🧱 IAM Policy JSON Structure

Here’s a breakdown of the standard structure:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow" | "Deny",
      "Action": "service:operation",
      "Resource": "arn:aws:service:region:account-id:resource"
    }
  ]
}
```

### 🔍 Explanation of Each Field:

| Field       | Purpose                                                                        |
| ----------- | ------------------------------------------------------------------------------ |
| `Version`   | Policy language version (always use `"2012-10-17"` for latest)                 |
| `Statement` | One or more rules (each one defines a permission)                              |
| `Effect`    | Either `"Allow"` or `"Deny"` access                                            |
| `Action`    | What actions are allowed or denied (like `s3:PutObject`, `ec2:StartInstances`) |
| `Resource`  | What AWS resources the action applies to (`arn:aws:s3:::my-bucket`)            |

---

## 🧠 Types of IAM Policies

| Type                 | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| **AWS Managed**      | Predefined by AWS (e.g., `AmazonS3FullAccess`)             |
| **Customer Managed** | Policies you create and control                            |
| **Inline Policies**  | Attached directly to a user, group, or role (not reusable) |

---

## ✅ Summary

* IAM policies are **JSON-based permission sets**
* Each **statement** defines **who can do what on which resource**
* You can create **custom policies** using **Visual Editor** or **JSON**
* Attach them to **users, groups, or roles** to enforce access control