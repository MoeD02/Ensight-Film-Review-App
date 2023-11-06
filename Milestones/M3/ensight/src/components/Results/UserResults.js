import FollowButton from '../FollowButton.js'
import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';

const UserResults = ({ searchTerm }) => {
  const [userData, setUserData] = useState([]);
  const temp = searchTerm;


  useEffect(() => {

    if (searchTerm != null){
        const fetchData = async () => {
            const data = {
              content: temp,
            };
      
            const response = await fetch('http://127.0.0.1:8000/search_users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            } else {
              console.error('Failed to fetch user data');
            }
          };
      
          fetchData();
    }
    else{
        const fetchData = async () => {
            const data = {
              filter: 'highest_followers',
              amount: 5,
            };
      
            const response = await fetch('http://127.0.0.1:8000/get_users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            } else {
              console.error('Failed to fetch user data');
            }
          };
      
          fetchData();
    }
    
  }, [searchTerm]);

  return (
        <>
        
        {userData.map((user, index) => (
      <div className="ResultContent Results">
        <div key={index} className="UserResults">
          <span className="UserPicResults">{/* Display user profile picture */}</span>
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
              <h3>{user.num_following}</h3>
              <h3 className="ResultStatement">following</h3>
            </div>
            <div className="ResultExtraInfo">
              <h3>{user.num_followers}</h3>
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
