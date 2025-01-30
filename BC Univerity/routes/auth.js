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
      req.session.studentName = student.firstname; // Set studentName in session
      req.session.studentId = student.id; // Set studentId in session
      res.render("student_dashboard", { 
        studentName: student.firstname, 
        studentId: student.id, // Pass student's ID
        balance: student.balance // Pass current balance
      }); // Pass student's name and ID
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
  const { firstname, lastname, email, phone, password, terms } = req.body;
  if (!terms) {
    return res.status(400).send("You must agree to the terms and conditions.");
  }
  try {
    const newStudent = await Student.create({ firstname, lastname, email, phone, password });
    console.log("Student registered:", newStudent); // Log the new student
    res.redirect("login"); // Redirect to the login page
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send("Error creating student.");
  }
});

// New route to add money to the student's balance
router.post("/add-money", async (req, res) => {
  const { studentId, amount } = req.body; // Assuming studentId is sent in the request
  try {
    const student = await Student.findByPk(studentId);
    if (student) {
      const parsedAmount = parseFloat(amount);
      if (parsedAmount > 0) { // Validate that the amount is positive
        student.balance += parsedAmount; // Update the balance
        await student.save(); // Save the updated student
        res.status(200).send("Balance updated successfully.");
      } else {
        res.status(400).send("Invalid amount.");
      }
    } else {
      res.status(404).send("Student not found.");
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).send("Error updating balance.");
  }
});

export default router; // Use ES6 export
