import express from "express";

import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

export const PostRouter = express.Router();
const postController = new PostController();

PostRouter.post("/", jwtAuth, upload.single("imageUrl"), (req, res) => {
  postController.addNewPost(req, res);
});
PostRouter.get("/all", jwtAuth, (req, res) => {
  postController.getAllPosts(req, res);
});
PostRouter.get("/:postId", jwtAuth, (req, res) => {
  postController.getByPostId(req, res);
});
PostRouter.get("/", jwtAuth, (req, res) => {
  postController.getPostOfSpecificUser(req, res);
});
PostRouter.delete("/:postId", jwtAuth, (req, res) => {
  postController.deletePost(req, res);
});
PostRouter.put("/:postId", jwtAuth, (req, res) => {
  postController.updatePost(req, res);
});
