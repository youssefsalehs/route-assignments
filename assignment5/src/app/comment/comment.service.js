const { getExistingPosts } = require("../post/post.repository");
const { getExistingUsers } = require("../user/user.repository");
const commentRepository = require("./comment.repository");
async function createBulkComments(rawComments) {
  if (!Array.isArray(rawComments) || rawComments.length === 0) {
    throw new Error("Input must be a non-empty array of comments.");
  }
  const sanitizedData = rawComments.map((comment) => {
    if (!comment.content || typeof comment.content !== "string") {
      throw new Error("Each comment must have valid text content.");
    }

    if (!comment.userId || !comment.postId) {
      throw new Error("Each comment requires a valid userId and postId.");
    }

    return {
      content: comment.content.trim(),
      userId: Number(comment.userId),
      postId: Number(comment.postId),
    };
  });

  const userIds = [...new Set(rawComments.map((c) => c.userId))];
  const postIds = [...new Set(rawComments.map((c) => c.postId))];
  const existingUsers = await getExistingUsers(userIds);
  if (existingUsers.length !== userIds.length) {
    throw new Error("One or more user IDs do not exist.");
  }
  const existingPosts = await getExistingPosts(postIds);
  if (existingPosts.length !== postIds.length) {
    throw new Error("One or more post IDs do not exist.");
  }

  return commentRepository.bulkCreateComments(rawComments);
}
module.exports = { createBulkComments };
