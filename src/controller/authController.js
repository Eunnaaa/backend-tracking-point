const authService = require("../service/authService");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser({ username, email, password });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logout Successful",
  });
};

module.exports = {
  register,
  login,
  logout,
};
