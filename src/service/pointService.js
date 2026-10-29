const prisma = require("../config/prisma");

const getPointRequests = async (filters = {}) => {
  const where = {};
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.studentId) {
    where.studentId = Number(filters.studentId);
  }

  return await prisma.requestPoint.findMany({
    where,
    include: {
      student: true,
      activity: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getPointRequestById = async (id) => {
  const request = await prisma.requestPoint.findUnique({
    where: { id: Number(id) },
    include: {
      student: true,
      activity: true,
      histories: true,
    },
  });

  if (!request) {
    const error = new Error("Request point tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return request;
};

const deletePointRequest = async (id) => {
  const normalizedId = Number(id);
  const request = await prisma.requestPoint.findUnique({
    where: { id: normalizedId },
  });

  if (!request) {
    const error = new Error("Request point tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  if (request.status !== "pending") {
    const error = new Error("Hanya request point berstatus 'pending' yang dapat dihapus");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.requestPoint.delete({
    where: { id: normalizedId },
  });
};

const getPointsByStudent = async (studentId) => {
  const normalizedStudentId = Number(studentId);

  const points = await prisma.point.aggregate({
    _sum: { value: true },
    where: { studentId: normalizedStudentId },
  });

  return {
    studentId: normalizedStudentId,
    totalPoints: points._sum.value || 0,
  };
};

const getPointHistory = async (studentId) => {
  const normalizedStudentId = Number(studentId);

  return await prisma.history.findMany({
    where: { studentId: normalizedStudentId },
    include: {
      activity: true,
      requestPoint: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  getPointRequests,
  getPointRequestById,
  deletePointRequest,
  getPointsByStudent,
  getPointHistory,
};
