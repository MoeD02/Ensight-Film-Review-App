import React, { useState } from "react";
import '../assets/styles/pages/DisplayMovie.css';
import YearSelection from '../components/Selections/YearSelection.js';
import GenreSelection from '../components/Selections/GenreSelection.js';
import RatingSelection from '../components/Selections/RatingSelection.js';

const Browse = () => {
  // this will be removed and replaced will all movies
  //get number of total movies and replace
  const totalMovies = 207;
  const numberOfMoviesPerButton = 24;

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
        {/* once search is clicked, any of the checkboxes are applied */}
        {/* if no checkboxes are picked for a selection, then add all */}
        <button className="DMSearch">Search</button>
      </div>
      <div className="DMResults">
        <div className="DMPosters">
          {Array(buttonPlacesData[selectedButton - 1].numberOfMovies).fill().map((_, index) => (
            <h3 className="DMPoster" key={index}>
              Movie {index + 1 + (selectedButton - 1) * numberOfMoviesPerButton}
            </h3>
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