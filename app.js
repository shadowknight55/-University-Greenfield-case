import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import studentRoutes from "./routes/students.js"; // Import student routes
import indexRoutes from "./routes/index.js"; // Import index routes
import authRoutes from "./routes/auth.js"; // Import auth routes
import sequelize from "./config/database.js"; // Import sequelize instance

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRoutes); // Register the index routes
app.use("/auth", authRoutes); // Register auth routes
app.use("/student", studentRoutes); // Register student routes

// Database connection
sequelize.sync().then(() => {
  console.log("Database connected!");
}).catch(err => {
  console.error("Error syncing database:", err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
