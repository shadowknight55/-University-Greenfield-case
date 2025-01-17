import express from "express";
import Store from "../models/store.js"; // Import Store model
const router = express.Router();

// Route to create a new store item
router.post("/", async (req, res) => {
  const { item_name, price, quantity } = req.body;
  try {
    const newItem = await Store.create({ item_name, price, quantity });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating store item:", error);
    res.status(500).send("Error creating store item.");
  }
});

export default router;
