import express from "express";

import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

export const UserRouter = express.Router();
const userController = new UserController();

UserRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
UserRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
UserRouter.get("/logout", jwtAuth, (req, res) => {
  userController.logout(req, res);
});
UserRouter.get("/logout-all-devices", jwtAuth, (req, res) => {
  userController.logoutAllDevices(req, res);
});
UserRouter.get("/get-details/:userId", jwtAuth, (req, res) => {
  userController.getUserById(req, res);
});
UserRouter.get("/get-all-details", jwtAuth, (req, res) => {
  userController.getAllUsers(req, res);
});
UserRouter.put("/update-details/:userId", jwtAuth, (req, res) => {
  userController.updateUserDetails(req, res);
});
