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
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  });

  return posts;
};
async function getAllPostsAndCommentsCount() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: { comments: true },
      },
    },
  });

  return posts;
}
async function getExistingPosts(postIds) {
  return await prisma.post.findMany({
    where: { id: { in: postIds } },
    select: { id: true },
  });
}

module.exports = {
  createPost,
  findPostById,
  deletePost,
  getAllPosts,
  getAllPostsAndCommentsCount,
  getExistingPosts,
};
//I tried to impelament raw query but it didn't give me the same response format
// select u.id,u.name,p.id,p.title,c.id,c.content from users u join posts p on u.id=p.user_id join comments c on p.id=c.post_id
