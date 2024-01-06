import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});
