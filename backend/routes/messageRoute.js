// backend/routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message"); // Assuming you have a Message model

// POST endpoint to save a message
router.post("/send", async (req, res) => {
  const { roomId, text, sender } = req.body;

  try {
    const message = new Message({
      roomId,
      text,
      sender,
      timestamp: new Date(),
    });

    await message.save();

    res.status(201).json({ message: "Message saved successfully", message });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Failed to save message" });
  }
});

module.exports = router;
