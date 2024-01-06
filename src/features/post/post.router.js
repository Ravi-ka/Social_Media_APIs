import express from "express";

import PostController from "./post.controller.js";

export const PostRouter = express.Router();
const postController = new PostController();

PostRouter.post("/", (req, res) => {
  postController.addNewPost(req, res);
});
