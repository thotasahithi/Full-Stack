import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timerDuration = 120000; // 2 minutes
  let logoutTimer = null;

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    removeActivityListener();
    alert("Logged out due to inactivity.");
    navigate("/login");
  };

  const resetTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
      logout();
    }, timerDuration);
  };

  const startActivityListener = () => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
  };

  const removeActivityListener = () => {
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    clearTimeout(logoutTimer); // Clear the logout timer
  };

  const signup = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Django expects only username & password now
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
      console.error("Signup error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // // Set login status (optional localStorage)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify({ username }));

      alert("Login successful!");
      navigate("/home");
      startActivityListener(); // Assuming this starts your app's main activity
    } catch (err) {
      alert(err.message);
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () =>
    localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated()) {
      startActivityListener();
    }
    return () => removeActivityListener();
  }); // Only include isAuthenticated here since startActivityListener and removeActivityListener are stable functions

  return { signup, login, logout, loading, isAuthenticated };
};

export default useAuth;
