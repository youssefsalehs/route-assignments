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
module.exports = {
  createBulkComments,
};
