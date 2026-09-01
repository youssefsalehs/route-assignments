const userService = require("./user.service.js");
const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userService.getUserByEmail(email);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await userService.getUserById(id);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return next(error);
  }
};
async function createOrUpdateUser(req, res, next) {
  try {
    const id = +req.params.id;
    const { name, role, email, password } = req.body;
    const user = await userService.createOrUpdateUserService(id, {
      name,
      role,
      email,
      password,
    });
    user.password = undefined;
    return res.status(200).json({
      message: "User created or updated successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  getUserByEmail,
  getUserById,
  createOrUpdateUser,
};
