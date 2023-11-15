import React from "react";
import '../../assets/styles/pages/Browse.css';
import '../../assets/styles/pages/DisplayUser.css';
import FollowButton from '../FollowButton.js'

const UserResults = ({ UserNumber,UserBio,avatar }) => {
  const FollowUser = {
    borderRadius: "100px",
  };  

  return (
    <div className="ResultContent Results DisplayResults">
        <div className="UserResults">
            
            {/* <span className="UserPicResults DisplayUserPic"></span> */}
            <img className="UserPicResults DisplayUserPic" key={index}
                src= {"http://localhost:8000"+avatar}
                >
              </img>
            <div className="MoviePosterDetails">
                <h5 className="DisplayPosterTitle">{UserNumber}</h5>
            </div>
            
        </div>
        <div className="DisplayBioContainer">
            <h6 className="DisplayBio">{UserBio}</h6>
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
            <FollowButton style={FollowUser}/>
        </div>
    </div>
  );
}

export default UserResults;