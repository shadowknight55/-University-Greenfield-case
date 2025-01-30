import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Root route accessed"); // Log to confirm access
  res.render("index"); // Render the main page
});

// New route for student dashboard
router.get("/student_dashboard", (req, res) => {
  const studentName = req.session.studentName; // Assuming studentName is stored in session
  res.render("student_dashboard", { studentName }); // Render the student dashboard page with studentName
});

export default router;
