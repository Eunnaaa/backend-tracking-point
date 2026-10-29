const prisma = require("../config/prisma");

const getAllActivities = async () => {
  return await prisma.activity.findMany({
    orderBy: { date: "desc" },
  });
};

const getActivityById = async (id) => {
  const activity = await prisma.activity.findUnique({
    where: { id: Number(id) },
    include: {
      requestPoints: true,
      histories: true,
    },
  });

  if (!activity) {
    const error = new Error("Activity tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return activity;
};

const createActivity = async ({ title, description, date }) => {
  if (!title || !date) {
    const error = new Error("Title dan date wajib diisi");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.activity.create({
    data: {
      title,
      description,
      date: new Date(date),
    },
  });
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
};
