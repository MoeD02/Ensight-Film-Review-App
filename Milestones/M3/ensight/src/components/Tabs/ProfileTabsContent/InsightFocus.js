import React from "react";
import '../../../assets/styles/components/ProfileTabs.css';

// don't need to look at this for now
const InsightInfo = () => {
    return (
      <div className="Content">
          <div className="GridContainer GridInsight">
              <div className="InsightInfo InfoTop InfoLeft">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Films Reviewed</h5>
              </div>
              <div className="InsightInfo InfoTop">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Lists Created</h5>
              </div>
              <div className="InsightInfo InfoTop InfoRight">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Films Added to Watchlist</h5>
              </div>
              <div className="InsightInfo InfoBottom InfoLeft">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Following</h5>
              </div>
              <div className="InsightInfo InfoBottom">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Followers</h5>
              </div>
              <div className="InsightInfo InfoBottom InfoRight">
                <h1 className="Number">#</h1>
                <h5 className="h5Text">Likes</h5>
              </div>
          </div>
        </div>
    );
};

export default InsightInfo;