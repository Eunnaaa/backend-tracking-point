const { verifyToken } = require("../util/tokenUtils");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Akses ditolak. Token autentikasi tidak ditemukan atau tidak valid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: "Token tidak valid atau telah kedaluwarsa",
      error: error.message,
    });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Akses ditolak. Anda tidak memiliki izin untuk tindakan ini",
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
