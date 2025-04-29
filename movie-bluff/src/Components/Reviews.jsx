import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/MovieReview.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track collapse state (default to expanded)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTE4ZjcwZDU1ZGIxMzRmMDk0OTE3ZGE5ZWZjYjczNSIsIm5iZiI6MTczNzgyOTg0MS4zODQsInN1YiI6IjY3OTUyZGQxZDRiYTE3MjVmMTJhZTFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK8RSiK_PHNzJsBd4CTpDD7weTGXKnGa8RxQjtEJckw";

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is missing or invalid.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
          setError("No reviews available for this movie.");
          setLoading(false);
          return;
        }
        const initialExpanded = data.results.reduce((acc, review) => {
          acc[review.id] = true;
          return acc;
        }, {});
        setExpanded(initialExpanded);
        setReviews(data.results || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const toggleExpand = (reviewId) => {
    setExpanded((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-reviews">
      <h2>Movie Reviews</h2>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews available for this movie.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <h4 className="review-author">
                {review.author_details?.name || review.author || "Anonymous"}
              </h4>
              <p
                className={`review-content ${
                  expanded[review.id] ? "expanded" : ""
                }`}
              >
                {review.content}
              </p>
              <button
                className="read-more"
                onClick={() => toggleExpand(review.id)}
              >
                {expanded[review.id] ? "Show less" : "Read more"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;