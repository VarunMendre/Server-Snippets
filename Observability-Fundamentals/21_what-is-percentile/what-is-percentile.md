# 📊 What is Percentile?

A **percentile** tells us how a value compares to other values in a group.

It is **not the same as percentage**.

**Percentage →** Your marks out of 100  
**Percentile →** Your performance **relative to others**

A percentile answers this question:

> **What percentage of students scored less than you?**

So percentiles help us understand **relative performance**.

---

# Example with 10 Students

Suppose there are **10 students in a class**, and they get these marks out of 100.

| Student | Marks |
| ------- | ----- |
| A       | 95    |
| B       | 90    |
| C       | 85    |
| D       | 80    |
| E       | 75    |
| F       | 70    |
| G       | 65    |
| H       | 60    |
| I       | 55    |
| J       | 50    |

---

# Step 1: Arrange Marks

First, sort the scores from **lowest to highest**.

| Rank | Marks |
| ---- | ----- |
| 1    | 50    |
| 2    | 55    |
| 3    | 60    |
| 4    | 65    |
| 5    | 70    |
| 6    | 75    |
| 7    | 80    |
| 8    | 85    |
| 9    | 90    |
| 10   | 95    |

This sorted list helps us easily see **how many students scored below someone**.

---

# Step 2: Percentile Formula

To calculate the percentile of a particular student:

```
Percentile =
(Number of students below you / Total students) × 100
```

---

# Example Calculations

## Student with 80 marks

Students below = **6**

Total students = **10**

```
Percentile = (6 / 10) × 100
Percentile = 60
```

✅ **Percentile = 60**

Meaning:

> This student performed **better than 60% of the class**.

---

## Student with 95 marks

Students below = **9**

```
Percentile = (9 / 10) × 100
Percentile = 90
```

✅ **90th percentile**

Meaning:

> This student performed **better than 90% of students**.

---

## Student with 50 marks

Students below = **0**

```
Percentile = (0 / 10) × 100
Percentile = 0
```

✅ **0 percentile**

Meaning:

> No one scored below them.

---

# Another Important Way Percentiles Are Used

So far we answered this question:

> **What percentile is a particular student in?**

But percentiles can also answer another important question:

> **What score corresponds to a given percentile of the class?**

Instead of asking:

```
What percentile is 80 marks?
```

We ask:

```
What marks correspond to the 60th percentile?
```

This tells us about the **overall performance of the class**.

---

# Understanding Percentiles of a Dataset

When we say:

```
The 60th percentile of this class is 75 marks
```

it means:

> **60% of students scored 75 or less**

and

> **40% scored higher than 75**

This way we describe **how marks are distributed in the class**.

---

# How to Calculate the Score at a Given Percentile

To find the score corresponding to a given percentile:

```
Position = (Percentile / 100) × Total number of students
```

The result tells us which **position in the sorted list** corresponds to that percentile.

---

# Example 1: 60th Percentile

```
Position = (60 / 100) × 10
Position = 6
```

The **6th value** in the sorted list is:

```
75
```

So:

**60th percentile = 75 marks**

Meaning:

> 60% of students scored **75 or less**.

---

# Example 2: 90th Percentile

```
Position = (90 / 100) × 10
Position = 9
```

The **9th value** in the sorted list is:

```
90
```

So:

**90th percentile = 90 marks**

Meaning:

> 90% of students scored **90 or less**.

---

# Example 3: 50th Percentile (Median)

```
Position = (50 / 100) × 10
Position = 5
```

The **5th value** is:

```
70
```

So:

**50th percentile = 70 marks**

The **50th percentile is also called the median**.

Meaning:

> Half of the students scored **below 70**, and half scored **above 70**.

---

# Why Percentiles Help Us Understand Class Performance

Percentiles describe **how the entire class performed**.

For example:

### Case 1

| Percentile | Marks |
| ---------- | ----- |
| 0th        | 50    |
| 50th       | 70    |
| 90th       | 90    |

This means marks are **spread widely**.

---

### Case 2

| Percentile | Marks |
| ---------- | ----- |
| 0th        | 70    |
| 50th       | 85    |
| 90th       | 95    |

This means **even the lowest student scored above 70**, so the entire class performed very well.

---

# Summary

Percentiles answer **two different types of questions**.

### 1️⃣ Percentile of a student

Example:

```
80 marks → 60th percentile
```

Meaning:

> The student performed **better than 60% of the class**.

---

### 2️⃣ Score at a given percentile

Example:

```
60th percentile = 75 marks
```

Meaning:

> **60% of students scored 75 or less**.