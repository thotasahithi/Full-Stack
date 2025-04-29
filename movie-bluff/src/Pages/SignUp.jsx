import React, { useState } from "react";
import useAuth from "../Hooks/UseAuth.jsx";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email regex
  };

  const validateUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,15}$/.test(username); // Only letters, numbers, and underscores, 3-15 chars
  };

  const validatePassword = (password) => {
    return password.length >= 6; // At least 6 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validateUsername(username)) {
      setError("Username must be 3-15 characters long and contain only letters, numbers, or underscores.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await signup(email, username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <form className="signup-container" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          id="userEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        {error && <p style={{ color: "red", alignItems: "center"}}>{error}</p>}
      </form>
      
    </div>
  );
};

export default SignUp;
