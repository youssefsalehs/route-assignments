const { Router } = require("express");
const commentController = require("./comment.controller.js");
const commentRouter = Router();
const guard = require("../../common/auth/guard.js");
commentRouter.post("/bulk", commentController.createBulkComments);
commentRouter.patch("/:id", guard, commentController.updateComment);
commentRouter.post(
  "/find-or-create",
  guard,
  commentController.findOrCreateComment,
);
commentRouter.get("/search", commentController.getCommentsContainWord);
commentRouter.get(
  "/newest/:postId",
  commentController.getTop3NewestCommentsForPost,
);
commentRouter.get("/details/:id", commentController.getCommentDetails);
module.exports = commentRouter;
