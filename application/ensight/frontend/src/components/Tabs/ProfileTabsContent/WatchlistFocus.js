import React, { useState , useEffect} from "react";
import "../../../assets/styles/components/ProfileTabs.css";
import {
	fetchMoviesByIds,
	searchMovies,
	addToWatchlist,
	removeFromWatchlist
} from "../../../APIcalls";

const Watchlist = ({ currentUserProfile }) => {
	const [isEditing, setIsEditing] = useState(true);
	const [movieData, setMovieData] = useState([]);
	const [authToken, setAuthToken] = useState("");
	const [watchList, setWatchList] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			let response;

			if (currentUserProfile && currentUserProfile.watchlist) {
				
				response = await fetchMoviesByIds(currentUserProfile.watchlist);
			}

			if (response && Array.isArray(response.movies)) {
				console.log("WatchList Movies Array:", response.movies); // Updated log statement
				setWatchList(response.movies);
			} else {
				console.error("Fetch error or invalid response:", response);
			}
		};
		const fetchAuth = async () => {
			const token = localStorage.getItem("Authorization");
			if (token) {
				setAuthToken(token);
			} else {
				console.log("no auth");
			}
		};

		fetchAuth();
		fetchMovies();

	}, [currentUserProfile.watchlist]);

	const handleEditClick = () => {
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(true);
	};

	const handleSubmitClick = async(movie_id) => {
		setIsEditing(true);
		const response = await addToWatchlist(movie_id,authToken);

		if (response) {
			console.log("Movie added to watchlist successfully:", response);
		} else {
			console.error("Failed to add to watchlist");
		}

	};
	const handleSearchClick = () => {
		const inputElement = document.querySelector(".SearchInput");
		const searchTerm = inputElement.value.trim();

		const fetchData = async () => {
			if (searchTerm) {
				const data = await searchMovies(searchTerm, "highest", "", "");
				if (data) {
					setMovieData(data);
				}
			} else {
				console.log("Input field is empty. Please enter a search term.");
			}
		};

		fetchData();
	};

	return (
		<div className="Content">
			<div className={isEditing ? "ListView" : "ListEdit"}>
				{isEditing ? (
					<div className="GridContainer GridWatchlist">
						{watchList.map((movie) => (
							<h3 key={movie.id} className="MovieWatchList">
								<img
									src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
									alt={movie.title}
								/>
							</h3>
						))}
						<button
							className="MovieWatchlist AddMovie"
							onClick={handleEditClick}>
							<h3>+</h3>
						</button>
					</div>
				) : (
					<>
						{/* search is implemented here where it will display all movies with same keywords */}
						<div class="MovieSearch WatchlistSearch">
							<input
								className="SearchInput WatchlistInput"
								type="text"
								placeholder="Search Movie"
							/>
							<button
								class="SearchButton WatchlistButton"
								onClick={handleSearchClick}>
								Search
							</button>
						</div>
						<div className="WatchlistResults">
							{movieData.map((movie, index) => (
								<div key={index}>
									<button
										className="MovieWatchlist WatchButton"
										onClick={() => handleSubmitClick(movie.id)}>
										<img
											src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
											alt={movie.title}
										/>
									</button>
								</div>
							))}
						</div>
						<div className="ListButtons">
							<button className="Button" onClick={handleCancelClick}>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Watchlist;
