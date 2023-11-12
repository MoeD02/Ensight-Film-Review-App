import "../../assets/styles/pages/Browse.css";
import React, { useEffect, useState } from "react";

const ListResults = ({ searchTerm }) => {
    const [listData, setListData] = useState([]);
    const temp = searchTerm;
    useEffect(() => {
        if (searchTerm != null) {
            const fetchData = async () => {
                const data = {
                    content: temp,
                };

                const response = await fetch(
                    "http://127.0.0.1:8000/search_user_movie_lists/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setListData(data);
                } else {
                    console.error("Failed to fetch list data");
                }
            };

            fetchData();
        } else {
            const fetchData = async () => {
                const data = {
                    filter: "highest_rated",
                    amount: 5,
                };

                const response = await fetch(
                    "http://127.0.0.1:8000/get_user_movie_lists",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        //   body: JSON.stringify(data),
                    }
                );

                if (response.ok) {
                    if (response.data) {
                        setListData(response.data);
                    }
                } else {
                    console.error("Failed to fetch list data");
                }
            };

            fetchData();
        }
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
