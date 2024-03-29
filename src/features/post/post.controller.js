import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async addNewPost(req, res) {
    try {
      const { caption } = req.body;
      const userID = req.userID;
      console.log(userID);
      const newPost = {
        imageUrl: req.file.filename,
        caption,
        userID: req.userID,
      };
      const result = await this.postRepository.addPost(newPost);
      if (result) {
        return res
          .status(201)
          .json({ result: "success", response: "New post has been created" });
      } else {
        return res
          .status(500)
          .json({ result: "failed", response: "Not able to add new post" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async getAllPosts(req, res) {
    try {
      const result = await this.postRepository.getAll();
      return res.status(200).json({ result: "success", response: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async getByPostId(req, res) {
    try {
      const postId = req.params.postId;
      const result = await this.postRepository.getById(postId);
      return res.status(200).json({ result: "success", response: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async getPostOfSpecificUser(req, res) {
    try {
      const userID = req.userID;
      console.log(userID);
      const result = await this.postRepository.specificPost(userID);
      return res.status(200).json({ result: "success", response: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async deletePost(req, res) {
    try {
      const postID = req.params.postId;
      const result = await this.postRepository.deletePost(postID);
      if (!result) {
        return res.status(404).json({
          result: "failed",
          response: "Post Not found or not a valid postId",
        });
      } else {
        return res
          .status(200)
          .json({ result: "success", response: "Post deleted successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async updatePostById(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const { caption, imageUrl } = req.body;
      const newUpdate = { imageUrl: req.file.filename, caption: caption };
      const result = await this.postRepository.updatePost(
        userID,
        postID,
        newUpdate
      );
      if (!result) {
        return res.status(403).json({
          result: "failed",
          response:
            "Unauthorized: Post not found or you do not have permission to update it",
        });
      } else {
        return res.status(200).json({
          result: "success",
          msg: "Post updated successfully",
          response: result,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }
}
