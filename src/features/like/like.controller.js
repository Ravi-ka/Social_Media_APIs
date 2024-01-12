import CommentRepository from "../comment/comment.repository.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.commentRepository = new CommentRepository();
  }
  async getLikes(req, res) {
    try {
      const { id } = req.params;
      const likes = await this.likeRepository.getLikes(id);
      res.json(likes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const userID = req.userID; // Assuming you have user information in req.user

      const result = await this.likeRepository.toggleLike(id, userID);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
