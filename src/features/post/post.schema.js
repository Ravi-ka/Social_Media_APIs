import mongoose, { Schema } from "mongoose";

export const postSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});
