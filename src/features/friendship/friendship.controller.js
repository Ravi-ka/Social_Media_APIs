import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController {
  constructor() {
    this.friendshipRepository = new FriendshipRepository();
  }

  async toggleFriendship(req, res) {
    try {
      const friendID = req.params.friendId;
      const userID = req.userID;
      // Check if the friendship exists
      const existingFriendship =
        await this.friendshipRepository.collection.findOne({
          $or: [
            { user1: userID, user2: friendID },
            { user1: friendID, user2: userID },
          ],
        });
      if (existingFriendship) {
        // Friendship exists, toggle status
        const newStatus =
          existingFriendship.status === "Pending" ? "Accepted" : "Pending";
        const updateFriendship =
          await this.friendshipRepository.updateFriendshipStatus(
            existingFriendship._id,
            newStatus
          );
        res.json(updateFriendship);
      } else {
        // Friendship does not exists, create a new one
        const newFriendship = await this.friendshipRepository.createFriendship(
          userID,
          friendID
        );
        res.json(newFriendship);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ result: "Error", response: "Internal Server Error" });
    }
  }

  async getFriends(req, res) {
    try {
      const userID = req.userID;
      const friends = await this.friendshipRepository.getFriends(userID);
      res.json(friends);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ result: "Error", response: "Internal Server Error" });
    }
  }

  async getPendingRequests(req, res) {
    try {
      const userID = req.userID;
      const pendingRequests =
        await this.friendshipRepository.getPendingRequests(userID);
      res.json(pendingRequests);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ result: "Error", response: "Internal Server Error" });
    }
  }

  async actionOnFriendRequest(req, res) {
    try {
      const { friendId } = req.params;
      const { action } = req.body;
      const userID = req.userID;

      // Assuming the action can be "accept" or "reject"
      if (action === "Accept" || action === "Reject") {
        const existingFriendship =
          await this.friendshipRepository.collection.findOne({
            user1: friendId,
            user2: userID,
            status: "Pending",
          });

        if (existingFriendship) {
          const newStatus = action === "Accept" ? "Accepted" : "Rejected";
          const updatedFriendship =
            await this.friendshipRepository.updateFriendshipStatus(
              existingFriendship._id,
              newStatus
            );
          res.json(updatedFriendship);
        } else {
          res
            .status(404)
            .json({ result: "failed", response: "Friend request not found" });
        }
      } else {
        res.status(400).json({ result: "failed", response: "Invalid action" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ result: "Error", response: "Internal Server Error" });
    }
  }
}
