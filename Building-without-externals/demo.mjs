import crypto from "crypto";

const email = "varun@gmail.com";

const registerPass = crypto.createHash("sha256").update(email).digest("hex");

// const loginPass = crypto.createHash("sha256").update(email).digest("hex");

console.log(registerPass);