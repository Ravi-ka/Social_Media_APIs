import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const likeModel = mongoose.model("Likes", likeSchema);

export default class LikeRepository {
  constructor() {
    this.collection = "Likes";
  }
}
