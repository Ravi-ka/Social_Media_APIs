import nodemailer from "nodemailer";

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

export default class OtpController {
  async sendOTP(req, res) {
    try {
      const emailID = req.body.email;

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
        html:
          "<h3>OTP for password reset is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        } else {
          console.log("Message Sent : %s", info.messageId);
          console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
        }
      });
      return res.status(200).json({
        result: "success",
        response: `OTP has been sent to ${emailID}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async verifyOTP(req, res) {
    try {
      if (req.body.otp === otp) {
        return res
          .status(200)
          .json({ result: "success", response: "OTP is correct" });
      } else {
        return res.status(400).json({
          result: "failed",
          response: "OTP is Incorrect, please enter the correct OTP",
        });
      }
    } catch (error) {}
  }
}
