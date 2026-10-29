const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      student: true,
      moderator: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      student: true,
      moderator: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const createUser = async (data) => {
  const userData = { ...data };
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateUser = async (id, data) => {
  const updateData = { ...data };
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
