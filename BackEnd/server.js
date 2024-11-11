const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
dotenv.config();
const app = express();
const quizRoutes = require("./routes/quiz");

//   quiz routes
app.use("/api/quizzes", quizRoutes);

// Middleware
app.use(express.json());

// Use auth routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Quiz Builder API");
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
