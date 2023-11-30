import React, { useState } from "react";
import "../../../assets/styles/components/ProfileTabs.css";

const Watchlist = () => {
	const [isEditing, setIsEditing] = useState(true);

	const handleEditClick = () => {
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(true);
	};

	const handleSubmitClick = () => {
		setIsEditing(true);
	};

	return (
		<div className="Content">
			<div className={isEditing ? "ListView" : "ListEdit"}>
				{isEditing ? (
					<div className="GridContainer GridWatchlist">
						{/* change movie text to the movie poster image from backend */}
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						<h3 className="MovieWatchlist">Movie</h3>
						{/* this should be kept so the user can add more movies unless viewing a profile */}
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
							<button class="SearchButton WatchlistButton">Search</button>
						</div>
						<div className="WatchlistResults">
							<div>
								<button
									className="MovieWatchlist WatchButton"
									onClick={handleSubmitClick}>
									Movie
								</button>
								<h4 className="MovieText">Movie Title</h4>
							</div>
							<div>
								<button
									className="MovieWatchlist WatchButton"
									onClick={handleSubmitClick}>
									Movie
								</button>
								<h4 className="MovieText">Movie Title</h4>
							</div>
							<div>
								<button
									className="MovieWatchlist WatchButton"
									onClick={handleSubmitClick}>
									Movie
								</button>
								<h4 className="MovieText">Movie Title</h4>
							</div>
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
