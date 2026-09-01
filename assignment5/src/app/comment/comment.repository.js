const prisma = require("../../common/db/db.js");
async function bulkCreateComments(data) {
  return await prisma.comment.createManyAndReturn({
    data,
  });
}
module.exports = {
  bulkCreateComments,
};
