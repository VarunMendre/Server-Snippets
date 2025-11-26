# AWS S3 Storage Classes – Complete In‑Depth Guide

This document provides a **deep, highly detailed** understanding of **all S3 storage classes**, their internal behaviour, durability, availability, pricing behaviour, and ideal use cases.

---

# 📌 **1. S3 Standard (General Purpose)**

### ✔ Overview

S3 Standard is the **default** and **most commonly used** storage class. It is optimised for **frequent access** and provides **low-latency** and **high-throughput** performance.

### ✔ Durability & Availability

- **Durability:** 99.999999999% (11 nines)
- **Availability:** 99.99% annually
- **AZ Redundancy:** Multi‑AZ storage (automatic replication across at least 3 AZs)

### ✔ Internal Behaviour

- Uses **multiple redundant copies** across multiple Availability Zones.
- Optimised for real‑time access applications.
- No retrieval fees.

### ✔ Best Use Cases

- Websites, mobile apps
- Frequently accessed data
- Data analytics
- Application content storage (images, videos)
- Backup systems requiring instant access

---

# 📌 **2. S3 Intelligent‑Tiering**

### ✔ Overview

Automatically moves objects between **frequent** and **infrequent** access tiers based on usage.

### ✔ Durability & Availability

- **Durability:** 11 nines
- **Availability:** 99.9% (varies slightly per tier)

### ✔ Internal Behaviour

- AI-driven tiering (no performance impact).
- No retrieval fees.
- Monitoring fee per object.
- Price reduction is achieved automatically if your data becomes less frequently accessed.

### ✔ Tiers in Intelligent‑Tiering

- **Frequent Access Tier** – for active items
- **Infrequent Access Tier** – for items rarely accessed
- **Archive Instant Access Tier** – cheaper storage for rarely accessed data
- **Archive Access Tier** – similar to Glacier
- **Deep Archive Access Tier** – similar to Glacier Deep Archive

### ✔ Best Use Cases

- Unknown access patterns
- Data lakes
- User uploads where some files become cold.
- Logs, backups, ML datasets

---

# 📌 **3. S3 Standard‑IA (Infrequent Access)**

### ✔ Overview

Designed for data **accessed less frequently**, but needing **rapid access** when required.

### ✔ Durability & Availability

- **Durability:** 11 nines
- **Availability:** 99.9%
- Multi‑AZ replication

### ✔ Internal Behaviour

- Cheaper storage cost than Standard.
- **Retrieval fee applies**, so best for rare access.
- Minimum storage duration: **30 days**.

### ✔ Best Use Cases

- Long-term backups
- Disaster recovery data
- Infrequently accessed logs
- Data where retrieval is predictable and rare

---

# 📌 **4. S3 One Zone‑IA**

### ✔ Overview

Same as Standard‑IA but stored **in a single Availability Zone**.

### ✔ Durability & Availability

- **Durability:** 11 nines (within a single AZ)
- **Availability:** 99.5%
- **NOT Multi‑AZ**

### ✔ Internal Behaviour

- Cheaper than Standard‑IA.
- Suitable when data can be recreated or isn’t mission-critical.

### ✔ Best Use Cases

- Secondary backups where rapid restore isn’t required
- Data you can recompute
- Staging areas
- Temporary data

---

# 📌 **5. S3 Glacier Instant Retrieval**

### ✔ Overview

Archived storage class with **millisecond retrieval**, similar to Standard‑IA but cheaper.

### ✔ Durability & Availability

- **Durability:** 11 nines
- **Availability:** 99.9%

### ✔ Internal BehaviourBehaviour

- Retrieval is instant (milliseconds).
- Cheaper than IA but has retrieval fees.
- Minimum storage: 90 days

### ✔ Best Use Cases

- Medical images
- User data archives
- Compliance archives
- Old files that need quick access if required

---

# 📌 **6. S3 Glacier Flexible Retrieval (Formerly Glacier)**

### ✔ Overview

Provides **cheaper archive storage** with minutes-to-hours retrieval.

### ✔ Durability & Availability

- **Durability:** 11 nines

### ✔ Internal Behavior

Retrieval Options:

- **Expedited:** 1–5 minutes
- **Standard:** 3–5 hours
- **Bulk:** 5–12 hours

Minimum storage duration: **90 days**.

### ✔ Best Use Cases

- Archives rarely needed
- Research data
- Regulatory compliance
- Old backups

---

# 📌 **7. S3 Glacier Deep Archive**

### ✔ Overview

The **cheapest storage class** in S3. Designed for **long-term cold storage**.

### ✔ Durability & Availability

- **Durability:** 11 nines

### ✔ Internal Behaviour

Retrieval Options:

- **Standard:** 12 hours
- **Bulk:** Up to 48 hours

Minimum storage duration: **180 days**.

### ✔ Best Use Cases

- Long-term archival (7–10+ years)
- Financial records
- Compliance logs
- Old backups with no near-term access

---

# 📌 **8. S3 Reduced Redundancy Storage (RRS) – Legacy**

⚠ Deprecated → Not recommended.

### ✔ Overview

- Used to be cheaper but with **lower durability** (99.99%).
- Rarely used now; Intelligent‑Tiering or One Zone‑IA replaces it.

### ✔ Best Use Cases

- Only for legacy apps.

---

# 📌 **Comparison Table (Simplified)**

| Storage Class        | Availability | Durability | Cost     | Retrieval Time | Typical Use Case                       |   |   |   |   |   |
| -------------------- | ------------ | ---------- | -------- | -------------- | -------------------------------------- | - | - | - | - | - |
| Standard             | 99.99%       | 11 nines   | High     | Instant        | Frequent access                        |   |   |   |   |   |
| Intelligent‑Tiering  | 99.9%        | 11 nines   | Adaptive | Instant        | Unknown patterns                       |   |   |   |   |   |
| Standard‑IA          | 99.9%        | 11 nines   | Medium   | Instant        | Rare access                            |   |   |   |   |   |
| One Zone‑IA          | 99.5%        | 11 nines   | Low      | Instant        | Re-creatable data                      |   |   |   |   |   |
| Glacier Instant      | 99.9%        | 11 nines   | Low      | Milliseconds   | Fast archive retrieval                 |   |   |   |   |   |
| Glacier Flexible     | N/A          | 11 nines   | Cheaper  | Minutes–Hours  | Deep archive with occasional retrieval |   |   |   |   |   |
| Glacier Deep Archive | N/A          | 11 nines   | Lowest   | 12–48 hours    | Long-term archival                     |   |   |   |   |   |

---

# 📌 **How to Select the Right Storage Class?**

### Ask yourself:

1. **How often will the data be accessed?**

   - Frequently → Standard
   - Unpredictable → Intelligent‑Tiering
   - Rarely → IA / Instant Retrieval

2. **How fast do I need it back?**

   - Milliseconds → Standard / IA / Instant Retrieval
   - Minutes → Glacier Flexible
   - Hours → Deep Archive

3. **Is Multi‑AZ redundancy required?**

   - Yes → All except One Zone‑IA
   - No → One Zone‑IA

4. **Do I know the access pattern?**

   - No → Intelligent‑Tiering

---

# 📌 **Real-World Examples**

### 🔹 E-commerce Website

Use **Standard** for product images.

### 🔹 Backups

Use **Standard‑IA** or **One Zone‑IA** depending on redundancy needs.

### 🔹 Log Archival

Use **Glacier Flexible**.

### 🔹 Legal & Compliance

Use **Deep Archive**.

### 🔹 Mobile App User Uploads

Use **Intelligent‑Tiering**.

---

# 📌 Final Summary

S3 Storage Classes exist to balance:

- Performance
- Availability
- Cost
- Redundancy
- Retrieval time

Choosing the correct class helps save **massive cost** and ensures the right performance for your application.



