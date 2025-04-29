import React from "react";
import { useLocation } from "react-router-dom";


const Welcome = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const time = new Date();
  console.log(time.toLocaleTimeString()); // Logs the current time in HH:MM:SS format
      
  return (
    <div style={{ justifyContent: "center", marginTop: "50px" }}>
      <h1 style={{paddingLeft: "40px"}}> Welcome to Movie Bluff, {username}!</h1>
      <search/>
    </div>
  );
};

export default Welcome;
