import React, {useState} from "react";
import '../../../assets/styles/components/ProfileTabs.css';
import Like from "../../../assets/images/heart.png";
import Comment from "../../../assets/images/comment.png";

const ListsFocus = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [addedMovies, setAddedMovies] = useState([]);

  const handleEditClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(true);
    setAddedMovies([]);
  };

  const handleSubmitClick = () => {
    setIsEditing(true);
    setAddedMovies([]);
  };

  const handleAddMovie = (movieTitle) => {
    if (!addedMovies.includes(movieTitle)) {
      setAddedMovies([...addedMovies, movieTitle]);
    }
  };

  const handleRemoveMovie = (movieTitle) => {
    // Create a new array without the clicked movie title
    const updatedMovies = addedMovies.filter(title => title !== movieTitle);
    setAddedMovies(updatedMovies);
  };

  return (
    <div className="Content">
      <div className={isEditing ? "ListView" : "ListEdit"}>
        {isEditing ? (
          <>
            <div className="GridContainer GridList">
              <div className="MovieList">
                {/* change to user's list title from backend */}
                <h3>List Title</h3>
                <div className="ListDetails">
                  <img className="Symbol" src={Like} alt="like" width={20} height={17}/>
                  {/* instead of Likes should be the number of likes */}
                  <h5 className="Like">Likes</h5>
                  <h5 className="Divider">|</h5>
                  <img className="Symbol" src={Comment} alt="like" width={28} height={25}/>
                  {/* instead of Comments should be the number of comments */}
                  <h5 className="Comment">Comments</h5>
                </div>
              </div>
              <div className="MovieList">
                <h3>List Title</h3>
                <div className="ListDetails">
                <img className="Symbol" src={Like} alt="like" width={20} height={17}/>
                  <h5 className="Like">Likes</h5>
                  <h5 className="Divider">|</h5>
                  <img className="Symbol" src={Comment} alt="like" width={28} height={25}/>
                  <h5 className="Comment">Comments</h5>
                </div>
              </div>
              <div className="MovieList">
                <h3>List Title</h3>
                <div className="ListDetails">
                <img className="Symbol" src={Like} alt="like" width={20} height={17}/>
                  <h5 className="Like">Likes</h5>
                  <h5 className="Divider">|</h5>
                  <img className="Symbol" src={Comment} alt="like" width={28} height={25}/>
                  <h5 className="Comment">Comments</h5>
                </div>
              </div>
              {/* this should be kept so the user can add more movies unless viewing a profile */}
              <button className="MovieList AddList" onClick={handleEditClick}>
                <h3>+</h3>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="ListInfo">
              <h2 className="ProfileTitle">Title</h2>
              {/* users can change their name here */}
              <input className="TitleInput" placeholder="Title"></input>
            </div>
            <div className="ListInfo">
              <h2 className="ProfileTitle">Description</h2>
              {/* users can change their bio here */}
              <textarea className="BioText" placeholder="Description" />
            </div>
            {/* search is implemented here where it will display all movies with same keywords */}
            <div className="AddingFilms">
              <div className="FilmAdd">
                <h2 className="ListInfo">Add Films</h2>
                <div class="MovieSearch">
                  <input className="SearchInput" type="text" placeholder="Add Item" />
                  <button class="SearchButton">Search</button>
                </div>
                <div className="MovieResults">
                  <div>
                    {/* replace Movie Title 1 by the movie name */}
                    <button className="MovieWatchlist WatchButton" onClick={() => handleAddMovie("Movie Title 1")}>
                      Movie
                    </button>
                    <h4 className="MovieText">Movie Title 1</h4>
                  </div>
                  <div>
                    <button className="MovieWatchlist WatchButton" onClick={() => handleAddMovie("Movie Title 2")}>
                      Movie
                    </button>
                    <h4 className="MovieText">Movie Title 2</h4>
                  </div>
                  <div>
                    <button className="MovieWatchlist WatchButton" onClick={() => handleAddMovie("Movie Title 3")}>
                      Movie
                    </button>
                    <h4 className="MovieText">Movie Title 3</h4>
                  </div>
                </div>
              </div>
              <div className="FilmAdded">
                <h3>Films Added</h3>
                <ul className="FilmsAdded">
                  {addedMovies.map((movie, index) => (
                    <li key={index} onClick={() => handleRemoveMovie(movie)}>
                      {movie}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
              <div className="ListButtons">
                {/* will create the list */}
                <button className="Button RightB" onClick={handleSubmitClick}>Create</button>
                {/* will go back to lists without saving anything */}
                <button className="Button LeftB" onClick={handleCancelClick}>Cancel</button>
              </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default ListsFocus;