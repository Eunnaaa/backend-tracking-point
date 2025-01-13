const { verifyToken } = require("../util/tokenUtils");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (eror) {
      res.status(403).json({ mesagge: "invalid Token", eror });
    }
  }
};

module.exports = { authenticate };
