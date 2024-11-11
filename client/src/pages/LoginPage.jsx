import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mern-quiz-backend-1.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
          <button type="submit">Login</button>
          <div className="error-message">Invalid email or password</div>
        </form>
        <div className="link-container">
          <a href="/register">Don't have an account? Register here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
