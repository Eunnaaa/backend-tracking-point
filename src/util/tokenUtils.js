const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET || defaultsecret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || defaultsecret);
};

module.exports = { generateToken, verifyToken };
