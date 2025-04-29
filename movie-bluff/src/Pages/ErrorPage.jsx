import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

function ErrorPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found";
    // ✅ Set 404 response code in the browser (for SEO)
    window.history.replaceState({}, "404 - Not Found", window.location.href);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <NavBar />
      <h1>404 Error</h1>
      <p>Page not found</p>
      <p> Go back to 
        <Link to="/Home" style={{ textDecoration: "none", color: "blue" }}>
          <span/> Home </Link>  
          </p>
        <Footer />
    </div>
  );
}

export default ErrorPage;

