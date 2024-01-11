import mongoose, { Schema } from "mongoose";

export const likeSchema = new Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
  },
  commentID: {
    type: mongoose.Types.ObjectId,
    ref: "comments",
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});
