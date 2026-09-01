const prisma = require("../../common/db/db.js");
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
const createNewUser = async ({ name, email, password, role }) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
};
module.exports = {
  findUserByEmail,
  createNewUser,
};
