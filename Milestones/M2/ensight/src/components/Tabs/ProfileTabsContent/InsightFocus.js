import React from "react";
import '../../../assets/styles/components/ProfileTabs.css';

const DiaryFocus = () => {
    return (
      <div className="Content">
          <div className="GridContainer GridInsight">
              <div className="InsightInfo InfoTop InfoLeft">
                <h1 className="Number">#</h1>
                <h5>Films Reviewed</h5>
              </div>
              <div className="InsightInfo InfoTop">
                <h1 className="Number">#</h1>
                <h5>Lists Created</h5>
              </div>
              <div className="InsightInfo InfoTop InfoRight">
                <h1 className="Number">#</h1>
                <h5>Films Added to Watchlist</h5>
              </div>
              <div className="InsightInfo InfoBottom InfoLeft">
                <h1 className="Number">#</h1>
                <h5>Following</h5>
              </div>
              <div className="InsightInfo InfoBottom">
                <h1 className="Number">#</h1>
                <h5>Followers</h5>
              </div>
              <div className="InsightInfo InfoBottom InfoRight">
                <h1 className="Number">#</h1>
                <h5>Likes</h5>
              </div>
          </div>
        </div>
    );
};

export default DiaryFocus;