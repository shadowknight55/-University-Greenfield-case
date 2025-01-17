import express from "express";
import Student from "../models/student.js"; // Import Student model
const router = express.Router();

// Route to create a new student
router.post("/", async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  try {
    const newStudent = await Student.create({ firstname, lastname, email, phone, password });
    res.status(201).json(newStudent); // Respond with the created student
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send("Error creating student.");
  }
});

// Route to render the student dashboard
router.get("/dashboard", (req, res) => {
  res.render("student"); // Render the student dashboard
});

export default router;
