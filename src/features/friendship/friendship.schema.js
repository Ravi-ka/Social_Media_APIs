import mongoose, { Schema } from "mongoose";

export const FriendSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const Friendship = mongoose.model("Friendships", FriendSchema);
export default Friendship;
