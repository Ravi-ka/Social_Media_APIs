import mongoose, { Schema } from "mongoose";

export const likeSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  postID: { type: Schema.Types.ObjectId, ref: "Posts" },
  comment: { type: Schema.Types.ObjectId, ref: "Comments" },
});

const Like = mongoose.model("Likes", likeSchema);
export default Like;
