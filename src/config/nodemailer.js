import nodemailer from "nodemailer";
import otpGenerator from "./generateOTP.js";

export default function sendOTP(emailID) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ka.ravisankar@gmail.com",
      pass: "jdrltjrhmcyjahkp",
    },
  });

  const mailOptions = {
    from: "ka.ravisankar@gmail.com",
    to: emailID,
    subject: "OTP - Reset Password",
    text:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otpGenerator() +
      "</h1>",
  };
  const sendMail = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Message Sent : %s", info.messageId);
      console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
    }
  });
}
