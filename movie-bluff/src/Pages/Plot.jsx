// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import LoadingGif from "../assets/loadingGif.gif";  // Relative path
// import Footer from "../Components/Footer";
// import NavBar from "../Components/NavBar";
// import "../assets/Plot.css";  // Relative path
// import Reviews from "../Components/Reviews";  // Relative path
// import useFetch from "../Hooks/useFetch";

// const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTE4ZjcwZDU1ZGIxMzRmMDk0OTE3ZGE5ZWZjYjczNSIsIm5iZiI6MTczNzgyOTg0MS4zODQsInN1YiI6IjY3OTUyZGQxZDRiYTE3MjVmMTJhZTFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK8RSiK_PHNzJsBd4CTpDD7weTGXKnGa8RxQjtEJckw"; // Replace with your actual token
// const BASE_URL = "https://api.themoviedb.org/3/movie/";

// const Plot = () => {
//   const [movieData, setMovieData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const movieId = searchParams.get("id");

//   useEffect(() => {
//     if (!movieId) return;
//     const fetchPlot = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}${movieId}`, {  
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${BEARER_TOKEN}`,
//             "Content-Type": "application/json"
//           }
//         });
//         if (!response.ok) throw new Error("Failed to fetch movie data.");
//         const result = await response.json();
//         setMovieData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlot();
//   }, [movieId]);

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       setUserName(currentUser?.userName || "Guest");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <NavBar />
//       <div className="plot">
//         <h1>Movie Plot</h1>
//         {loading && (
//           <div style={{textAlign: "center", marginTop: "200px" }}>
//             <img src={LoadingGif} alt="Loading..." width="100" />
//             <p>Fetching Plot... {userName}</p>
//           </div>
//         )}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && !error && movieData && (
//           <>
//             <div className="movie-container">
//               <div className="movie-image">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
//                   alt={movieData.title}
//                 />
//               </div>
//                <div className="movie-details">
//                 <h1 className="movie-title">{movieData.title}</h1>
//                 <p className="movie-overview">{movieData.overview}</p>
//               <div className="movie-overview">
//               </div>
//               </div>
//             </div>
//             < br/>
//             <div>
//             <Reviews />
//             </div>
//           </>
//         )}
//         <Footer />
//       </div>
//     </>
//   );
// };


// export default Plot;import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/loadingGif.gif";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../assets/Plot.css";
import Reviews from "../Components/Reviews";
import useFetch from "../Hooks/useFetch";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const Plot = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  // Correct usage of useFetch as a hook
  const { data: movieData, loading, error } = useFetch(
    movieId ? `${BASE_URL}${movieId}` : null
  );

  // console.log("Fetching URL:", movieId ? `${BASE_URL}${movieId}` : null);
  
  // console.log("API Response:", movieData);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserName(currentUser?.userName || "Guest");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="plot">
        <h1>Movie Plot</h1>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "200px" }}>
            <img src={LoadingGif} alt="Loading..." width="100" />
            <p>Fetching Plot... {userName}</p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && movieData && (
          <>
            <div className="movie-container">
              <div className="movie-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                  alt={movieData.title}
                />
              </div>
              <div className="movie-details">
                <h1 className="movie-title">{movieData.title}</h1>
                <p className="movie-overview">{movieData.tagline}</p>
                <p className="movie-overview">
                  <strong>Release Date:</strong> {movieData.release_date}
                </p>
                <p className="movie-overview">
                  <strong>Genre:</strong> {movieData.genres?.map((genre) => genre.name).join(", ")}
                </p>  
                <br/>
                <p className="movie-overview">{movieData.overview}</p>
              
              </div>
            </div>
            <br />
            <div>
              <Reviews />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Plot;