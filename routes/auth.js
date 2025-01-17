import express from "express";
import Student from "../models/student.js"; // Import Student model
const router = express.Router();

// Register route
router.get("/register", (req, res) => {
  res.render("register");
});

// Login route
router.get("/login", (req, res) => {
  res.render("login");
});

// Post route for handling registration
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  try {
    const newStudent = await Student.create({ firstname, lastname, email, phone, password });
    res.redirect("/students/dashboard"); // Redirect to the student dashboard
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send("Error creating student.");
  }
});

// Post route for handling login logic
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email, password } });
    if (student) {
      // Redirect to the student dashboard if login is successful
      res.redirect("/students/dashboard");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in.");
  }
});

export default router; // Use ES6 export
