const { findUserByEmail, createNewUser } = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signup(data) {
  const { name, email, role, password } = data;
  const userExists = await findUserByEmail(email);
  if (userExists) {
    const error = new Error("user already exists");
    error.status = 400;
    throw error;
  }
  checkPasswordLength(password);
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = createNewUser({
    name,
    email,
    role,
    password: hashedPassword,
  });
  return newUser;
}
async function login(data) {
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("user not found");
    error.status = 404;
    throw error;
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    const error = new Error("incorrect password");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return { token };
}
function checkPasswordLength(password) {
  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters long");
    error.status = 400;
    throw error;
  }
}
module.exports = { signup, login, checkPasswordLength };
