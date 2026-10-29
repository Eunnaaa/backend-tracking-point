const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const { generateToken } = require("../util/tokenUtils");

const registerUser = async ({ username, email, password }) => {
  if (!email || !password) {
    const error = new Error("Email dan password wajib diisi");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error("Email sudah terdaftar");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: username || "default_username",
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUser;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email dan password wajib diisi");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      student: true,
      moderator: true,
    },
  });

  if (!user) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  // Jangan kembalikan hash password ke client
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
