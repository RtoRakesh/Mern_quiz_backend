import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz Builder</h1>
      <p>Create quizzes or take quizzes shared with you!</p>
      <a href="/create-quiz">Create a Quiz</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  );
};

export default HomePage;
