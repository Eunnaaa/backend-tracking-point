const prisma = require("../config/prisma");

const getActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await prisma.activity.findMany({
      where: { id: Number(id) },
    });

    res
      .status(201)
      .json({ message: "Activity retrieved successfully", activity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await prisma.history.findMany({
      where: { studentId: parseInt(id) },
      orderBy: { createdAt: "desc" },
    });

    res.json({ message: "History retrieved successfully", history });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found in the database" });
    }

    return res.status(200).json({
      message: "All students retrieved successfully",
      data: students,
    });
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const pointRequest = async (req, res) => {
  const { userId, pointsRequested, description, nim, name, college, major } =
    req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId tidak boleh kosong" });
  }

  if (!pointsRequested) {
    return res
      .status(400)
      .json({ message: "pointsRequested tidak boleh kosong" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { student: true },
    });

    if (!user || !user.student) {
      return res.status(400).json({ message: "User bukan mahasiswa" });
    }

    const pointRequest = await prisma.requestPoint.create({
      data: {
        studentId: user.student.id,
        points: pointsRequested,
        nim: nim,
        name: name,
        college: college,
        major: major,
        description: description,
        status: "pending",
      },
    });

    res
      .status(201)
      .json({ message: "Request point berhasil dibuat", data: pointRequest });
  } catch (err) {
    console.error("Error requesting point:", err); // Menggunakan 'err' yang sudah didefinisikan
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudent,
  getHistory,
  getActivity,
  getAllStudents,
  pointRequest,
};
