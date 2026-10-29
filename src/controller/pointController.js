const pointService = require("../service/pointService");

const getPointRequest = async (req, res, next) => {
  try {
    const { status, studentId } = req.query;
    const requests = await pointService.getPointRequests({ status, studentId });

    res.status(200).json({
      status: "success",
      message: "Daftar request point berhasil diambil",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const getPointsRequestById = async (req, res, next) => {
  try {
    const id = req.params.id || req.params.requestId || req.params.requsetId;
    const request = await pointService.getPointRequestById(id);

    res.status(200).json({
      status: "success",
      message: "Detail request point berhasil diambil",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const deletePointRequest = async (req, res, next) => {
  try {
    const id = req.params.id || req.params.requestId || req.body.requestId;
    await pointService.deletePointRequest(id);

    res.status(200).json({
      status: "success",
      message: "Request point berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};

const getPointsByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await pointService.getPointsByStudent(studentId);

    res.status(200).json({
      status: "success",
      message: "Total poin mahasiswa berhasil diambil",
      totalPoints: result.totalPoints,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPointHistory = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.query.studentId;
    if (!studentId) {
      return res.status(400).json({
        status: "error",
        message: "Parameter studentId wajib disertakan",
      });
    }

    const history = await pointService.getPointHistory(studentId);

    res.status(200).json({
      status: "success",
      message: "Riwayat poin mahasiswa berhasil diambil",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPointRequest,
  getPointsRequestById,
  deletePointRequest,
  getPointsByStudent,
  getPointHistory,
};
