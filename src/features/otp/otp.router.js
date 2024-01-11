import express from "express";
import OtpController from "./otp.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

export const otpRouter = express.Router();

const otpController = new OtpController();

otpRouter.post("/send", jwtAuth, (req, res) => {
  otpController.sendOTP(req, res);
});
otpRouter.post("/verify", jwtAuth, (req, res) => {
  otpController.verifyOTP(req, res);
});
