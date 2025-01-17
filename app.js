// app.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);

// Database connection
sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
