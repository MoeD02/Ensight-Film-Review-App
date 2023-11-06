import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';

const MovieResults = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        filter: 'highest_rated',
        amount: 5,
      };

      const response = await fetch('http://127.0.0.1:8000/fetch_movies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setMovieData(data);
      } else {
        console.error('Failed to fetch movie data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="browse">
    {movieData.map((movie, index) => (
        <div className="Results">
        <div key={index} className="MoviePoster">
          <h5 className="MoviePosterTitle">{movie.title}</h5>
          <h6 className="MoviePosterYear">Year: {movie.year}</h6>
          <h6 className="MoviePosterStars">Stars: {movie.stars}</h6>
        </div>
    </div>
      ))}
      </div>
  );
  
}

export default MovieResults;
