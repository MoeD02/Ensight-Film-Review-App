// import React, { useEffect, useState } from "react";
// import '../assets/styles/pages/DisplayMovie.css';
// import YearSelection from '../components/Selections/YearSelection.js';
// import GenreSelection from '../components/Selections/GenreSelection.js';
// import RatingSelection from '../components/Selections/RatingSelection.js';
// import { fetchMovies } from "../APIcalls.js";

// const Browse = () => {
//   const numberOfMoviesPerButton = 24;
//   const [movieData, setMovieData] = useState([]);
//   const [selectedRating, setSelectedRating] = useState('highest');
//   const [searchRating, setSearchRating] = useState('highest');
//   const [selectedGenre, setSelectedGenre] = useState({});
//   const [searchGenre, setSearchGenre] = useState({});
//   const [selectedYear, setSelectedYear] = useState({});
//   const [searchYear, setSearchYear] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchMovies(searchRating, searchGenre, searchYear, numberOfMoviesPerButton);
//       if (data) {
//         setMovieData(data);
//       } else {
//         console.error('Failed to fetch movie data');
//       }
//     };

//     fetchData();
//   }, [searchRating, searchGenre]);

//   const handleRatingChange = (rating) => {
//     setSelectedRating(rating);
//   };

//   const handleGenreChange = (genre) => {
//     setSelectedGenre(genre);
//   };
//   const handleYearChange = (year) => {
//     setSelectedYear(year);
//   }

//   const checkSelections = () => {
//     setSearchRating(selectedRating);

//     const selectedGenresArray = Object.keys(selectedGenre).filter(genre => selectedGenre[genre]);
//     setSearchGenre(selectedGenresArray);

//     const selectedYearArray = Object.keys(selectedYear).filter(year => selectedYear[year]);
//     setSearchYear(selectedYearArray);
//   };
//   const totalMovies = movieData.length;
//   const buttonPlacesData = [];
//   let remainingMovies = totalMovies;

//   // Calculate the number of full buttons with 24 movies
//   for (let i = 1; i <= Math.floor(totalMovies / numberOfMoviesPerButton); i++) {
//     buttonPlacesData.push({ number: i, numberOfMovies: numberOfMoviesPerButton });
//     remainingMovies -= numberOfMoviesPerButton;
//   }

//   // Add the last button with the remaining movies
//   if (remainingMovies > 0) {
//     buttonPlacesData.push({ number: buttonPlacesData.length + 1, numberOfMovies: remainingMovies });
//   }

//   const [selectedButton, setSelectedButton] = useState(1);

//   const handleButtonClick = (buttonNumber) => {
//     setSelectedButton(buttonNumber);
//   };

//   return (
//     <div className="flex-container">
//       <div className="DMFilter">
//         <h2 className="DMTitle">Browse by</h2>
//         <div className="CheckSelections">
//         <YearSelection onYearChange={handleYearChange}/>
//           <GenreSelection onGenreChange={handleGenreChange}/>
//           <RatingSelection onRatingChange={handleRatingChange}/>
//         </div>
//         <button className="DMSearch"onClick={checkSelections}>Search</button>
//       </div>
//       <div className="DMResults">
//         <div className="DMPosters">
//           {movieData
//             .slice(
//               (selectedButton - 1) * numberOfMoviesPerButton,
//               selectedButton * numberOfMoviesPerButton
//             )
//             .map((movie, index) => (
//               <img className="DMPoster" key={index}
//                 src= {"http://localhost:8000"+movie.poster_path}
//                 >
//               </img>
//             ))}
//         </div>
//         <div className="ButtonPlaceWrapper">
//           {buttonPlacesData.map((buttonData) => (
//             <h3
//               className={`ButtonPlace ${selectedButton === buttonData.number ? "selected" : ""}`}
//               onClick={() => handleButtonClick(buttonData.number)}
//               key={buttonData.number}
//             >
//               {buttonData.number}
//             </h3>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Browse;
// Browse.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../assets/styles/pages/DisplayMovie.css';
import YearSelection from '../components/Selections/YearSelection.js';
import GenreSelection from '../components/Selections/GenreSelection.js';
import RatingSelection from '../components/Selections/RatingSelection.js';
import { fetchMovies } from "../APIcalls.js";
import MovieLanding from './MovieLanding'; // Import your MovieLanding component

const Browse = () => {
  const numberOfMoviesPerButton = 24;
  const [movieData, setMovieData] = useState([]);
  const [selectedRating, setSelectedRating] = useState('highest');
  const [searchRating, setSearchRating] = useState('highest');
  const [selectedGenre, setSelectedGenre] = useState({});
  const [searchGenre, setSearchGenre] = useState({});
  const [selectedYear, setSelectedYear] = useState({});
  const [searchYear, setSearchYear] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies(searchRating, searchGenre, searchYear, numberOfMoviesPerButton);
      if (data) {
        setMovieData(data);
      } else {
        console.error('Failed to fetch movie data');
      }
    };

    fetchData();
  }, [searchRating, searchGenre]);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
  }

  const checkSelections = () => {
    setSearchRating(selectedRating);

    const selectedGenresArray = Object.keys(selectedGenre).filter(genre => selectedGenre[genre]);
    setSearchGenre(selectedGenresArray);

    const selectedYearArray = Object.keys(selectedYear).filter(year => selectedYear[year]);
    setSearchYear(selectedYearArray);
  };
  const totalMovies = movieData.length;
  const buttonPlacesData = [];
  let remainingMovies = totalMovies;

  // Calculate the number of full buttons with 24 movies
  for (let i = 1; i <= Math.floor(totalMovies / numberOfMoviesPerButton); i++) {
    buttonPlacesData.push({ number: i, numberOfMovies: numberOfMoviesPerButton });
    remainingMovies -= numberOfMoviesPerButton;
  }

  // Add the last button with the remaining movies
  if (remainingMovies > 0) {
    buttonPlacesData.push({ number: buttonPlacesData.length + 1, numberOfMovies: remainingMovies });
  }

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className="flex-container">
      <div className="DMFilter">
        <h2 className="DMTitle">Browse by</h2>
        <div className="CheckSelections">
          <YearSelection onYearChange={handleYearChange}/>
          <GenreSelection onGenreChange={handleGenreChange}/>
          <RatingSelection onRatingChange={handleRatingChange}/>
        </div>
        <button className="DMSearch" onClick={checkSelections}>Search</button>
      </div>
      <div className="DMResults">
        <div className="DMPosters">
          {movieData
            .slice(
              (selectedButton - 1) * numberOfMoviesPerButton,
              selectedButton * numberOfMoviesPerButton
            )
            .map((movie, index) => (
              <Link to={`/MovieLanding/${movie.id}`} key={index}>
                <img
                  className="DMPoster"
                  src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`Movie Poster ${index}`}
                />
              </Link>
            ))}
        </div>
        <div className="ButtonPlaceWrapper">
          {buttonPlacesData.map((buttonData) => (
            <h3
              className={`ButtonPlace ${selectedButton === buttonData.number ? "selected" : ""}`}
              onClick={() => handleButtonClick(buttonData.number)}
              key={buttonData.number}
            >
              {buttonData.number}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
