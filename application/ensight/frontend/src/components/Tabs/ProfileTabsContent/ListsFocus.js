import React, { useRef, useState, useEffect } from "react";
import "../../../assets/styles/components/ProfileTabs.css";
import {
	searchMovies,
	createMovieList,
	getUserMovieLists,
} from "../../../APIcalls";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const ListsFocus = ({ currentUserProfile, isMyPage }) => {
	const prevUserIdRef = useRef();
	const [isEditing, setIsEditing] = useState(true);
	const [addedMovies, setAddedMovies] = useState([]);
	const [numberOfLists, setNumberOfLists] = useState(0);
	const [movieData, setMovieData] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [listData, setListData] = useState(null);
	console.log("IS THS MY PAGE: ", isMyPage);
	

	useEffect(() => {
		const fetchData = async () => {
			const filter = "id";
//			if (prevUserIdRef.current !== currentUserProfile.id) {
//				const data = await getUserMovieLists(
//					filter,
//					null,
//					currentUserProfile.id
//				);
				setListData(
					await getUserMovieLists(
						filter,
						null,
						currentUserProfile?.id
						))
//				setListData(data);
//				setNumberOfLists(data.length);
				prevUserIdRef.current = currentUserProfile?.id;
//			}
		};
		if(!!listData) {
			fetchData();
		}
	}, [listData]);
	const handleEditClick = () => {
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(true);
		setAddedMovies([]);
	};

	const handleSubmitClick = async () => {
		if (addedMovies.length >= 5) {
			setIsEditing(true);
			const movieIds = addedMovies.map((movie) => movie.id);
			const info = {
				author: currentUserProfile.id,
				title: title,
				description: description,
				movie_ids: movieIds,
			};
			const response = await createMovieList(info);

			if (response) {
				console.log("Movie list created successfully:", response);
			} else {
				console.error("Failed to create movie list");
			}
			console.log(info);
			setAddedMovies([]);
		}
	};

	const handleAddMovie = (movie) => {
		if (!addedMovies.some((addedMovie) => addedMovie.title === movie.title)) {
			setAddedMovies([...addedMovies, movie]);
		}
	};

	const handleRemoveMovie = (movie) => {
		const updatedMovies = addedMovies.filter(
			(addedMovie) => addedMovie.title !== movie.title
		);
		setAddedMovies(updatedMovies);
	};

	const renderMovieSection = (index) => {
		if (
			!listData ||
			listData?.length === 0 ||
			!listData[index] ||
			!listData[index].movies
		) {
			// Data is not yet available or in the expected structure, you can render a loading state or return null
			return null;
		}

		return (
			<div className="ListOverlap" key={index}>
				<div className="PostersGrid">
					{[1, 2, 3, 4, 5].map((movieIndex) => (
						<h6
							key={movieIndex}
							className={`ListMoviePoster ListMovie${movieIndex}`}>
							{listData[index].movies[movieIndex - 1] && (
								<img
									key={listData[index].movies[movieIndex - 1].id}
									src={`http://image.tmdb.org/t/p/original${
										listData[index].movies[movieIndex - 1].poster_path
									}`}
									className={`ListMoviePoster ListMovie${movieIndex}`}
								/>
							)}
						</h6>
					))}
				</div>
				<Link to={`/ListLanding/${listData[index].id}`} className="browse-link">
					<div className="movie-info">
						<div className="movie-user">{listData[index].author}</div>
						<div className="movie-title">{listData[index].title}</div>
					</div>
				</Link>
			</div>
		);
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
					<>
						<div className="GridContainer GridList">
							{!!listData && [...Array(listData.length).keys()].map((index) =>
								renderMovieSection(index)
							)}
							<button
								className={`MovieList AddList ${isMyPage ? "" : "hidden"}`}
								onClick={handleEditClick}>
								<h3>+</h3>
							</button>
						</div>
					</>
				) : (
					<>
						<div className="ListInfo">
							<h2 className="ProfileTitle">Title</h2>
							<input
								className="TitleInput"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="ListInfo">
							<h2 className="ProfileTitle">Description</h2>
							<textarea
								className="BioText"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className="AddingFilms">
							<div className="FilmAdd">
								<h2 className="ListAddFilm">Add Films</h2>
								<div className="MovieSearch">
									<input
										className="SearchInput"
										type="text"
										placeholder="Add Item"
									/>
									<button className="SearchButton" onClick={handleSearchClick}>
										Search
									</button>
								</div>
								<div className="MovieResults">
									{movieData.map((movie, index) => (
										<div key={index}>
											<button
												className="MovieWatchlist WatchButton"
												onClick={() => handleAddMovie(movie)}>
												<img
													src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
													alt={movie.title}
												/>
											</button>
										</div>
									))}
								</div>
							</div>
							<div className="FilmAdded">
								<h3 className="ProfileTitle">Films Added</h3>
								<ul className="FilmsAdded">
									{addedMovies.map((movie, index) => (
										<li
											className="FilmAddedList"
											key={index}
											onClick={() => handleRemoveMovie(movie)}>
											{movie.title}
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="ListButtons">
							<button className="Button RightB" onClick={handleSubmitClick}>
								Create
							</button>
							<button className="Button LeftB" onClick={handleCancelClick}>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ListsFocus;
