const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// CREATE REQUEST
router.post("/", async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newRequest = new Request({
      title,
      description,
      createdBy
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request added",
      request: newRequest
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL REQUESTS
router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

module.exports = router;