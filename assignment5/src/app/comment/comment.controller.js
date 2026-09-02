const commentService = require("./comment.service.js");
async function createBulkComments(req, res, next) {
  try {
    const { comments } = req.body;
    await commentService.createBulkComments(comments);
    return res.status(201).json({
      message: "comments created successfully",
    });
  } catch (error) {
    return next(error);
  }
}
async function updateComment(req, res, next) {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const commentId = +req.params.id;
    const { message } = await commentService.updateComment(
      userId,
      commentId,
      content,
    );
    return res.status(200).json({ message });
  } catch (error) {
    return next(error);
  }
}
async function findOrCreateComment(req, res, next) {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id;
    const { comment, created, newComment } =
      await commentService.findOrCreateComment(content, userId, postId);
    return res.status(200).json({
      comment: created ? newComment : comment,
      created,
    });
  } catch (error) {
    return next(error);
  }
}
async function getCommentsContainWord(req, res, next) {
  try {
    const { word } = req.query;
    const comments = await commentService.getCommentsContainWord(word);
    if (!comments || comments.length === 0) {
      return res.status(200).json({
        message: "No comments found",
      });
    }
    return res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  getCommentsContainWord,
};
