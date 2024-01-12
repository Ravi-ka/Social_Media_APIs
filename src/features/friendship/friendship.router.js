import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js";

import FriendshipController from "./friendship.controller.js";
const friendshipController = new FriendshipController();

export const FriendRouter = express.Router();

FriendRouter.get("/:userId", jwtAuth, (req, res) => {
  friendshipController.getFriends(req, res);
});
FriendRouter.get("/get-pending-requests", jwtAuth, (req, res) => {
  friendshipController.getPendingRequests(req, res);
});
FriendRouter.get("/toggle-friendship/:friendId", jwtAuth, (req, res) => {
  friendshipController.toggleFriendship(req, res);
});
FriendRouter.get("response-to-request/:friendId", jwtAuth, (req, res) => {
  friendshipController.actionOnFriendRequest(req, res);
});
