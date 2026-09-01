const { Router } = require("express");
const postController = require("./post.controller.js");
const guard = require("../../common/auth/guard.js");
const postRouter = Router();

postRouter.post("/", guard, postController.createPost);
postRouter.delete("/:id", guard, postController.deletePost);
module.exports = postRouter;
