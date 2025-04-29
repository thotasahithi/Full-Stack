import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch"; // ✅ Import the custom hook
import "../assets/UpComing.css"; // ✅ Import styles

const url = "https://api.themoviedb.org/3/movie/upcoming"

const UpComingMovies = () => {
  const { data: movies, loading, error } = useFetch(url); // ✅ Use the custom hook to fetch data
  // const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const navigate = useNavigate(); // ✅ For navigation
  
    // ✅ Filter movies: Show only movies releasing after today
    const filteredMovies = useMemo(() => {
      if (!movies) return [];
      const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
      return movies.filter((movie) => movie.release_date > today);
    }, [movies]);
  
    if (loading) return <p className="upcoming-loading">Loading...</p>;
    if (error) return <p className="upcoming-error">Error: {error}</p>;
    if (filteredMovies.length === 0) return <p>No upcoming movies available.</p>;
  
    return (
      <div className="upcoming-container">
        <h1 className="upcoming-title">Upcoming Movies</h1>
        <div className="upcoming-movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id} // ✅ Unique key for each movie
              className="upcoming-movie-card"
              onClick={() => navigate(`/plot?id=${movie.id}`)} // ✅ Navigate on click
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="upcoming-movie-image"
              />
             
              <p className="upcoming-movie-title">{movie.title}</p>
              <p className="upcoming-movie-year">
                {movie.release_date?.split("-")[0] || "Unknown"}
              </p>
              <p className="upcoming-rating">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
              </p>
              <p className="upcoming-popularity">
                🔥 Popularity: {movie.popularity ? movie.popularity.toFixed(0) : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default UpComingMovies;
  