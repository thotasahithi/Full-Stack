import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch"; // ✅ Import the custom hook
import "../assets/Trending.css"; // ✅ Import styles

 const url = "https://api.themoviedb.org/3/movie/upcoming";

const Trailers = () => {
  const { data: movies, loading, error } = useFetch(url);
  const [movieVideos, setMovieVideos] = useState({}); // Store trailers
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailers = async () => {
      if (!movies) return;
      const promises = movies.map(async (movie) => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results.length > 0) {
            const trailer = data.results.find((video) => video.type === "Trailer") || data.results[0];
            setMovieVideos((prev) => ({
              ...prev,
              [movie.id]: trailer,
            }));
          }
        } catch (err) {
          console.error(`Error fetching videos for movie ${movie.id}:`, err);
        }
      });

      await Promise.all(promises); // Wait for all fetch calls to complete
    };

    fetchTrailers();
  }, [movies]);

  if (loading) return <p className="trending-loading">Loading...</p>;
  if (error) return <p className="trending-error">Error: {error}</p>;
  if (!movies || movies.length === 0) return <p>No upcoming movies available.</p>;

  return (
    <div className="trending-container">
      <h1 className="trending-title">Trailers Movies</h1>
      <div className="trending-movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="trending-movie-card"
            onClick={() => navigate(`/plot?id=${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="trending-movie-image"
            />
            <p className="trending-movie-title">{movie.title}</p>
            <p className="trending-movie-year">{movie.release_date?.split("-")[0] || "Unknown"}</p>
            <p className="trending-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</p>
            <p className="trending-popularity">🔥 Popularity: {movie.popularity ? movie.popularity.toFixed(0) : "N/A"}</p>
            {movieVideos[movie.id] && (
              <a
                href={`https://www.youtube.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-trailer"
              >
                🎬 Watch Trailer
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailers;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useFetch from "../Hooks/useFetch"; // ✅ Import the custom hook
// import "/Users/pranaysinguluri/movie-bluff/src/assets/Trending.css"; // ✅ Import styles

// const url = "https://api.themoviedb.org/3/movie/upcoming";
// const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

// const UpComingMovies = () => {
//   const { data: movies, loading, error } = useFetch(url);
//   const [hoveredMovieId, setHoveredMovieId] = useState(null);
//   const [movieImages, setMovieImages] = useState({}); // Store additional images
//   const [movieVideos, setMovieVideos] = useState({}); // Store trailers
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (movies) {
//       movies.forEach((movie) => {
//         // Fetch movie images
//         fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`)
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.backdrops.length > 0) {
//               setMovieImages((prev) => ({
//                 ...prev,
//                 [movie.id]: data.backdrops.slice(0, 3), // Store up to 3 images
//               }));
//             }
//           })
//           .catch((err) => console.error("Error fetching images:", err));

//         // Fetch movie trailers
//         fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`)
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.results.length > 0) {
//               setMovieVideos((prev) => ({
//                 ...prev,
//                 [movie.id]: data.results.find((video) => video.type === "Trailer") || data.results[0],
//               }));
//             }
//           })
//           .catch((err) => console.error("Error fetching videos:", err));
//       });
//     }
//   }, [movies]);

//   if (loading) return <p className="trending-loading">Loading...</p>;
//   if (error) return <p className="trending-error">Error: {error}</p>;
//   if (!movies || movies.length === 0) return <p>No upcoming movies available.</p>;

//   return (
//     <div className="trending-container">
//       <h1 className="trending-title">Upcoming Movies</h1>
//       <div className="trending-movie-grid">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="trending-movie-card"
//             onClick={() => navigate(`/plot?id=${movie.id}`)}
//             onMouseEnter={() => setHoveredMovieId(movie.id)}
//             onMouseLeave={() => setHoveredMovieId(null)}
//           >
//             <img
//               src={`${imageBaseUrl}${movie.poster_path}`}
//               alt={movie.title}
//               className="trending-movie-image"
//             />
//             {hoveredMovieId === movie.id && (
//               <div className="movie-title-overlay">
//                 <p className="movie-title">{movie.title}</p>
//               </div>
//             )}
//             <p className="trending-movie-year">{movie.release_date?.split("-")[0] || "Unknown"}</p>
//             <p className="trending-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</p>
//             <p className="trending-popularity">🔥 Popularity: {movie.popularity ? movie.popularity.toFixed(0) : "N/A"}</p>
//             {movieImages[movie.id] && (
//               <div className="movie-extra-images">
//                 {movieImages[movie.id].map((img, index) => (
//                   <img key={index} src={`${imageBaseUrl}${img.file_path}`} alt="Movie scene" className="extra-movie-image" />
//                 ))}
//               </div>
//             )}
//             {movieVideos[movie.id] && (
//               <a
//                 href={`https://www.youtube.com/watch?v=${movieVideos[movie.id].key}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="watch-trailer"
//               >
//                 🎬 Watch Trailer
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpComingMovies;
