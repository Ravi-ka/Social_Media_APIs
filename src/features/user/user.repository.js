import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

const UserModel = mongoose.model("Users", userSchema);

export default class UserRepository {
  constructor() {
    this.collection = "user";
  }
  async signUp(newUser) {
    try {
      // Create an instance of the model
      const user = new UserModel(newUser);
      await user.save();
      return newUser;
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error) {
        throw new ApplicationError(error.message, 500);
      }
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signIn() {}

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error) {
        throw new ApplicationError(error.message, 500);
      }
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
