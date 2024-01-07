import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComment(req, res) {
    try {
      const postId = req.params.postId;
      const { content } = req.body;
      const userID = req.userID;
      await this.commentRepository.add(postId, content, userID);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }
}
