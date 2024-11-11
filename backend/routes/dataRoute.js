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
// const dataEntries = await DataEntry.find().populate("provider", "username");
// res.json(dataEntries);

router.get("/data", auth, async (req, res) => {
  const topics = await Topic.find();
  console.log(topics);
  res.json(topics);

});


// router.get("/data/:topic", auth, async (req, res) => {
  
// })


router.get("/data/:topic", auth, async (req, res) => {
  try {
    const { topic } = req.params; // Extract the topic from the URL parameter

    // Fetch DataEntries where the topic matches the provided parameter
    const dataEntries = await DataEntry.find({ topic: topic }).populate(
      "provider",
      "username"
    );

    if (!dataEntries.length) {
      return res
        .status(404)
        .json({ message: "No data entries found for this topic" });
    }

    // Return the fetched data entries as a response
    res.json(dataEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
