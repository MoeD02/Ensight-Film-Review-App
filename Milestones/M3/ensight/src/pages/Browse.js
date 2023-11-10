import React from "react";
import '../assets/styles/pages/Browse.css';
import YearSelection from '../components/Selections/YearSelection.js';
import GenreSelection from '../components/Selections/GenreSelection.js';
import RatingSelection from '../components/Selections/RatingSelection.js';
import MovieResults from "../components/Results/MovieResults.js";
import ListResults from "../components/Results/ListResults.js";
import UserResults from "../components/Results/UserResults.js";
import { useLocation } from 'react-router-dom';


  const Browse = () => {
    const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const searchTerm = queryParams.get("searchTerm");
  
      // Now you can use the searchTerm in your Browse component
      console.log("Search Term:", searchTerm);
  if (searchTerm==null){
    console.log("I DID NOT SEARCH?????!!!!");
  return (
    <div className="flex-container">
      <div className="BrowseFilter">
        <h2 className="BrowseTitle">Browse by</h2>
        <div className="CheckSelections">
          <YearSelection />
          <GenreSelection />
          <RatingSelection />
        </div>
        {/* once search is clicked, any of the checkboxes are applied */}
        {/* if no checkboxes are picked for a selection, then add all */}
        <button className="BrowseSearch">Search</button>
      </div>
      <div className="BrowseResults">
        <div>
          <h2>Films</h2>
          {/* replace with 4 movies */}
          <MovieResults />
          {/* <MovieResults />
          <MovieResults />
          <MovieResults /> */}
          <h3 className="SeeResults">See More Results</h3>
        </div>
        <div>
          <h2>Lists</h2>
          <div>
            {/* replace with 5 lists */}
            <ListResults />
            {/* <ListResults />
            <ListResults />
            <ListResults />
            <ListResults /> */}
          </div>
          <h3 className="SeeResults">See More Results</h3>
        </div>
        <div>
          <h2>Users</h2>
          <div>
            {/* replace with 5 users */}
            <UserResults />
            {/* <UserResults />
            <UserResults />
            <UserResults />
            <UserResults /> */}
          </div>
          <h3 className="SeeResults">See More Results</h3>
        </div>
      </div>
    </div>
  );
          }
          else{
            console.log("I SEARCHED!!!!");
            return (
              <div className="flex-container">
                <div className="BrowseFilter">
                  <h2 className="BrowseTitle">Browse by</h2>
                  <div className="CheckSelections">
                    <YearSelection />
                    <GenreSelection />
                    <RatingSelection />
                  </div>
                  {/* once search is clicked, any of the checkboxes are applied */}
                  {/* if no checkboxes are picked for a selection, then add all */}
                  <button className="BrowseSearch">Search</button>
                </div>
                <div className="BrowseResults">
                  <div>
                    <h2>Films</h2>
                    {/* replace with 4 movies */}
                    <MovieResults searchTerm={searchTerm}/>
                    {/* <MovieResults />
                    <MovieResults />
                    <MovieResults /> */}
                    <h3 className="SeeResults">See More Results</h3>
                  </div>
                  <div>
                    <h2>Lists</h2>
                    <div>
                      {/* replace with 5 lists */}
                      <ListResults searchTerm={searchTerm}/>
                      {/* <ListResults />
                      <ListResults />
                      <ListResults />
                      <ListResults /> */}
                    </div>
                    <h3 className="SeeResults">See More Results</h3>
                  </div>
                  <div>
                    <h2>Users</h2>
                    <div>
                      {/* replace with 5 users */}
                      <UserResults searchTerm={searchTerm}/>
                      {/* <UserResults />
                      <UserResults />
                      <UserResults />
                      <UserResults /> */}
                    </div>
                    <h3 className="SeeResults">See More Results</h3>
                  </div>
                </div>
              </div>
            );
          }
}

export default Browse;