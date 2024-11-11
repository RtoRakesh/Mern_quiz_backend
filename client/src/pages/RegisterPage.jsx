import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://mern-quiz-backend-1.onrender.com/api/auth/register",
        {
          email,
          password,
        }
      );
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Create a password" />
          <button type="submit">Register</button>
        </form>
        <div className="link-container">
          <a href="/login">Already have an account? Login here</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
