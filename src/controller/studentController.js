const studentService = require("../service/studentService");

const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({
      status: "success",
      message: "All students retrieved successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    res.status(200).json({
      status: "success",
      student,
    });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await studentService.getStudentHistory(id);
    res.status(200).json({
      status: "success",
      message: "History retrieved successfully",
      history,
    });
  } catch (error) {
    next(error);
  }
};

const getActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await studentService.getActivity(id);
    res.status(200).json({
      status: "success",
      message: "Activity retrieved successfully",
      activity,
    });
  } catch (error) {
    next(error);
  }
};

const pointRequest = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const payload = {
      ...req.body,
      // fallback userId or studentId
      userId: req.body.userId || (req.user && req.user.id),
      studentId: studentId ? Number(studentId) : undefined,
    };

    const requestData = await studentService.createPointRequest(payload);
    res.status(201).json({
      status: "success",
      message: "Request point berhasil dibuat",
      data: requestData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  getHistory,
  getActivity,
  pointRequest,
};
