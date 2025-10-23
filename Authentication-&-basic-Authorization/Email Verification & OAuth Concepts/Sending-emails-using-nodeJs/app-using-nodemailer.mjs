import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,  //465, 25
  auth: {
    user: "varunmm0404@gmail.com",
    pass: "wyfj xsoq uptx cyfv",
  },
});


const info = await transporter.sendMail({
  from: '"Varun Mendre" <varunmm0404@gmail.com>',
  to: "r20932289@gmail.com, varun@asmedu.org, shreyaiyer@asmedu.org",
  subject: "Learning NodeMailer in NodeJS",
  html: `<h2 style="color:red">Hello From Varun</h2>`, // HTML body
});

console.log("Message sent: %s", info.messageId);