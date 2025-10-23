import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  auth: {
    user: "resend",
    pass: "re_Q6KEKoDn_Gveb78JtUkTzZWzQ3krp2E2k",
  },
});

const info = await transporter.sendMail({
  from: "Storage App <otp@procodrr.dev>",
  to: "anuragsinghbam@gmail.com, procodrr@gmail.com",
  subject: "Storage App OTP",
  text: "Your OTP is 7396",
});

console.log("Message sent: %s", info.messageId);
