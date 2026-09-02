const { findUserByEmail } = require("../auth/auth.repository");
const { checkPasswordLength } = require("../auth/auth.service");
const { findUserById, upsertUser } = require("./user.repository");
const bcrypt = require("bcrypt");
const getUserByEmail = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("no user found");
    error.status = 404;
    throw error;
  }
  user.password = undefined;
  return user;
};
const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    const error = new Error("no user found");
    error.status = 404;
    throw error;
  }
  user.password = undefined;
  return user;
};

const createOrUpdateUserService = async (id, data) => {
  const existingUser = await findUserById(id);

  if (existingUser) {
    checkPasswordLength(data.password);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    return await upsertUser(id, data);
  }

  if (!data.name || !data.email || !data.password || !data.role) {
    const error = new Error("name, email, password and role are required");

    error.status = 400;
    throw error;
  }

  data.password = await bcrypt.hash(data.password, 12);

  return await upsertUser({
    id,
    ...data,
  });
};
module.exports = { getUserByEmail, getUserById, createOrUpdateUserService };
