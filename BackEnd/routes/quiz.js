// server/routes/quiz.js
const express = require("express");
const Quiz = require("../models/Quiz");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Create a new quiz
router.post("/", authenticateUser, async (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = new Quiz({
    title,
    questions,
    author: req.userId,
    permalink: `${title.replace(/\s+/g, "-").toLowerCase()}`,
  });

  try {
    await newQuiz.save();
    res.status(201).json({ msg: "Quiz created successfully", quiz: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
