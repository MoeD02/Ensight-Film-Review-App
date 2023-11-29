import React, { useEffect, useState } from 'react';
import '../assets/styles/pages/DisplayList.css';
import { getUserMovieLists } from "../APIcalls";
function DisplayList() {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const filter = 'ALL'; // Set your desired filter
      const amount = 6; // Set your desired amount

      const data = await getUserMovieLists(filter, amount);

      if (data) {
        setListData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
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
                {list.movies.slice(0, 5).map((movie, movieIndex) => (
                  <img
                    key={movie.id}
                    src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
                    
                    className={`ListMoviePoster ListMovie${movieIndex + 1}`}
                  />
                ))}
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
