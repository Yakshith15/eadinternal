const express = require("express");
const jwt = require("jsonwebtoken");
const DataEntry = require("../models/DataEntry");
const Topic = require("../models/Topic");
const router = express.Router();
const auth = require("../middleware");

// Data Provider - Add Data Entry
router.post("/data", auth, async (req, res) => {
  if (req.user.role !== "dataProvider"){
    return res.status(403).json({ message: "Unauthorized" });
  }
  // console.log(req.user.role);
  const { topic, dataLink, summary } = req.body;
  // console.log(topic, dataLink, summary);
  const newTopic = new Topic({ topic });
  await newTopic.save();
  const newDataEntry = new DataEntry({
    topic,
    dataLink,
    summary,
    provider: req.user.id,
  });
  console.log(newDataEntry);
  await newDataEntry.save();
  res.json({ message: "Data entry created successfully" });
});

// Researcher - Get Data Entries
router.get("/data", auth, async (req, res) => {
  const dataEntries = await DataEntry.find().populate("provider", "username");
  res.json(dataEntries);

  const topics = await Topic.find();
  console.log(topics);
});

module.exports = router;
