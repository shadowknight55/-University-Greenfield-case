import express from "express";
import Item from "../models/item.js"; // Import Item model
import Student from "../models/student.js"; // Import Student model
const router = express.Router();

// Route to render the store page
router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll(); // Fetch all items from the database
    res.render("store", { items }); // Render the store page with the items
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items.");
  }
});

// New route to handle item purchases
router.post("/purchase", async (req, res) => {
  const { itemId, itemPrice } = req.body; // Get itemId and itemPrice from the request
  const studentId = req.session.studentId; // Get studentId from the session

  try {
    const student = await Student.findByPk(studentId);
    const item = await Item.findByPk(itemId);

    if (student && item) {
      if (item.quantity > 0) {
        // Update the item's quantity
        item.quantity -= 1;
        await item.save();

        // Update the student's balance
        student.balance -= parseFloat(itemPrice);
        await student.save();

        res.status(200).send("Purchase successful.");
      } else {
        res.status(400).send("Item is out of stock.");
      }
    } else {
      res.status(404).send("Student or item not found.");
    }
  } catch (error) {
    console.error("Error processing purchase:", error);
    res.status(500).send("Error processing purchase.");
  }
});

export default router; // Use ES6 export
