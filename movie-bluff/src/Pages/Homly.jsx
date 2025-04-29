import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingGif from "../assets/loadingGif.gif";
import { VscStarHalf } from "react-icons/vsc";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../Components/Footer.jsx";
import Trending from "../Components/Trending.jsx";
import useFetch from "../Hooks/useFetch.jsx";
import UpComingMovies from "../Components/UpComing.jsx";
import Trailers from "../Components/Trailers.jsx";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const URL = "https://api.themoviedb.org/3";

function Homly() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies, loading, error } = useFetch(url);
  const [userName, setUserName] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const name = userName.toUpperCase();

  // Authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserName(currentUser?.username || "Guest");
    }
  }, [navigate]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle window close
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform logout or cleanup
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      // Optional: Show a confirmation dialog (modern browsers limit customization)
      event.preventDefault();
      event.returnValue = ""; // Triggers a generic "Are you sure?" prompt
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setUrl(`${URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <NavBar />
      <h1 className="text-white text-4xl p-4 cursor-pointer" onClick={handleLogout}>
        Welcome, {name}!
      </h1>
      <div className="wrapper-search px-4">
        <Search onSearch={handleSearch} />
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <img src={LoadingGif} alt="Loading..." width="200" />
          </div>
        )}
        {error && <p className="text-red-300 text-center p-4">{error}</p>}

        {searchTerm && movies?.length > 0 && (
          <p className="text-white text-center p-2">
            {`Results for "${searchTerm}": ${movies.length}`}
          </p>
        )}
        {searchTerm && movies?.length === 0 && !loading && (
          <p className="text-white text-center p-4">No results found for "{searchTerm}"</p>
        )}

        {!searchTerm && (
          <>
            <Trailers />
            <Trending />
            <UpComingMovies />
          </>
        )}

        {movies?.length > 0 && (
          <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {movies.map((movie) => (
              <div className="movie-card bg-gray-800 text-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform" key={movie.id}>
                <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                <p className="text-sm">{movie.release_date?.split("-")[0]}</p>
                <p className="text-sm">Language: {movie.original_language.toUpperCase()}</p>
                <p className="flex items-center text-sm">
                  <VscStarHalf className="mr-1" /> {movie.vote_average.toFixed(1)}
                </p>
                {movie.poster_path ? (
                  <Link to={`/plot?id=${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster w-full h-auto rounded-md mt-2"
                    />
                  </Link>
                ) : (
                  <img
                    src="https://via.placeholder.com/500x750?text=No+Image+Available"
                    alt={movie.title}
                    className="movie-poster w-full h-auto rounded-md mt-2"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {movies?.length === 1 && searchTerm && (
          <div className="single-movie-info mt-6 p-6 bg-gray-100 rounded-lg max-w-2xl mx-auto text-gray-800">
            <h2 className="text-2xl font-bold mb-2">{movies[0].title}</h2>
            <p>Language: {movies[0].original_language.toUpperCase()}</p>
            <p>Release Date: {movies[0].release_date}</p>
            <p>Rating: {movies[0].vote_average.toFixed(1)}</p>
            <p>Vote Count: {movies[0].vote_count}</p>
            {movies[0].poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`}
                alt={movies[0].title}
                className="movie-poster w-full h-auto rounded-md mt-4"
              />
            )}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}

export default Homly;