const authService = require("./auth.service.js");
const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    if (!user) {
      const error = new Error("failed to create user");
      error.status = 400;
      throw error;
    }
    return res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { token } = await authService.login(req.body);
    if (!token) {
      const error = new Error("failed to login");
      error.status = 400;
      throw error;
    }
    return res.status(201).json({
      message: "user logged in successfully",
      token,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = { signup, login };
