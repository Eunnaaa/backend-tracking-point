const prisma = require("../config/prisma");

const assignRole = async ({ userId, role, name, college, major, code, email, nim }) => {
  if (!userId || !role || !name || !college || !major || !email) {
    const error = new Error("Semua data (userId, role, name, college, major, email) harus diberikan");
    error.statusCode = 400;
    throw error;
  }

  const normalizedUserId = Number(userId);

  if (role === "STUDENT" && !nim) {
    const error = new Error("Data nim harus diberikan untuk role 'STUDENT'");
    error.statusCode = 400;
    throw error;
  }

  if (role === "MODERATOR" && !code) {
    const error = new Error("Data code harus diberikan untuk role 'MODERATOR'");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { id: normalizedUserId },
  });

  if (!user) {
    const error = new Error("User tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  if (role === "STUDENT") {
    const studentExist = await prisma.student.findUnique({
      where: { userId: normalizedUserId },
    });

    if (studentExist) {
      const error = new Error("User sudah memiliki peran sebagai mahasiswa");
      error.statusCode = 400;
      throw error;
    }

    // Gunakan transaction agar pembuatan profile student dan update role user sinkron
    const result = await prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          userId: normalizedUserId,
          name,
          nim: Number(nim),
          college,
          major,
          email,
        },
      });

      await tx.user.update({
        where: { id: normalizedUserId },
        data: { role: "STUDENT" },
      });

      return student;
    });

    return {
      message: "Peran mahasiswa berhasil ditambahkan",
      data: result,
    };
  }

  if (role === "MODERATOR") {
    const moderatorExist = await prisma.moderator.findUnique({
      where: { userId: normalizedUserId },
    });

    if (moderatorExist) {
      const error = new Error("User sudah memiliki peran sebagai moderator");
      error.statusCode = 400;
      throw error;
    }

    // Gunakan transaction agar pembuatan profile moderator dan update role user sinkron
    const result = await prisma.$transaction(async (tx) => {
      const moderator = await tx.moderator.create({
        data: {
          userId: normalizedUserId,
          name,
          college,
          major,
          code: Number(code),
          email,
        },
      });

      await tx.user.update({
        where: { id: normalizedUserId },
        data: { role: "MODERATOR" },
      });

      return moderator;
    });

    return {
      message: "Peran moderator berhasil ditambahkan",
      data: result,
    };
  }

  const error = new Error("Role tidak valid. Pilih 'STUDENT' atau 'MODERATOR'");
  error.statusCode = 400;
  throw error;
};

module.exports = {
  assignRole,
};
