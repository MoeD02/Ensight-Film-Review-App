import React from "react";
import '../../assets/styles/pages/MovieLanding.css';

const TopCast = () => {
  return (
    <div className="TopCastInfo">
        <span className="CastProfilePic"/>
        <div className="TopCastNames">
            <h3>Actor Name</h3>
            <h5>Character name</h5>
        </div>
    </div>
  );
}

export default TopCast;