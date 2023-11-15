import React, { useEffect, useState } from "react";
import '../assets/styles/pages/DisplayMovie.css';
import YearSelection from '../components/Selections/YearSelection.js';
import GenreSelection from '../components/Selections/GenreSelection.js';
import RatingSelection from '../components/Selections/RatingSelection.js';
import { fetchMovies } from "../APIcalls.js";

const Browse = () => {
  const numberOfMoviesPerButton = 24;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies("ALL",totalMovies);
      if (data) {
        setMovieData(data);
      } else {
        console.error('Failed to fetch movie data');
      }
    };

    fetchData();
  }, []);

  const totalMovies = movieData.length;
  const buttonPlacesData = [];
  let remainingMovies = totalMovies;

  // Calculate the number of full buttons with 24 movies
  for (let i = 1; i <= Math.floor(totalMovies / numberOfMoviesPerButton); i++) {
    buttonPlacesData.push({ number: i, numberOfMovies: numberOfMoviesPerButton });
    remainingMovies -= numberOfMoviesPerButton;
  }

  // Add the last button with the remaining movies
  if (remainingMovies > 0) {
    buttonPlacesData.push({ number: buttonPlacesData.length + 1, numberOfMovies: remainingMovies });
  }

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className="flex-container">
      <div className="DMFilter">
        <h2 className="DMTitle">Browse by</h2>
        <div className="CheckSelections">
          <YearSelection />
          <GenreSelection />
          <RatingSelection />
        </div>
        <button className="DMSearch">Search</button>
      </div>
      <div className="DMResults">
        <div className="DMPosters">
          {movieData
            .slice(
              (selectedButton - 1) * numberOfMoviesPerButton,
              selectedButton * numberOfMoviesPerButton
            )
            .map((movie, index) => (
              <img className="DMPoster" key={index}
                src= {"http://localhost:8000"+movie.poster_path}
                >
              </img>
            ))}
        </div>
        <div className="ButtonPlaceWrapper">
          {buttonPlacesData.map((buttonData) => (
            <h3
              className={`ButtonPlace ${selectedButton === buttonData.number ? "selected" : ""}`}
              onClick={() => handleButtonClick(buttonData.number)}
              key={buttonData.number}
            >
              {buttonData.number}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
