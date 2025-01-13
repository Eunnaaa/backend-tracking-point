const prisma = require("../config/prisma");

const getPointRequest = async (req, res) => {
  const { status } = req.query;

  try {
    const requests = await prisma.requestPoint.findMany({
      where: status ? { status } : {},
      include: { student: true, activity: true },
    });
    res.status(200).json({
      message: "Daftar request point berhasil diambil",
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching point requests:", error);
    res.status(500).json({
      message: "Error fetching point requests",
      error: error.message,
    });
  }
};

const getPointsRequestById = async (req, res) => {
  const { requsetId } = req.params;

  try {
    const request = await prisma.requestPoint.findUnique({
      where: { id: requsetId },
      include: { student: true, activity: true },
    });

    if (!request) {
      return res.status(404).json({
        message: "Request point tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail request point berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching point request by id:", error);
    res.status(500).json({
      message: "Error fetching point request by id",
      error: error.message,
    });
  }
};

const deletePointRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await prisma.requestPoint.findUnique({
      where: { id: requestId },
    });

    if (!request || request.status !== "pending") {
      return res.status(400).json({
        message: "Request point tidak ditemukan atau sudah tidak pending",
      });
    }

    await prisma.requestPoint.delete({
      where: { id: requestId },
    });

    res.status(200).json({
      message: "Request point berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({
      message: "Error deleting request",
    });
  }
};

const getPointsByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const points = await prisma.point.aggregate({
      _sum: { value: true },
      where: { studentId: parseInt(studentId) },
    });

    res.status(200).json({
      message: "Total poin mahasiswa berhasil diambil",
      totalPoints: points._sum.value || 0,
    });
  } catch (error) {
    console.error("Error fetching total points:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil total poin",
      error: error.message,
    });
  }
};

// Mengambil riwayat semua poin yang diperoleh oleh seorang mahasiswa
const getPointHistory = async (req, res) => {
  const { studentId } = req.params;

  try {
    const history = await prisma.history.findMany({
      where: { studentId: parseInt(studentId) },
      include: { activity: true, requestPoint: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: "Riwayat poin mahasiswa berhasil diambil",
      data: history,
    });
  } catch (error) {
    console.error("Error fetching point history:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil riwayat poin",
      error: error.message,
    });
  }
};

module.exports = {
  getPointRequest,
  getPointsRequestById,
  deletePointRequest,
  getPointHistory,
  getPointsByStudent,
};
