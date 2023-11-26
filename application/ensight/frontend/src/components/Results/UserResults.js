import FollowButton from '../FollowButton.js'
import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';
import { searchUsers, getUsers } from "../../APIcalls.js"; 


const UserResults = ({ searchTerm }) => {
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm != null) {
        const data = await searchUsers(searchTerm);
        if (data) {
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } else {
        const data = await getUsers('highest_followers', 5);
        if (data) {
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
        <>
        
        {userData.map((user, index) => (
      <div className="ResultContent Results">
        <div key={index} className="UserResults">
          <img className="UserPicResults"src={"http://localhost:8000"+user.avatar}/>

          
          <div className="MoviePosterDetails">
            <h5 className="MoviePosterTitle">{user.user}</h5>
            <h6 className="MoviePosterStars">{user.bio}</h6>
          </div>
          <div className="ResultExtra">
            <div className="ResultExtraInfo">
              <h3>{user.num_lists}</h3>
              <h3 className="ResultStatement">lists</h3>
            </div>
            <div className="ResultExtraInfo">
              <h3>{user.following}</h3>
              <h3 className="ResultStatement">following</h3>
            </div>
            <div className="ResultExtraInfo">
              <h3>{user.followers}</h3>
              <h3 className="ResultStatement">followers</h3>
            </div>
            
          </div>
          
        </div>
              <FollowButton />
    </div>
      ))}
      </>
  );
}

export default UserResults;
