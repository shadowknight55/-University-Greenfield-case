import express from "express";
import Student from "../models/student.js"; // Import Student model
const router = express.Router();



// Login route
router.get("/login", (req, res) => {
  res.render("login");
});


// Post route for handling login logic
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email, password } });
    if (student) {
      console.log("Student logged in:", student); // Log the logged-in student
      res.render("student_dashboard");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in.");
  }
});

// Register route
router.get("/register", (req, res) => {
  res.render("register");
});

// Post route for handling registration
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  try {
    const newStudent = await Student.create({ firstname, lastname, email, phone, password });
    console.log("Student registered:", newStudent); // Log the new student
    res.redirect("login"); // Redirect to the login page
    //res.json (newStudent); // Redirect to the student dashboard
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send("Error creating student.");
  }
});



export default router; // Use ES6 export
