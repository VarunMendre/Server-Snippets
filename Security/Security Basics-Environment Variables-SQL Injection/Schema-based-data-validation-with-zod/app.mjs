import * as z from "zod";

// const schema = z
//   .string("Please enter a valid string")
//   .min(3)
//   .max(6)
//   .startsWith("aa");

// if we use .parse method we've to use try-catch block

// const rawData = 1;
// try {
//   const validatedData = schema.parse(rawData);

//   console.log(validatedData);
// } catch (err) {
//   console.log(err.issues);
// }

//Doesn't require try-catch block + gives an error object if not .success

// const rawData = "aa10";
// const result = schema.safeParse(rawData);
// if (result.success) {
//   console.log(result.data);
// } else {
//   console.log(result.error.issues);
// }

// Validating OTP with REGEX

// const Schema = z.string("Please Enter a valid otp").regex(/^\d{4}$/, "Please enter a valid 4 digit number");

// const otpData = "12344";

// const result = Schema.safeParse(otpData);

// if (result.success) {
//     console.log(`Your OTP has been validate`);
// } else {
//     console.log(result.error.issues);
// }

const Schema = z.object({
  name: z
    .string("Please enter a valid string")
    .min(3, "Please enter at least 3 characters")
    .max(100, "Please enter at max 100 character"),
    
    age: z.number().lt(120, "Age cannot be greater than 119") ,
   email : z.email().optional()
});

const otpData = {
    name: "Varun",
    age: 22,
};

const result = Schema.safeParse(otpData);

if (result.success) {
    console.log(result);
} else {
    console.log(result.error.issues);
}
// NODEREGEX
