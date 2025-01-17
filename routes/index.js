import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Root route accessed"); // Log to confirm access
  res.render("index"); // Render the main page
});

export default router;
