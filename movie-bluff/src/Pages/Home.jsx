// import React, { useState } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import Search from "../Components /SearchBar.jsx";
// import Plot from "../Pages/Plot.jsx";
// import About from "../Pages/About.jsx";
// import NavBar from "../Components /NavBar.jsx";
// import LoadingGif from "../assets/loadingGif.gif";
// import ErrorPage from "../Pages/ErrorPage.jsx";
// import { VscStarHalf } from "react-icons/vsc";
// import Footer from "../Components /Footer.jsx";
// import Login from "./Login";
// import SignUp from "../Pages/SignUp.jsx";
// import Upcoming from "../Components /Trending.jsx";
// import useFetch from "../Hooks/useFetch.jsx";
// import TrendingMovies from "../Components /Trending.jsx";
// import Welcome from "./Welcome.jsx";
// // import token from "/Users/pranaysinguluri/movie-bluff/src/Utilities/token.jsx"

// const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// function Home() {
//   const [url, setUrl] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data: movies, loading, error } = useFetch(url);

//   const location = useLocation();
//   const userName = location.state?.username;

//   const handleSearch = (query) => {
//     setSearchTerm(query);
//     setUrl(`${TMDB_BASE_URL}/search/movie?query=${query}`);
//   };

//   return (
//     <>
//       <NavBar />
//       welcome to Movie Bluff {userName}
//       <Routes>
//         <Route
//           path="/home"
//           element={
//             <div className="wrapper-search">
//               <Search onSearch={handleSearch} />

//               {loading && (
//                 <div className="loading-container">
//                   <img src={LoadingGif} alt="Loading..." width="200" />
//                 </div>
//               )}

//               {error && <p className="error-message">{error}</p>}

//               {searchTerm && movies && movies.length > 0 && (
//                 <p className="results-info">
//                   {`Results for "${searchTerm}": ${movies.length}`}
//                 </p>
//               )}

//               {!searchTerm || (movies && movies.length === 0) ? <Upcoming /> : null} 
//               {/* shows upcoming  */}

//               {movies && movies.length > 0 && (
//                 <div className="movie-grid">
//                   {movies.map((movie) => (
//                     <div key={movie.id} className="movie-card">
//                       <h2>{movie.title}</h2>
//                       <p>{movie.release_date?.split("-")[0]}</p>
//                       <p>Language: {movie.original_language.toUpperCase()}</p>
//                       <p>
//                         <VscStarHalf /> {movie.vote_average.toFixed(1)}
//                       </p>

//                       <Link to={`/plot?id=${movie.id}`}>
//                         <img
//                           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//                           alt={movie.title}
//                           className="movie-poster"
//                         />
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <Footer />
//             </div>
//           }
//         />
//         <Route path="/plot" element={<Plot />} />
//         <Route path="/welcome" element={<Welcome/>} />
//         <Route path="/trending" element={<TrendingMovies />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/*" element={<ErrorPage />} />
//       </Routes>
//     </>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar.jsx";
import Plot from "../Pages/Plot.jsx";
import About from "../Pages/About.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingGif from "../assets/loadingGif.gif";
import ErrorPage from "../Pages/ErrorPage.jsx";
import { VscStarHalf } from "react-icons/vsc";
import Footer from "../Components/Footer.jsx";
import Login from "./Login";
import SignUp from "../Pages/SignUp.jsx";
import Upcoming from "../Components/Trending.jsx";
import useFetch from "../Hooks/useFetch.jsx";
import TrendingMovies from "../Components/Trending.jsx";
import Welcome from "./Welcome.jsx";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies, loading, error } = useFetch(url);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setUserName(currentUser?.username || "Guest");
    }
  }, [navigate]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setUrl(`${TMDB_BASE_URL}/search/movie?query=${query}`);
  };
  return (
    <>
      <NavBar />
      <h2>Welcome to Movie Bluff, {userName}!</h2>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="wrapper-search">
              <Search onSearch={handleSearch} />

              {loading && (
                <div className="loading-container">
                  <img src={LoadingGif} alt="Loading..." width="200" />
                </div>
              )}

              {error && <p className="error-message">{error}</p>}

              {searchTerm && movies && movies.length > 0 && (
                <p className="results-info">
                  {`Results for "${searchTerm}": ${movies.length}`}
                </p>
              )}

              {!searchTerm || (movies && movies.length === 0) ? <Upcoming /> : null} 

              {movies && movies.length > 0 && (
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <h2>{movie.title}</h2>
                      <p>{movie.release_date?.split("-")[0]}</p>
                      <p>Language: {movie.original_language.toUpperCase()}</p>
                      <p>
                        <VscStarHalf /> {movie.vote_average.toFixed(1)}
                      </p>

                      <Link to={`/plot?id=${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <Footer />
            </div>
          }
        />
        <Route path="/plot" element={<Plot />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/trending" element={<TrendingMovies />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default Home;
