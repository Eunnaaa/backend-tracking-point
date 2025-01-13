const prisma = require("../config/prisma");

const handlePointRequestByModerator = async (req, res) => {
  const { moderatorId, action } = req.body;
  const { id } = req.params;

  try {
    if (action !== "approve" && action !== "reject") {
      return res
        .status(400)
        .json({ message: "Action tidak valid (approve/reject)" });
    }

    const moderator = await prisma.user.findUnique({
      where: { id: moderatorId },
      include: { moderator: true },
    });

    if (!moderator || !moderator.moderator) {
      return res.status(403).json({ message: "User bukan moderator" });
    }

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid ID parameter" });
    }

    const pointRequest = await prisma.requestPoint.findUnique({
      where: { id: Number(id) },
    });

    if (!pointRequest || pointRequest.status !== "pending") {
      return res.status(404).json({
        message: "Request point tidak ditemukan atau sudah diproses",
      });
    }

    const updatedStatus = action === "approve" ? "approved" : "rejected";
    const updatedRequest = await prisma.requestPoint.update({
      where: { id: pointRequest.id },
      data: { status: updatedStatus },
    });

    if (updatedStatus === "approved") {
      await prisma.point.create({
        data: {
          value: pointRequest.points,
          studentId: pointRequest.studentId,
        },
      });

      await prisma.history.create({
        data: {
          status: "completed",
          student: { connect: { id: pointRequest.studentId } },
          activity: pointRequest.activityId
            ? { connect: { id: pointRequest.activityId } }
            : undefined,
          requestPoint: { connect: { id: pointRequest.id } },
        },
      });
    }

    res.status(200).json({
      message: `Request point telah ${
        updatedStatus === "approved" ? "disetujui" : "ditolak"
      }`,
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error handling point request:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memproses request",
      error: error.message,
    });
  }
};

module.exports = { handlePointRequestByModerator };
