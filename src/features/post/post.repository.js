import mongoose, { mongo } from "mongoose";
import ApplicationError from "../../error-handler/applicationError.js";
import { postSchema } from "./post.schema.js";
import { ObjectId } from "mongodb";

const postModel = mongoose.model("Posts", postSchema);

export default class PostRepository {
  constructor() {
    this.collection = "Posts";
  }

  async addPost(newPost) {
    try {
      const addNewPost = await postModel(newPost);
      await addNewPost.save();
      return addNewPost;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      return await postModel.find();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getById(id) {
    try {
      return await postModel.findById({ _id: new ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
