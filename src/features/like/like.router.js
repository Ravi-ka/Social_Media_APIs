import express from "express";

import jwtAuth from "../../middlewares/jwt.middleware.js";
import LikeController from "./like.controller.js";
const likeController = new LikeController();

export const LikeRouter = express.Router();

LikeRouter.get("/:id", jwtAuth, (req, res) => {
  likeController.getLikes(req, res);
});
LikeRouter.get("/toggle/:id", jwtAuth, (req, res) => {
  likeController.toggleLike(req, res);
});
