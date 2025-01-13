const prisma = require("../config/prisma");

const getAllActivities = async () => {
  return await prisma.activity.findMany();
};

module.exports = {
  getAllActivities,
};
