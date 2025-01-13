const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const studentRouter = require("./routes/studentRouter");
const authRouter = require("./routes/authRouter");
const moderatorRouter = require("./routes/moderatorRouter");
const roleRouter = require("./routes/roleRouter");
const pointRouter = require("./routes/pointRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Dependencies
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api", (req, res) => {
  res.send("API Ready to use!");
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/api/request", pointRouter);
app.use("/api/students", studentRouter);
app.use("/api/moderator", moderatorRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
