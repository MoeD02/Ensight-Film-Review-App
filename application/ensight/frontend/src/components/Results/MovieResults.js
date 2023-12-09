import React, { useEffect, useState } from "react";
import "../../assets/styles/pages/Browse.css";
import { searchMovies, fetchMovies } from "../../APIcalls";
import { Link } from "react-router-dom";
const MovieResults = ({ searchTerm, filter, genres, years }) => {
	const [movieData, setMovieData] = useState([]);
	console.log(filter);
	useEffect(() => {
		const fetchData = async () => {
			if (searchTerm != null) {
				const data = await searchMovies(searchTerm, filter, genres, years);
				if (data) {
					setMovieData(data);
				}
			} else {
				const data = await fetchMovies(filter, genres, years, 5);
				if (data) {
					setMovieData(data);
				}
			}
		};

		fetchData();
	}, [searchTerm, filter, genres, years]);
	return (
		<>
			{movieData.map((movie, index) => (
				<Link
					to={`/MovieLanding/${movie.id}`}
					key={index}
					className="browse-link">
					<div className="Results">
						<img
							src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
							className="MoviePoster"
							alt={movie.title}
						/>
						<div className="MoviePosterDetails">
							<h5 className="MoviePosterTitle">{movie.title}</h5>
							<h6 className="MoviePosterYear">
								Release Date:{" "}
								{new Date(movie.release_date).toLocaleDateString()}
							</h6>
							<h6 className="MoviePosterStars">
								Stars: {movie.rating_average}
							</h6>
						</div>
					</div>
				</Link>
			))}
		</>
	);
};

export default MovieResults;
