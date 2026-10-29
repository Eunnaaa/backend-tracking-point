const prisma = require("../config/prisma");

const getAllStudents = async () => {
  return await prisma.student.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      },
      points: true,
    },
  });
};

const getStudentById = async (id) => {
  const student = await prisma.student.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      },
      points: true,
      requestPoints: true,
      histories: true,
    },
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

const getStudentHistory = async (studentId) => {
  return await prisma.history.findMany({
    where: { studentId: Number(studentId) },
    include: {
      activity: true,
      requestPoint: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getActivity = async (id) => {
  const activity = await prisma.activity.findUnique({
    where: { id: Number(id) },
  });

  if (!activity) {
    const error = new Error("Activity not found");
    error.statusCode = 404;
    throw error;
  }

  return activity;
};

const createPointRequest = async ({
  userId,
  pointsRequested,
  description,
  nim,
  name,
  college,
  major,
  activityId,
}) => {
  if (!userId) {
    const error = new Error("userId tidak boleh kosong");
    error.statusCode = 400;
    throw error;
  }

  if (!pointsRequested) {
    const error = new Error("pointsRequested tidak boleh kosong");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    include: { student: true },
  });

  if (!user || !user.student) {
    const error = new Error("User bukan mahasiswa atau profil mahasiswa belum dibuat");
    error.statusCode = 400;
    throw error;
  }

  const student = user.student;

  const pointRequest = await prisma.requestPoint.create({
    data: {
      studentId: student.id,
      points: Number(pointsRequested),
      nim: nim ? Number(nim) : student.nim,
      name: name || student.name,
      college: college || student.college,
      major: major || student.major,
      description: description || "-",
      status: "pending",
      ...(activityId && { activityId: Number(activityId) }),
    },
  });

  return pointRequest;
};

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentHistory,
  getActivity,
  createPointRequest,
};
