const { Router } = require("express");
const commentController = require("./comment.controller.js");
const commentRouter = Router();
commentRouter.post("/bulk", commentController.createBulkComments);
module.exports = commentRouter;
