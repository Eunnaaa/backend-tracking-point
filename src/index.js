const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const roleRouter = require("./routes/roleRouter");
const studentRouter = require("./routes/studentRouter");
const moderatorRouter = require("./routes/moderatorRouter");
const pointRouter = require("./routes/pointRouter");
const activitiesRouter = require("./routes/activitiesRouter");
const historyRouter = require("./routes/historyRouter");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const prisma = require("./config/prisma");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check
app.get("/api", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Tracking Point API is ready to use!",
    timestamp: new Date().toISOString(),
  });
});

// App Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/students", studentRouter);
app.use("/api/moderator", moderatorRouter);
app.use("/api/request", pointRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/histories", historyRouter);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Server Startup
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown
const handleShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Database disconnected. Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

module.exports = app;
