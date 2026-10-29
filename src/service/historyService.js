const prisma = require("../config/prisma");

const getAllHistories = async (filters = {}) => {
  const where = {};
  if (filters.studentId) {
    where.studentId = Number(filters.studentId);
  }
  if (filters.status) {
    where.status = filters.status;
  }

  return await prisma.history.findMany({
    where,
    include: {
      student: true,
      activity: true,
      requestPoint: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getHistoryById = async (id) => {
  const history = await prisma.history.findUnique({
    where: { id: Number(id) },
    include: {
      student: true,
      activity: true,
      requestPoint: true,
    },
  });

  if (!history) {
    const error = new Error("History tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return history;
};

module.exports = {
  getAllHistories,
  getHistoryById,
};
