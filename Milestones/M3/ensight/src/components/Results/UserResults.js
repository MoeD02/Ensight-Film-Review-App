// import React from "react";
// import '../../assets/styles/pages/Browse.css';
// import FollowButton from '../FollowButton.js'

// const UserResults = () => {
//     const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = {
//         filter: 'highest_followers',
//         amount: 5,
//       };

//       const response = await fetch('http://127.0.0.1:8000/get_users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUserData(data);
//       } else {
//         console.error('Failed to fetch movie data');
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div className="ResultContent Results">
//         <div className="UserResults">
//             <span className="UserPicResults"></span>
//             <div className="MoviePosterDetails">
//                 <h5 className="MoviePosterTitle">Username</h5>
//                 <h6 className="MoviePosterStars">Bio</h6>
//             </div>
//         </div>
//         <div className="ResultExtra">
//             <div className="ResultExtraInfo">
//                 {/* Replace # by the number of lists they made */}
//                 <h3>#</h3>
//                 <h3 className="ResultStatement">lists</h3>
//             </div>
//             <div className="ResultExtraInfo">
//                 {/* Replace # by the number of user they follow */}
//                 <h3>#</h3>
//                 <h3 className="ResultStatement">following</h3>
//             </div>
//             <div className="ResultExtraInfo">
//                 {/* Replace # by the number of user follow them */}
//                 <h3>#</h3>
//                 <h3 className="ResultStatement">followers</h3>
//             </div>
//             <FollowButton />
//         </div>
//     </div>
//   );
// }

// export default UserResults;
import FollowButton from '../FollowButton.js'
import React, { useEffect, useState } from "react";
import '../../assets/styles/pages/Browse.css';

const UserResults = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
        <>
        
        {userData.map((user, index) => (
      <div className="ResultContent Results">
        <div key={index} className="UserResults">
          <span className="UserPicResults">{/* Display user profile picture */}</span>
          <div className="MoviePosterDetails">
            <h5 className="MoviePosterTitle">{user.username}</h5>
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
