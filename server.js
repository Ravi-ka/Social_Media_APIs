import "./src/config/dotenv.js";
import express from "express";
import bodyParser from "body-parser";

import { connectToMongoose } from "./src/config/mongoose.connection.js";
import { PostRouter } from "./src/features/post/post.router.js";
import { UserRouter } from "./src/features/user/user.router.js";
import { CommentRouter } from "./src/features/comment/comment.router.js";
import { LikeRouter } from "./src/features/like/like.router.js";
import { otpRouter } from "./src/features/otp/otp.router.js";
import { FriendRouter } from "./src/features/friendship/friendship.router.js";
import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";

const server = express();
const port = 8000;

// Body Parser
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());

// Logger
server.use(loggerMiddleware);

//Default Route
server.get("/", (req, res) => {
  res.send("Welcome to the Social Media Backend API project");
});

// User Route
server.use("/api/users", UserRouter);
//Post Route
server.use("/api/posts", PostRouter);
// Comment Route
server.use("/api/comments", CommentRouter);
// Like Route
server.use("/api/likes", LikeRouter);
// OTP Route
server.use("/api/otp", otpRouter);
// Friendship Route
server.use("/api/friends", FriendRouter);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectToMongoose();
});
