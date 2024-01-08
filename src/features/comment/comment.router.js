import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import CommentController from "./comment.controller.js";
const commentController = new CommentController();

export const CommentRouter = express.Router();

CommentRouter.post("/:postId", jwtAuth, (req, res) => {
  commentController.addComment(req, res);
});
CommentRouter.get("/:postId", jwtAuth, (req, res) => {
  commentController.getComment(req, res);
});
CommentRouter.put("/:postId", jwtAuth, (req, res) => {
  commentController.updateComment(req, res);
});
CommentRouter.delete("/:postId", jwtAuth, (req, res) => {
  commentController.deleteComment(req, res);
});
