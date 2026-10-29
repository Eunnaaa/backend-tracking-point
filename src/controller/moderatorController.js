const moderatorService = require("../service/moderatorService");

const handlePointRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { moderatorId, action } = req.body;

    const result = await moderatorService.handlePointRequest({
      moderatorUserId: moderatorId || (req.user && req.user.id),
      requestId: id,
      action,
    });

    res.status(200).json({
      status: "success",
      message: `Request point telah ${result.status === "approved" ? "disetujui" : "ditolak"}`,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handlePointRequest,
};
