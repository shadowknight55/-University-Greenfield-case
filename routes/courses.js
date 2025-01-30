import express from "express";
import Course from "../models/course.js"; // Import Course model
const router = express.Router();

// Route to create a new course with dummy data
router.post("/", async (req, res) => {
  try {
    const courses = [
      { course_name: "Introduction to Programming", description: "Learn the basics of programming.", credits: 3 },
      { course_name: "Database Management", description: "Understand how to manage databases.", credits: 3 },
      { course_name: "Web Development", description: "Build and design websites.", credits: 4 }
    ];

    await Course.bulkCreate(courses); // Insert dummy data
    res.status(201).send("Courses created successfully!");
  } catch (error) {
    console.error("Error creating courses:", error);
    res.status(500).send("Error creating courses.");
  }
});

export default router;
