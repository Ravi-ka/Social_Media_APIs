import ApplicationError from "../../error-handler/applicationError.js";
import Friendship from "./friendship.schema.js";

export default class FriendshipRepository {
  constructor() {
    this.collection = Friendship;
  }

  async createFriendship(user1, user2) {
    try {
      return Friendship.create({ user1, user2 });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getFriends(userId) {
    return Friendship.find({
      $or: [{ user1: userId }, { user2: userId }],
      status: "accepted",
    })
      .populate("user1", "name")
      .populate("user2", "name");
  }
  async getPendingRequests(userIDS) {
    return Friendship.find({ user2: userId, status: "pending" }).populate(
      "user1",
      "name"
    );
  }

  async updateFriendshipStatus(friendshipId, status) {
    return Friendship.findByIdAndUpdate(
      friendshipId,
      { status },
      { new: true }
    );
  }
}
