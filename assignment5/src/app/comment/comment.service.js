const { getExistingPosts } = require("../post/post.repository");
const { getExistingUsers } = require("../user/user.repository");
const commentRepository = require("./comment.repository");
async function createBulkComments(rawComments) {
  if (rawComments.length === 0) {
    const error = new Error("Input must be a non-empty array of comments.");
    error.status = 400;
    throw error;
  }
  const sanitizedData = rawComments.map((comment) => {
    if (!comment.content) {
      const error = new Error("Each comment must have valid text content.");
      error.status = 400;
      throw error;
    }

    if (!comment.userId || !comment.postId) {
      const error = new Error(
        "Each comment requires a valid userId and postId.",
      );
      error.status = 400;
      throw error;
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
    const error = new Error("One or more user IDs do not exist.");
    error.status = 400;
    throw error;
  }
  const existingPosts = await getExistingPosts(postIds);
  if (existingPosts.length !== postIds.length) {
    const error = new Error("One or more post IDs do not exist.");
    error.status = 400;
    throw error;
  }

  return commentRepository.bulkCreateComments(rawComments);
}
async function updateComment(userId, commentId, content) {
  if (!content || content.trim() === "") {
    const error = new Error("Content is required to update a comment.");
    error.status = 400;
    throw error;
  }
  const comment = await commentRepository.findCommentById(commentId);
  if (!comment) {
    const error = new Error("comment not found.");
    error.status = 404;
    throw error;
  }
  if (userId !== comment.userId) {
    const error = new Error("your're not authenicated to remove this comment");
    error.status = 403;
    throw error;
  }
  await commentRepository.updateSpecificComment(commentId, content);
  return { message: "comment updated successfully" };
}
async function findOrCreateComment(content, userId, postId) {
  let created;
  if (!content || content.trim() === "") {
    const error = new Error("Content is required to create a comment.");
    error.status = 400;
    throw error;
  }
  const comment = await commentRepository.findCommentByContentAndPostId(
    content,
    postId,
  );
  if (comment) {
    created = false;
    return { comment, created };
  }
  const newComment = await commentRepository.createComment({
    content,
    userId,
    postId,
  });
  created = true;
  return { newComment, created };
}
async function getCommentsContainWord(word) {
  const comments = await commentRepository.getCommentsContainWord(word);
  return comments;
}
async function getTop3NewestCommentsForPost(postId) {
  const comments =
    await commentRepository.findTop3NewestCommentsForPost(postId);
  return comments;
}
async function getCommentDetails(commentId) {
  if (!commentId) {
    throw new Error("Comment ID is required");
  }

  const comment =
    await commentRepository.findCommentByIdWithUserAndPost(commentId);
  if (!comment) {
    const error = new Error("Comment not found");
    error.status = 404;
    throw error;
  }

  return comment;
}
module.exports = {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  getCommentsContainWord,
  getTop3NewestCommentsForPost,
  getCommentDetails,
};
