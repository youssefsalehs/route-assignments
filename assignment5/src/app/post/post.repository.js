const prisma = require("../../common/db/db.js");
const createPost = async (userId, data) => {
  return await prisma.post.create({
    data: {
      ...data,
      userId,
    },
  });
};
const findPostById = async (postId) => {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
};
const deletePost = async (postId) => {
  return await prisma.post.delete({
    where: { id: postId },
  });
};
module.exports = { createPost, findPostById, deletePost };
