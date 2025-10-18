import { Resend } from "resend";

const randomNumber = Math.floor(1000 + Math.random() * 9000);
// console.log(randomNumber);


const resend = new Resend("re_Fb3vBDZN_DbiUmsNpiqKB5w42KkEngXeW");

const result = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "varunmm0404@gmail.com",
  subject: "Hello World",
  html: `Your OTP is : ${randomNumber}`,
});

console.log(result);

