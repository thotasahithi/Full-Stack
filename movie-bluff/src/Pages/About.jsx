import React from "react";
import { VscTwitter } from "react-icons/vsc";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const About = () => {
  return (
  <>
      <NavBar />
      <div style={{ 
        minHeight: "calc(100vh - 80px)",
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",  
      }}>
        <p>This is a movie search app where you can find movie details and plots.</p>
        <p>Version: 1.0.0</p>
        <p 
          style={{ 
            cursor: "pointer", 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "5px" 
          }} 
          onClick={() => window.open("https://x.com/pranaysinguluri")}
        >
          <VscTwitter /> Follow us on Twitter
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;