const roleService = require("../service/roleService");

const assignRole = async (req, res, next) => {
  try {
    const result = await roleService.assignRole(req.body);
    res.status(201).json({
      status: "success",
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  assignRole,
};
