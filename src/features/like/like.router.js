import express from "express";

import LikeController from "./like.controller.js";
const likeController = new LikeController();

export const LikeRouter = express.Router();

LikeRouter.get("/:id", (req, res) => {
  likeController.getLikes(req, res);
});
LikeRouter.get("/toggle/:id", (req, res) => {
  likeController.toggleLike(req, res);
});
