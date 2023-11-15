import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';
import { searchMovies, fetchMovies } from "../../APIcalls"; 
const MovieResults = ({ searchTerm }) => {
  const [movieData, setMovieData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm != null) {
        const data = await searchMovies(searchTerm);
        if (data) {
          setMovieData(data);
        }
      } else {
        const data = await fetchMovies("highest_rated", 5);
        if (data) {
          setMovieData(data);
        }
      }
    };

    fetchData();
  }, [searchTerm]);
  return (
    <>
      {movieData.map((movie, index) => (
        <div className="browse" key={index}>
          <div className="Results">
          <img src={"http://localhost:8000"+movie.poster_path} className="MoviePoster">
            </img>
          {/* <h6 className="MoviePoster">Movie</h6> */}
            <div className="MoviePosterDetails">
              <h5 className="MoviePosterTitle">{movie.title}</h5>
              <h6 className="MoviePosterYear">Year: {movie.year}</h6>
              <h6 className="MoviePosterStars">Stars: {movie.stars}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieResults;
