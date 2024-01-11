import express from "express";

import FriendshipController from "./friendship.controller.js";
const friendshipController = new FriendshipController();

export const FriendRouter = express.Router();

FriendRouter.get("/:userId", (req, res) => {
  friendshipController.getFriends(req, res);
});
FriendRouter.get("/get-pending-requests", (req, res) => {
  friendshipController.getPendingRequests(req, res);
});
FriendRouter.get("/toggle-friendship/:friendId", (req, res) => {
  friendshipController.toggleFriendship(req, res);
});
FriendRouter.get("response-to-request/:friendId", (req, res) => {
  friendshipController.actionOnFriendRequest(req, res);
});
