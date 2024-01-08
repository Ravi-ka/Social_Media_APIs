import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";

const commentModel = mongoose.model("Comments", commentSchema);

export default class CommentRepository {
  constructor() {
    this.collection = "Comments";
  }

  async add(newComment) {
    try {
      // console.log(newComment);
      const newPost = await commentModel(newComment);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(postId) {
    try {
      const result = await commentModel.findOne({
        postID: new ObjectId(postId),
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async update(postID, userID, content) {
    try {
      const result = await commentModel.findOneAndUpdate(
        { postID: new ObjectId(postID), userID: new ObjectId(userID) },
        { content },
        { new: true }
      );
      if (!result) {
        return false;
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async delete(postID, userID) {
    try {
      const result = await commentModel.findOneAndDelete({
        postID: new ObjectId(postID),
        userID: new ObjectId(userID),
      });
      if (result) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
