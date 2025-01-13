const prisma = require("../config/prisma");
const { generateToken } = require("../util/tokenUtils");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) throw new Error("User not found");

  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return user;
};

const register = async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error({ message: "Error logging in", error });
    res.status(401).json({
      message: "Invalid email or password",
      error,
    });
  }
};

const logout = (req, res) => {
  res.status(200).json({ mesagge: "Logout Successful" });
};

module.exports = { register, login, logout };
