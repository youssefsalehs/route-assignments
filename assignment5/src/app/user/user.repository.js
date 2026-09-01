const prisma = require("../../common/db/db.js");
const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });
};
const upsertUser = async (userId, data) => {
  return await prisma.user.upsert({
    where: { id: userId },
    update: data,
    create: {
      id: userId,
      ...data,
    },
  });
};
module.exports = { findUserById, upsertUser };
