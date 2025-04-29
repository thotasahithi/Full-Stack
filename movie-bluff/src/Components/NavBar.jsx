import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import "../assets/NavBar.css"; // Import the separate CSS file
import { Nav } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { BiSolidMoviePlay } from "react-icons/bi";


const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <Nav className="navbar">
      <div className="logo">
        <Link to="/home" className="link-bold" onClick={() => window.scrollTo(0, 0)}>
        <BiSolidMoviePlay size={20} /> <span/> Movie Bluff
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/home" onClick={() => window.scrollTo(0, 0)} className="nav-link">
          <VscHome size={20} /> Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        {isAuthenticated && (
          <Link to="/Profile" className="nav-link">
          <CgProfile size={20} />
            Profile
          </Link>
        )}
      </div>
    </Nav>
  );
};

export default NavBar;
