// 1️⃣ ValidationError Example

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "User name is required"],
//     minlength: [3, "Name must be at least 3 characters"],
//   },
//   age: {
//     type: Number,
//     min: [18, "Age must be at least 18"],
//     max: [60, "Age must be below 60"],
//   },
// });

// const User = mongoose.model("User", userSchema);
// export default User


// 2️⃣ CastError Example

// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// export const User = mongoose.model("User", userSchema);


// 3️⃣ DocumentNotFoundError Example

// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
// });

// export const User = mongoose.model("User", userSchema);


// 4️⃣ MissingSchemaError Example

// userModel.js
// import mongoose from "mongoose";

// // This file is intentionally empty — no schema is exported here.



// 5️⃣ StrictModeError Example


// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     age: Number,
//   },
//   { strict: "throw" } // strict mode throws an error for unknown fields
// );

// export const User = mongoose.model("User", userSchema);



// 6️⃣ OverwriteModelError Example

// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({ name: String });

// // First model definition
// export const User = mongoose.model("User", userSchema);


// 7️⃣ MongooseServerSelectionError Example

// userModel.js
// No schema needed for this one


// 8️⃣ VersionError Example

// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// }, {
//   optimisticConcurrency: true,
// });

// const User = mongoose.model("User", userSchema);
// export default User


// 9️⃣ ParallelSaveError Example

// // userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
// });

// export const User = mongoose.model("User", userSchema);



// 🔟 DivergentArrayError Example

// userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   items: [String],
// }, {
//   optimisticConcurrency:true,
// });

// const User = mongoose.model("User", userSchema);
// export default User;


// 1️⃣1️⃣ ValidatorError Example

// // userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     validate: {
//       validator: function (v) {
//         return v.includes("@");
//       },
//       message: "Invalid email format",
//     },
//   },
// });

// export const User = mongoose.model("User", userSchema);

// 1️⃣2️⃣ StrictPopulateError Example

// userModel.js
// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

// export const Post = mongoose.model("Post", postSchema);



// 1️⃣3️⃣ Manual Error Example (Custom)

// userModel.js
import mongoose from "mongoose";

export default mongoose;
