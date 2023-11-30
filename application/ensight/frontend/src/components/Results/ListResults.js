import "../../assets/styles/pages/Browse.css";
import React, { useEffect, useState } from "react";
import { searchUserMovieLists, getUserMovieLists } from "../../APIcalls";

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
					{/* <div className="List" key={list.id}> */}
					<div className="BrowsePostersGrid">
						{list.movies.slice(0, 3).map((movie, movieIndex) => (
							<img
								key={movie.id}
								src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
								className={`MoviePoster ListMovie${movieIndex + 1}`}
								alt={`Movie Poster ${movieIndex}`}
							/>
						))}
					</div>
					<div className="MoviePosterDetails">
						<h5 className="ListPosterTitle" key={list.title}>
							{list.title}
						</h5>
						<h6 className="MoviePosterStars" key={list.author}>
							{list.author}
						</h6>
					</div>
					{/* </div> */}
				</div>
			))}
		</>
	);
};

export default ListResults;
