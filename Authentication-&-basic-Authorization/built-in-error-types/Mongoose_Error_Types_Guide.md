# 🧩 Mongoose Built-in Error Types

This document covers all **13 common built-in error types in Mongoose**, explaining **when each occurs** and **how to resolve it**.

---

## 1️⃣ ValidationError
**When it occurs:**  
When validation rules defined in the schema fail (e.g., `required`, `minlength`, `enum`, `min`, `max`, or custom validator).  

**Example Cause:**  
```js
await User.create({ name: "Vi", age: 10 });
```

**How to Resolve:**  
- Ensure input data meets schema validation rules.  
- Add proper validation before saving.  
- Use `.validateSync()` to catch validation errors early.

---

## 2️⃣ CastError
**When it occurs:**  
When a value cannot be cast to the required schema type (e.g., invalid ObjectId or wrong type).  

**Example Cause:**  
```js
await User.findById("12345");
```

**How to Resolve:**  
- Validate ObjectId format before querying.  
- Use `mongoose.isValidObjectId(id)` to check IDs.

---

## 3️⃣ DocumentNotFoundError
**When it occurs:**  
When using `.orFail()` and no matching document is found.  

**Example Cause:**  
```js
await User.findOne({ name: "NonExisting" }).orFail();
```

**How to Resolve:**  
- Ensure the document exists before `.orFail()`.  
- Use try–catch to handle missing documents gracefully.

---

## 4️⃣ MissingSchemaError
**When it occurs:**  
When trying to access a model that has not been defined yet.  

**Example Cause:**  
```js
mongoose.model("Ghost"); // not defined previously
```

**How to Resolve:**  
- Define the model using `mongoose.model("Name", schema)` before using it.

---

## 5️⃣ StrictModeError
**When it occurs:**  
When you try to save a field not defined in the schema and `strict: "throw"` is enabled.  

**Example Cause:**  
```js
const user = new User({ name: "Varun", extraField: "Not allowed" });
await user.save();
```

**How to Resolve:**  
- Remove undefined fields.  
- Disable strict mode with `{ strict: false }` if needed.

---

## 6️⃣ OverwriteModelError
**When it occurs:**  
When redefining an existing model with the same name.  

**Example Cause:**  
```js
mongoose.model("User", userSchema);
mongoose.model("User", anotherSchema); // same name again
```

**How to Resolve:**  
- Check if the model already exists using:  
  ```js
  mongoose.models.User || mongoose.model("User", userSchema);
  ```

---

## 7️⃣ MongooseServerSelectionError
**When it occurs:**  
When Mongoose cannot connect to the MongoDB server (e.g., wrong URI or MongoDB not running).  

**Example Cause:**  
```js
mongoose.connect("mongodb://127.0.0.1:9999/fakeDB");
```

**How to Resolve:**  
- Ensure MongoDB service is running.  
- Verify the connection URI and port.  
- Handle connection errors in `.catch()`.

---

## 8️⃣ VersionError
**When it occurs:**  
When using optimistic concurrency, if a document is modified by another process before saving.  

**Example Cause:**  
```js
doc1.save();
doc2.save(); // old version
```

**How to Resolve:**  
- Use `__v` field carefully.  
- Fetch fresh document before saving.

---

## 9️⃣ ParallelSaveError
**When it occurs:**  
When two `.save()` calls are made on the same document simultaneously.  

**Example Cause:**  
```js
const save1 = user.save();
const save2 = user.save();
await Promise.all([save1, save2]);
```

**How to Resolve:**  
- Await each save before calling another.  
- Avoid concurrent saves on the same document.

---

## 🔟 DivergentArrayError
**When it occurs:**  
When conflicting array modifications happen before saving.  

**Example Cause:**  
```js
user.items.pull("A");
user.items.push("B");
await user.save();
```

**How to Resolve:**  
- Avoid performing multiple array ops before a save.  
- Modify arrays in a consistent manner.

---

## 1️⃣1️⃣ ValidatorError
**When it occurs:**  
When a custom validator function returns false or throws an error.  

**Example Cause:**  
```js
validate: v => v.includes("@") // email missing @
```

**How to Resolve:**  
- Adjust validator logic or input data.  
- Provide meaningful messages for better debugging.

---

## 1️⃣2️⃣ StrictPopulateError
**When it occurs:**  
When `strictPopulate: true` is enabled and an invalid path is populated.  

**Example Cause:**  
```js
Post.find().populate({ path: "invalidField", strictPopulate: true });
```

**How to Resolve:**  
- Check the populated path is valid and defined in the schema.

---

## 1️⃣3️⃣ Manual MongooseError
**When it occurs:**  
When manually thrown for custom logic or simulation.  

**Example Cause:**  
```js
throw new mongoose.Error.MongooseError("Manual error");
```

**How to Resolve:**  
- Only throw it intentionally for custom errors or testing.

---

✅ **Summary Table**

| Error Name | When it Occurs | Resolution |
|-------------|----------------|-------------|
| ValidationError | Invalid schema validation | Fix validation or input |
| CastError | Invalid data type or ObjectId | Validate before querying |
| DocumentNotFoundError | `.orFail()` on missing doc | Handle in try–catch |
| MissingSchemaError | Model not defined | Define schema first |
| StrictModeError | Unknown field in strict mode | Remove extra fields |
| OverwriteModelError | Redefining existing model | Use `mongoose.models` check |
| MongooseServerSelectionError | DB connection issue | Start MongoDB / correct URI |
| VersionError | Document version conflict | Fetch latest before saving |
| ParallelSaveError | Simultaneous `.save()` calls | Avoid concurrent saves |
| DivergentArrayError | Conflicting array changes | Modify consistently |
| ValidatorError | Custom validator failed | Fix input or validator |
| StrictPopulateError | Invalid populate path | Check populate field |
| Manual MongooseError | Manually thrown | Only use for testing |

---

**Author:** Varun Mendre  
**Purpose:** Understand all built-in Mongoose error types for debugging and production handling.
