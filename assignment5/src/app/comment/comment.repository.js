const prisma = require("../../common/db/db.js");
async function bulkCreateComments(data) {
  return await prisma.comment.createManyAndReturn({
    data,
  });
}
async function findCommentById(id) {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
  });
}
async function updateSpecificComment(id, content) {
  return await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
}
async function createComment({ content, userId, postId }) {
  return await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
}
async function findCommentByContentAndPostId(content, postId) {
  return await prisma.comment.findFirst({
    where: {
      content,
      postId,
    },
  });
}
async function getCommentsContainWord(word) {
  return await prisma.comment.findMany({
    where: {
      content: {
        contains: word,
        mode: "insensitive",
      },
    },
  });
}
module.exports = {
  findCommentById,
  bulkCreateComments,
  updateSpecificComment,
  createComment,
  findCommentByContentAndPostId,
  getCommentsContainWord,
};
