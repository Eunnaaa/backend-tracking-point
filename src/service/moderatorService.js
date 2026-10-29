const prisma = require("../config/prisma");

const handlePointRequest = async ({ moderatorUserId, requestId, action }) => {
  if (action !== "approve" && action !== "reject") {
    const error = new Error("Action tidak valid. Gunakan 'approve' atau 'reject'");
    error.statusCode = 400;
    throw error;
  }

  const normalizedRequestId = Number(requestId);
  if (isNaN(normalizedRequestId)) {
    const error = new Error("Invalid request point ID");
    error.statusCode = 400;
    throw error;
  }

  // Cek apakah user adalah moderator yang sah
  const moderator = await prisma.user.findUnique({
    where: { id: Number(moderatorUserId) },
    include: { moderator: true },
  });

  if (!moderator || (!moderator.moderator && moderator.role !== "MODERATOR")) {
    const error = new Error("User bukan moderator yang sah");
    error.statusCode = 403;
    throw error;
  }

  const pointRequest = await prisma.requestPoint.findUnique({
    where: { id: normalizedRequestId },
  });

  if (!pointRequest || pointRequest.status !== "pending") {
    const error = new Error("Request point tidak ditemukan atau sudah diproses");
    error.statusCode = 404;
    throw error;
  }

  const updatedStatus = action === "approve" ? "approved" : "rejected";

  const updatedRequest = await prisma.$transaction(async (tx) => {
    const updated = await tx.requestPoint.update({
      where: { id: normalizedRequestId },
      data: { status: updatedStatus },
    });

    if (updatedStatus === "approved") {
      await tx.point.create({
        data: {
          value: pointRequest.points,
          studentId: pointRequest.studentId,
        },
      });

      await tx.history.create({
        data: {
          status: "completed",
          studentId: pointRequest.studentId,
          activityId: pointRequest.activityId,
          requestPointId: pointRequest.id,
          notes: `Disetujui oleh moderator (ID: ${moderator.id})`,
        },
      });
    } else {
      await tx.history.create({
        data: {
          status: "rejected",
          studentId: pointRequest.studentId,
          activityId: pointRequest.activityId,
          requestPointId: pointRequest.id,
          notes: `Ditolak oleh moderator (ID: ${moderator.id})`,
        },
      });
    }

    return updated;
  });

  return {
    status: updatedStatus,
    data: updatedRequest,
  };
};

module.exports = {
  handlePointRequest,
};
