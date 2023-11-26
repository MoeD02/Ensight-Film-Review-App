import "../../assets/styles/pages/Browse.css";
import React, { useEffect, useState } from "react";
import {searchUserMovieLists,getUserMovieLists } from "../../APIcalls"; 

const ListResults = ({ searchTerm }) => {
    const [listData, setListData] = useState([]);
    const temp = searchTerm;
    useEffect(() => {
        const fetchData = async () => {
          if (searchTerm != null) {
            const data = await searchUserMovieLists(searchTerm);
            if (data) {
              setListData(data);
            } else {
              console.error("Failed to fetch list data");
            }
          } else {
            const data = await getUserMovieLists("highest_rated", 5);
            if (data) {
              setListData(data);
            } else {
              console.error("Failed to fetch list data");
            }
          }
        };
    
        fetchData();
      }, [searchTerm]);
    return (
        <>
            {listData.map((list, index) => (
                <div className="Results" key={index}>
                    <div className="List">
                        <div className="BrowsePostersGrid">
                            {list.movies.map((movie, movieIndex) => (
                                <img
                                    key={movieIndex}
                                    src={
                                        "http://localhost:8000" +
                                        movie.poster_path
                                    }
                                    className="MoviePoster ListMovie"
                                />
                            ))}
                        </div>
                        <div className="MoviePosterDetails">
                            <h5 className="ListPosterTitle">{list.title}</h5>
                            <h6 className="MoviePosterStars">
                                User: {list.author}
                            </h6>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListResults;
