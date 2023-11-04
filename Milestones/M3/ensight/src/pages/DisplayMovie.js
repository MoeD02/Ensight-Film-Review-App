import React from "react";
import '../assets/styles/pages/DisplayMovie.css';
import YearSelection from '../components/Selections/YearSelection.js';
import GenreSelection from '../components/Selections/GenreSelection.js';
import RatingSelection from '../components/Selections/RatingSelection.js';

const Browse = () => {
  const numberOfMovies = 24;

  const moviesArray = new Array(numberOfMovies).fill(null);

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
        {moviesArray.map((_, index) => (
          <h3 className="DMPoster" key={index}>Movie</h3>
        ))}
      </div>
    </div>
  );
}

export default Browse;