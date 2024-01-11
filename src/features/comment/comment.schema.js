import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userID: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  postID: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Posts",
  },
  likes: {
    type: mongoose.Types.ObjectId,
    ref: "likes",
  },
});

export default commentSchema;
