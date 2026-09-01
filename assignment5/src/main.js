const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const authRouter = require("./app/auth/auth.route");
const userRouter = require("./app/user/user.route");
const postRouter = require("./app/post/post.route");
const commentRouter = require("./app/comment/comment.route");
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    message: "route not found",
  });
});
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
});
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
