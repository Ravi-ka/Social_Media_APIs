import mongoose from "mongoose";
import Like from "./like.schema.js";

export default class LikeRepository {
  constructor() {
    this.collection = Like;
  }
  async getLikes(postID) {
    return Like.find({ postID: postID }).populate("user", "id name email");
  }
  async toggleLike(postID, userID) {
    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postID: postID, userID: userID });

    if (existingLike) {
      // If the user has already liked, remove the like
      await Like.findByIdAndRemove(existingLike._id);
      return { liked: false };
    } else {
      // If the user has not liked, add a new like
      const newLike = await Like.create({ postID: postID, userID: userID });
      return { liked: true, like: newLike };
    }
  }
}
