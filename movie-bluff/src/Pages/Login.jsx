// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Corrected import
import useAuth from "../Hooks/UseAuth.jsx"; // ✅ Fixed import path
import NavBar from "../Components/NavBar"; // ✅ Fixed import path
import { Link } from "react-router-dom"; // ✅ Corrected import for Link
import Footer from "../Components/Footer.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
};
export default Login;
