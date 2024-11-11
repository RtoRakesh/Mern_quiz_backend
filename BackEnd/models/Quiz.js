const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswers: [
        {
          type: String,
          required: true,
        },
      ],
      isMultipleChoice: {
        type: Boolean,
        default: false,
      },
    },
  ],
  permalink: {
    type: String,
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
