import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import { ObjectId } from "mongodb";

const commentModel = mongoose.model("Comments", commentSchema);

export default class CommentRepository {
  constructor() {
    this.collection = "Comments";
  }

  async add(postId, content, userID) {
    try {
      const newPost = await commentModel(content);
      await newPost.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
