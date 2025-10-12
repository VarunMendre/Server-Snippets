import mongoose from "mongoose";

await mongoose.connect("mongodb://admin:admin@localhost");
console.log("Database connection requested");

console.log("Running DB.js");
