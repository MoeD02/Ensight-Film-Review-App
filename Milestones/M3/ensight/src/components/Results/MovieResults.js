import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';

const MovieResults = ({ searchTerm }) => {
  const [movieData, setMovieData] = useState([]);
  const temp = searchTerm;
  useEffect(() => {
    if (searchTerm != null) {
      
      const fetchData = async () => {
        const data = {
          content: temp,
        };

        const response = await fetch('http://127.0.0.1:8000/search_movies/', {
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
    } else {
      
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
    }
  }, [searchTerm]);
  //csc648-01-fa23-team02\application\ensight\media\posters
  //C:\Users\dahbo\Desktop\New_648_Project\csc648-01-fa23-team02\application\ensight\media\posters
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
