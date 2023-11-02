import React from "react";
import '../../../assets/styles/components/ProfileTabs.css';

const DiaryFocus = () => {
    return (
      <div className="Content">
          <div className="GridContainer GridWatchlist">
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              <h3 className="MovieWatchlist">Movie</h3>
              {/* this should be kept so the user can add more movies unless viewing a profile*/}
              <button className="MovieWatchlist AddMovie">+</button>
          </div>
        </div>
    );
};

export default DiaryFocus;