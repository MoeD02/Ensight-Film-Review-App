import React from "react";
import '../../assets/styles/pages/Browse.css';
import FollowButton from '../FollowButton.js'

const UserResults = () => {
  return (
    <div className="ResultContent Results">
        <div className="UserResults">
            <span className="UserPicResults"></span>
            <div className="MoviePosterDetails">
                <h5 className="MoviePosterTitle">Username</h5>
                <h6 className="MoviePosterStars">Bio</h6>
            </div>
        </div>
        <div className="ResultExtra">
            <div className="ResultExtraInfo">
                {/* Replace # by the number of lists they made */}
                <h3>#</h3>
                <h3 className="ResultStatement">lists</h3>
            </div>
            <div className="ResultExtraInfo">
                {/* Replace # by the number of user they follow */}
                <h3>#</h3>
                <h3 className="ResultStatement">following</h3>
            </div>
            <div className="ResultExtraInfo">
                {/* Replace # by the number of user follow them */}
                <h3>#</h3>
                <h3 className="ResultStatement">followers</h3>
            </div>
            <FollowButton />
        </div>
    </div>
  );
}

export default UserResults;