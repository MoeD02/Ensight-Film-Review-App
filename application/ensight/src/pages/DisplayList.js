import React, { useState } from 'react';
import '../assets/styles/pages/DisplayList.css';

function DisplayList() {
  // Example data for the list
  const movieListData = [
    { title: 'List Title 1', user: 'User 1' },
    { title: 'List Title 2', user: 'User 2' },
    { title: 'List Title 3', user: 'User 3' },
    { title: 'List Title 4', user: 'User 4' },
    { title: 'List Title 5', user: 'User 5' },
    { title: 'List Title 6', user: 'User 6' },
    { title: 'List Title 7', user: 'User 10' },
    { title: 'List Title 8', user: 'User 9' },
    { title: 'List Title 9', user: 'User 8' },
    { title: 'List Title 10', user: 'User 7' },
    { title: 'List Title 11', user: 'User 6' },
    { title: 'List Title 12', user: 'User 5' },
    { title: 'List Title 13', user: 'User 4' },
    { title: 'List Title 14', user: 'User 3' },
    { title: 'List Title 15', user: 'User 2' },
    { title: 'List Title 16', user: 'User 1' },
    { title: 'List Title 17', user: 'User 2' },
    { title: 'List Title 18', user: 'User 4' },
    { title: 'List Title 19', user: 'User 6' },
    { title: 'List Title 20', user: 'User 8' },
    { title: 'List Title 21', user: 'User 0' },
  ];
  const numberOfListsPerButton = 6;

  const buttonPlacesListData = [];
  let remainingLists = movieListData.length;

  // Calculate the number of full buttons with 24 movies
  for (let i = 1; i <= Math.floor(movieListData.length / numberOfListsPerButton); i++) {
    buttonPlacesListData.push({ number: i, numberOfLists: numberOfListsPerButton });
    remainingLists -= numberOfListsPerButton;
  }

  // Add the last button with the remaining movies
  if (remainingLists > 0) {
    buttonPlacesListData.push({ number: buttonPlacesListData.length + 1, numberOfLists: remainingLists });
  }

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

    return (
        <div className="movie-list-container">
            <h2 className='ListDetailInfo'>List it, or Miss it <br/>Create your own ultimate cine-list now below</h2>
            <button className="create-list-button custom-button">Create List +</button>
            <div className="layered-container list-layered-container">
                {movieListData
                    .slice(
                        (selectedButton - 1) * numberOfListsPerButton,
                        selectedButton * numberOfListsPerButton
                    )
                    .map((movie) => (
                    <div className="ListOverlap" key={movie.title}>
                        <div className="PostersGrid">
                            <h6 className="ListMoviePoster ListMovie1">Movie</h6>
                            <h6 className="ListMoviePoster ListMovie2">Movie</h6>
                            <h6 className="ListMoviePoster ListMovie3">Movie</h6>
                            <h6 className="ListMoviePoster ListMovie4">Movie</h6>
                            <h6 className="ListMoviePoster ListMovie5">Movie</h6>
                        </div>
                        <div className="movie-info">
                            <div className="movie-user">{movie.user}</div>
                            <div className="movie-title">{movie.title}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ListButtonPlaceWrapper">
            {buttonPlacesListData.map((buttonData) => (
                <h3
                className={`ListButtonPlace ${selectedButton === buttonData.number ? "selected" : ""}`}
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