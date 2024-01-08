import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComment(req, res) {
    try {
      const postID = req.params.postId;
      const { content } = req.body;
      const userID = req.userID;
      const newComment = { content, userID, postID };
      const result = await this.commentRepository.add(newComment);
      return res.status(201).json({ result: "success", response: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async getComment(req, res) {
    try {
      const postID = req.params.postId;
      const result = await this.commentRepository.get(postID);
      return res.status(200).json({ result: "success", response: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async updateComment(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const { content } = req.body;
      const result = await this.commentRepository.update(
        postID,
        userID,
        content
      );
      if (!result) {
        return res.status(403).json({
          result: "failed",
          response:
            "Unauthorized: Comment not found or you do not have permission to update it",
        });
      } else {
        return res.status(200).json({
          result: "success",
          msg: "Comment updated successfully",
          response: result,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const result = await this.commentRepository.delete(postID, userID);
      if (!result) {
        return res.status(404).json({
          result: "failed",
          response: "Comment Not found or not a valid postId",
        });
      } else {
        return res
          .status(200)
          .json({
            result: "success",
            response: "Comment deleted successfully",
          });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }
}
