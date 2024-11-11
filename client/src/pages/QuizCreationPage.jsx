import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizCreationPage = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", "", ""],
      correctAnswers: [],
      isMultipleChoice: false,
    },
  ]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeQuestion = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleChangeOptions = (index, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", "", ""],
        correctAnswers: [],
        isMultipleChoice: false,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://mern-quiz-backend-1.onrender.com/api/quizzes",
        { title, questions },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (err) {
      setError("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmitQuiz}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {questions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <div>
              <label>Question Text:</label>
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleChangeQuestion(index, e)}
                required
              />
            </div>

            <div>
              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleChangeOptions(index, optionIndex, e)}
                  required
                />
              ))}
            </div>

            <div>
              <label>Correct Answers:</label>
              <input
                type="text"
                value={question.correctAnswers}
                onChange={(e) => handleChangeQuestion(index, e)}
                name="correctAnswers"
                placeholder="Comma separated values"
                required
              />
            </div>

            <div>
              <label>
                Multiple Choice:
                <input
                  type="checkbox"
                  checked={question.isMultipleChoice}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].isMultipleChoice = e.target.checked;
                    setQuestions(updatedQuestions);
                  }}
                />
              </label>
            </div>

            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreationPage;
