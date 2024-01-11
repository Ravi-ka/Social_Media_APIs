import CommentRepository from "../comment/comment.repository.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike(req, res) {
    try {
      const id = req.params.id;
      const type = req.query.type;
      const userID = req.userID;
      if (type === "Comment") {
        await this.commentRepository.likableComment(id, userID);
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
