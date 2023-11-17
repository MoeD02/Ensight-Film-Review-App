import React from "react";
import '../../assets/styles/pages/Browse.css';

const MovieResults = ({ rating }) => {
  //console.log("Rating Result: " + rating);

  return (
    <div className="Results">
        <h6 className="MoviePoster">Movie</h6>
        <div className="MoviePosterDetails">
            <h5 className="MoviePosterTitle">Movie Title</h5>
            <h6 className="MoviePosterYear">Year</h6>
            <h6 className="MoviePosterStars">Stars</h6>
        </div>
    </div>
  );
}

export default MovieResults;