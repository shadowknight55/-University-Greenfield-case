import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session"; // Import express-session
import indexRoutes from "./routes/index.js"; // Import index rout
import authRoutes from "./routes/auth.js"; // Import auth routes
import storeRoutes from "./routes/store.js"; // Import store routes
import sequelize from "./config/database.js"; // Import sequelize instance
import Item from "./models/item.js"; // Import Item model

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware setup
 */
app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Session middleware setup
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
}));

// Logging middleware to track requests
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

/**
 * Route registration
 */
app.use("/", indexRoutes); // Register the index routes
app.use("/auth", authRoutes); // Register auth routes
app.use("/store", storeRoutes); // Register store routes

/**
 * Database connection
 */
sequelize.sync().then(() => {
  console.log("Database connected!");
}).catch(err => {
  console.error("Error syncing database:", err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
