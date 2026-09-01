const postService = require("./post.service.js");
async function createPost(req, res, next) {
  try {
    const userId = req.user.id;
    const newPost = await postService.createPostService(userId, req.body);
    return res.status(201).json({
      message: "post created successfully",
    });
  } catch (error) {
    return next(error);
  }
}
async function deletePost(req, res, next) {
  try {
    const userId = req.user.id;
    const postId = +req.params.id;
    await postService.deletePostService(userId, postId);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
module.exports = { createPost, deletePost };
