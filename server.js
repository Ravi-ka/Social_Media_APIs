import "./src/config/dotenv.js";
import express from "express";
import bodyParser from "body-parser";

import { connectToMongoose } from "./src/config/mongoose.connection.js";
import { PostRouter } from "./src/features/post/post.router.js";
import { UserRouter } from "./src/features/user/user.router.js";
import { CommentRouter } from "./src/features/comment/comment.router.js";

const server = express();
const port = 8000;

// Body Parser
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());

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

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectToMongoose();
});
