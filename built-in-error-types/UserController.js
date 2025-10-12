// import mongoose from "mongoose";

// // 1️⃣ ValidationError Example
// import User from "./UserModel.js";

//   try {
//     // Intentionally trigger validation errors:
//     await User.create({
//       name: "Vi", // too short (minlength)
//       age: 10, // below min
//     });
//   } catch (err) {
//     console.log("\n🔥 ValidationError Triggered 🔥");
//     console.log("Error Name:", err.name); // ValidationError
//     console.log("Message:", err.message); // Full error message
//     console.log("Details:", err.errors); // Object with field-level details
//   }

// 2️⃣ CastError Example
// userController.js
// import { User } from "./UserModel.js";

//   try {
//     // Invalid ObjectId (should be 24 hex chars)
//     await User.findById("12345");
//   } catch (err) {
//     console.log("\n🔥 CastError Triggered 🔥");
//     console.log("Error Name:", err.name);   // CastError
//     console.log("Message:", err.message);
//   }



// 3️⃣ DocumentNotFoundError Example

// userController.js
// import { User } from "./UserModel.js";

//   try {
//     // Using .orFail() to throw DocumentNotFoundError
//     await User.findOne({ name: "NonExistingUser" }).orFail();
//   } catch (err) {
//     console.log("\n🔥 DocumentNotFoundError Triggered 🔥");
//     console.log("Error Name:", err.name);  // DocumentNotFoundError
//     console.log("Message:", err.message);
//     console.log(err);
//   }



// 4️⃣ MissingSchemaError Example

// userController.js

  // try {
  //   // Using a model that was never defined
  //   const Ghost = mongoose.model("Ghost");
  // } catch (err) {
  //   console.log("\n🔥 MissingSchemaError Triggered 🔥");
  //   console.log("Error Name:", err.name);  // MissingSchemaError
  //   console.log("Message:", err.message);
  //   console.log(err);
  // }



// 5️⃣ StrictModeError Example

// userController.js
// import { User } from "./UserModel.js";

//   try {
//     // Adding an unknown field
//     const user = new User({
//       name: "Varun",
//       age: 24,
//       extraField: "Not allowed",
//     });
//     await user.save();
//   } catch (err) {
//     console.log("\n🔥 StrictModeError Triggered 🔥");
//     console.log("Error Name:", err.name);   // StrictModeError
//     console.log("Message:", err.message);
//     console.log(err);
//   }


// 6️⃣ OverwriteModelError Example

// userController.js
// import mongoose from "mongoose";

//   try {
//     // Defining the same model name again will throw OverwriteModelError
//     const userSchema = new mongoose.Schema({ name: String });
//     mongoose.model("User", userSchema);
//   } catch (err) {
//     console.log("\n🔥 OverwriteModelError Triggered 🔥");
//     console.log("Error Name:", err.name);   // OverwriteModelError
//     console.log("Message:", err.message);
//     console.log(err);
// }
  


// 7️⃣ MongooseServerSelectionError Example

// userController.js
// import mongoose from "mongoose";

//   try {
//     // Wrong port to cause connection error
//     await mongoose.connect("mongodb://127.0.0.1:9999/fakeDB");
//   } catch (err) {
//     console.log("\n🔥 MongooseServerSelectionError Triggered 🔥");
//     console.log("Error Name:", err.name);  // MongooseServerSelectionError
//     console.log("Message:", err.message);
//     console.log(err);
// }
  

// 8️⃣ VersionError Example

// userController.js
// import User from "./UserModel.js"

//   try {
//     // Create a new user
//     const user = await User.create({ name: "Varun", age: 25 });

//     // Load the same document twice
//     const doc1 = await User.findById(user._id);
//     const doc2 = await User.findById(user._id);

//     // Save first document (increments internal __v)
//     doc1.age = 26;
//     await doc1.save();

//     // Try saving second one (older version)
//     doc2.age = 30;
//     await doc2.save(); // triggers VersionError

//   } catch (err) {
//     console.log("\n🔥 VersionError Triggered 🔥");
//     console.log("Error Name:", err.name);   // VersionError
//     console.log("Message:", err.message);
//     console.log(err);
//   }


// 9️⃣ ParallelSaveError Example

// userController.js
// import { User } from "./UserModel.js";

//   try {
//     const user = new User({ name: "Varun" });

//     // Attempt two saves simultaneously
//     const save1 = user.save();
//     const save2 = user.save(); // parallel save → error

//     await Promise.all([save1, save2]);
//   } catch (err) {
//     console.log("\n🔥 ParallelSaveError Triggered 🔥");
//     console.log("Error Name:", err.name);   // ParallelSaveError
//     console.log("Message:", err.message);
//     console.log(err);
//   }


// 🔟 DivergentArrayError Example


// userController.js
// import User from "./UserModel.js";

//   try {
//     const user = await User.create({ items: ["A", "B"] });

//     // Two conflicting array modifications in same document
//     user.items.pull("A");
//     user.items.push("C");

//     // Simulate divergent operations
//     await user.save();
//   } catch (err) {
//     console.log("\n🔥 DivergentArrayError Triggered 🔥");
//     console.log("Error Name:", err.name);   // DivergentArrayError
//     console.log("Message:", err.message);
//   }

// 1️⃣1️⃣ ValidatorError Example

// // userController.js
// import { User } from "./UserModel.js";

//   try {
//     await User.create({ email: "invalidEmail.com" }); // no '@' sign
//   } catch (err) {
//     console.log("\n🔥 ValidatorError Triggered 🔥");
//     console.log("Error Name:", err.name);   // ValidationError
//     console.log("Message:", err.message);

//     // Specific ValidatorError details:
//     console.log("Each path error:", err.errors.email);
//   }

// 1️⃣2️⃣ StrictPopulateError Example

// userController.js
// import { Post } from "./UserModel.js";

  // try {
  //   // Strict populate mode enabled → throws if invalid path populated
  //   await Post.find().populate({
  //     path: "invalidField",
  //     strictPopulate: true,
  //   });
  // } catch (err) {
  //   console.log("\n🔥 StrictPopulateError Triggered 🔥");
  //   console.log("Error Name:", err.name);   // StrictPopulateError
  //   console.log("Message:", err.message);
// }
  

// 1️⃣3️⃣ Manual Error Example (Custom)

// userController.js
import mongoose from "./UserModel.js";


  try {
    throw new mongoose.Error.MongooseError("This is a manual error example");
  } catch (err) {
    console.log("\n🔥 Manual MongooseError Triggered 🔥");
    console.log("Error Name:", err.name);   // MongooseError
    console.log("Message:", err.message);
    console.log(err);
  }

