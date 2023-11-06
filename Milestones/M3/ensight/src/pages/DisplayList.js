import React, { useEffect, useState } from 'react';
import '../assets/styles/pages/DisplayList.css';

function DisplayList() {
  const [listData, setListData] = useState([]);
  const [movieListData, setMovieListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        filter: 'highest_rated',
        amount: 6,
      };

      const response = await fetch('http://127.0.0.1:8000/get_user_movie_lists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setListData(data);
        setIsLoading(false); // Data fetching is complete
      } else {
        console.error('Failed to fetch list data');
        setIsLoading(false); // Data fetching failed
      }
    };

    fetchData();

  }, []);

  if (isLoading) {
    // Display a loading spinner or message here while data is being fetched
    return <div>Loading...</div>;
  }

  const numberOfListsPerButton = 6;

  const buttonPlacesListData = [];
  let remainingLists = listData.length;

  // Calculate the number of full buttons with 6 movies per button
  for (let i = 1; i <= Math.floor(listData.length / numberOfListsPerButton); i++) {
    buttonPlacesListData.push({ number: i, numberOfLists: numberOfListsPerButton });
    remainingLists -= numberOfListsPerButton;
  }

  // Add the last button with the remaining movies
  if (remainingLists > 0) {
    buttonPlacesListData.push({ number: buttonPlacesListData.length + 1, numberOfLists: remainingLists });
  }

  

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className="movie-list-container">
      <h2 className='ListDetailInfo'>List it, or Miss it <br/>Create your own ultimate cine-list now below</h2>
      <button className="create-list-button custom-button">Create List +</button>
      <div className="layered-container list-layered-container">
        {listData
          .slice(
            (selectedButton - 1) * numberOfListsPerButton,
            selectedButton * numberOfListsPerButton
          )
          .map((list, index) => (
            <div className="ListOverlap" key={list.title}>
              <div className="PostersGrid">
                <h6 className="ListMoviePoster ListMovie1">Movie</h6>
                <h6 className="ListMoviePoster ListMovie2">Movie</h6>
                <h6 className="ListMoviePoster ListMovie3">Movie</h6>
                <h6 className="ListMoviePoster ListMovie4">Movie</h6>
                <h6 className="ListMoviePoster ListMovie5">Movie</h6>
              </div>
              <div className="movie-info">
                <div className="movie-user">{list.author}</div>
                <div className="movie-title">{list.title}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="DisplayButtonPlaceWrapper">
        {buttonPlacesListData.map((buttonData) => (
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

export default DisplayList;
