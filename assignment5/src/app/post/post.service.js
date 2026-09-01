const {
  createPost,
  findPostById,
  deletePost,
  getAllPosts,
  getAllPostsAndCommentsCount,
} = require("./post.repository.js");

async function createPostService(userId, data) {
  const { title, content } = data;
  if (!title || !content) {
    const error = new Error(
      "Missing required fields: title, content, and userId are all required.",
    );
    error.status = 400;
    throw error;
  }
  const newPost = await createPost(userId, { title, content });
  return newPost;
}
async function deletePostService(userId, postId) {
  const post = await findPostById(postId);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }

  if (post.userId !== userId) {
    const error = new Error("You are not authorized to modify this post");
    error.status = 403;
    throw error;
  }
  const deletedPost = await deletePost(postId);

  return deletePost;
}
async function getPosts() {
  const posts = await getAllPosts();
  return posts;
}
async function getPostsAndCommentsCount() {
  const posts = await getAllPostsAndCommentsCount();
  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    commentsCount: post._count.comments,
  }));
  return formattedPosts;
}
module.exports = {
  createPostService,
  deletePostService,
  getPosts,
  getPostsAndCommentsCount,
};
