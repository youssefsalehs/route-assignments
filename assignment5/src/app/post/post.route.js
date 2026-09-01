const { Router } = require("express");
const postController = require("./post.controller.js");
const guard = require("../../common/auth/guard.js");
const postRouter = Router();

postRouter
  .route("/")
  .post(guard, postController.createPost)
  .get(postController.getAllPosts);
postRouter
  .route("/comments-count")
  .get(postController.getPostsAndCommentsCount);
postRouter.delete("/:id", guard, postController.deletePost);
module.exports = postRouter;
