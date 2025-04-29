import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { CgProfile } from "react-icons/cg";


const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("No Email");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!authStatus) {
      navigate("/home"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
      setUserName(currentUser?.username || "Guest");
      setUserEmail(currentUser?.email || "No Email");
    }
  }, [navigate]);

  const handleDelete = () => {
    console.log("Before deletion:", localStorage.getItem("currentUser"));
  
    localStorage.removeItem("currentUser"); 
    localStorage.removeItem("isAuthenticated");
  
    console.log("After deletion:", localStorage.getItem("currentUser")); // Should be null
    localStorage.clear();
    setIsAuthenticated(false);
    setUserName("Guest");
    setUserEmail("No Email");
    alert("Your account has been deleted successfully.");
    navigate("/login");
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser"); 
    setIsAuthenticated(false);
    setUserName("Guest");
    setUserEmail("No Email");
    navigate("/home"); 
  };

  return (
    <div>
      <NavBar />
      <div  style={styles.profileContainer}>
      <CgProfile />
        <h2>User Profile</h2>
        <div style={styles.profileInfo}>
          <label>Email: {userEmail}</label>
          <br />
          <label>Username: {userName}</label>
        </div>
        {isAuthenticated ? (
          <>
            <button style={styles.logoutButton} type="button" onClick={handleLogout}>
              Logout
            </button>
            <button style={styles.deleteButton} type="button" onClick={handleDelete}>
              Delete Account
            </button>
          </>
        ) : (
          <button style={styles.loginButton} type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    marginTop: "50px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    width: "300px",
    margin: "auto",
  },
  profileInfo: {
    marginBottom: "20px",
    textAlign: "center",
  },
  loginButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Profile;
