const prisma = require("../config/prisma");
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (req, res) => {
  return await prisma.user.create({
    data,
  });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUser, createUser, updateUser, deleteUser };
