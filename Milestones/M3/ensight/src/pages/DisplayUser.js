import React, { useState, useEffect } from "react";
import '../assets/styles/pages/DisplayUser.css';
import DisplayUserResults from "../components/Results/DisplayUserResults.js";

const Browse = () => {
  const [userData, setUserData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1); // Moved useState here
  
  const numberOfUsersPerButton = 5;

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        filter: 'ALL',
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

  // Conditional rendering to handle the case when userData is still empty
  if (userData.length === 0) {
    return <div>Loading...</div>;
  }

  const totalUser = userData.length;
  const buttonPlacesDisplayData = [];
  let remainingUsers = totalUser;

  for (let i = 1; i <= Math.floor(totalUser / numberOfUsersPerButton); i++) {
    buttonPlacesDisplayData.push({ number: i, numberOfUsers: numberOfUsersPerButton });
    remainingUsers -= numberOfUsersPerButton;
  }

  if (remainingUsers > 0) {
    buttonPlacesDisplayData.push({ number: buttonPlacesDisplayData.length + 1, numberOfUsers: remainingUsers });
  }

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className="DisplayUserResults">
      <div className="DisplayOuter">
      {Array(buttonPlacesDisplayData[selectedButton - 1].numberOfUsers).fill().map((_, index) => (
  <DisplayUserResults UserNumber={userData[index].user} UserBio = {userData[index].bio} avatar ={userData[index].avatar} key={index} />
))}
      </div>
      <div className="DisplayButtonPlaceWrapper">
        {buttonPlacesDisplayData.map((buttonData) => (
          <h3
            className={`DisplayButtonPlace ${selectedButton === buttonData.number ? "selected" : ""}`}
            onClick={() => handleButtonClick(buttonData.number)}
            key={buttonData.number}
          >
            {buttonData.number}
          </h3>
        ))}
      </div>
    </div>
  );
}

export default Browse;
