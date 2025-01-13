const prisma = require("../config/prisma");

const getAllHistories = async () => {
  return await prisma.history.findMany();
};

module.exports = {
  getAllHistories,
};
