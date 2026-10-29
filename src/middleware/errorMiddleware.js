const notFound = (req, res, next) => {
  const error = new Error(`Rute tidak ditemukan - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Terjadi kesalahan internal pada server";

  // Prisma error handling
  if (err.code === "P2002") {
    statusCode = 409;
    const target = err.meta?.target ? ` pada kolom ${err.meta.target}` : "";
    message = `Data sudah ada (duplikasi)${target}`;
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Data yang dicari tidak ditemukan";
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
