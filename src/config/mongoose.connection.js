import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;
export const connectToMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to Mongoose Server");
  } catch (error) {
    console.log(error);
    console.log("Error while connection to Mongoose");
  }
};
