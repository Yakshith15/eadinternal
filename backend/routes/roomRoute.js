// routes/roomRoute.js
const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

// Route to create a new room
router.post("/create", async (req, res) => {
  const { name, topic, password } = req.body;
  try {
    const room = new Room({ name, topic, password });
    await room.save();
    res.status(201).json({ roomId: room._id, message: "Room created successfully" }); // Include roomId in response
  } catch (error) {
    res.status(400).json({ error: "Room creation failed" });
  }
});


// Route to join an existing room
router.post("/join", async (req, res) => {
  const { name, password } = req.body;
  try {
    const room = await Room.findOne({ name });
    if (room && room.password === password) {
      res.status(200).json(room);
    } else {
      res.status(403).json({ error: "Invalid room or password" });
    }
  } catch (error) {
    res.status(400).json({ error: "Room join failed" });
  }
});

// Route to get all available rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

module.exports = router;
