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
async function getExistingUsers(userIds) {
  return await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true },
  });
}
module.exports = { findUserById, upsertUser, getExistingUsers };
