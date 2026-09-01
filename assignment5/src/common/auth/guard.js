const { findUserById } = require("../../app/user/user.repository");

const jwt = require("jsonwebtoken");
async function guard(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    console.log(decoded);
    if (!user) {
      const error = new Error("no user found");
      error.status = 404;
      throw error;
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = guard;
