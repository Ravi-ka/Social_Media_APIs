import express from "express";

import UserController from "./user.controller.js";

export const UserRouter = express.Router();
const userController = new UserController();

UserRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
UserRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
UserRouter.get("/logout", (req, res) => {
  userController.logout(req, res);
});
UserRouter.get("/logout-all-devices", (req, res) => {
  userController.logoutAllDevices(req, res);
});
UserRouter.get("/get-details/:userId", (req, res) => {
  userController.getUserById(req, res);
});
UserRouter.get("/get-all-details", (req, res) => {
  userController.getAllUsers(req, res);
});
UserRouter.put("/update-details/:userId", (req, res) => {
  userController.updateUserDetails(req, res);
});
