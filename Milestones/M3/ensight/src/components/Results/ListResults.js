import React from "react";
import '../../assets/styles/pages/Browse.css';

const ListResults = () => {
  return (
    <div className="Results">
        <div className="BrowsePostersGrid">
            <h6 className="MoviePoster ListMovie1">Movie</h6>
            <h6 className="MoviePoster ListMovie2">Movie</h6>
            <h6 className="MoviePoster ListMovie3">Movie</h6>
        </div>
        <div className="MoviePosterDetails">
            <h5 className="ListPosterTitle">List Title</h5>
            <h6 className="MoviePosterStars">User</h6>
        </div>
    </div>
  );
}

export default ListResults;