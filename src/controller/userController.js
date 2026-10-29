const userService = require("../service/userService");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ status: "success", message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    res.status(200).json({ status: "success", message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
