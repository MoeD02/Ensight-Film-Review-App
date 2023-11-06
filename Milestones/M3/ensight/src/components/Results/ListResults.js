
import '../../assets/styles/pages/Browse.css';
import React, { useEffect, useState } from "react";

const ListResults = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        filter: 'highest_rated',
        amount: 5,
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
      } else {
        console.error('Failed to fetch lsit data');
      }
    };

    fetchData();
  }, []);
  return (
    <>
    
    {listData.map((list, index) => (
    <div className="Results">
      <div key={index} className="List">
        <div className="BrowsePostersGrid">
          <h6 className="MoviePoster ListMovie1">{list.movie1}</h6>
          <h6 className="MoviePoster ListMovie2">{list.movie2}</h6>
          <h6 className="MoviePoster ListMovie3">{list.movie3}</h6>
        </div>
        <div className="MoviePosterDetails">
          <h5 className="ListPosterTitle">{list.title}</h5>
          <h6 className="MoviePosterStars">User: {list.author}</h6>
        </div>
      </div>
  </div>
    ))}
    </>
  );
}

export default ListResults;