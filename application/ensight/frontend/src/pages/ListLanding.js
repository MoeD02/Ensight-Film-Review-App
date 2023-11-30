import React from "react";
import "../assets/styles/pages/ListLanding.css";
import LikeButton from "../components/LikeButton";
import Comment from "../assets/images/comment.png";
import Review from "../components/MoviePage/Review";
import CommentPopUp from "../components/CommentPopUp";

const MovieLanding = () => {
	const totalMovies = 15;

	const customButtonStyle = {
		width: "23px",
		height: "23px",
	};

	const customCommentLength = {
		maxWidth: "950px",
	};

	const moviesArray = Array.from(
		{ length: totalMovies },
		(_, index) => index + 1
	);

	return (
		<div className="ListLandingPage">
			<div className="ListCreationUsername">
				<h3 className="ListBy">List by</h3>
				<h3 className="ListUsername">Username</h3>
			</div>
			<div className="ListInformation">
				<h1>List Title</h1>
				<h4 className="ListDescription">This is a description for the list.</h4>
				<div className="ListInteraction">
					<LikeButton customStyle={customButtonStyle} />
					<h4 className="ListLikes">Likes</h4>
					<h4 className="ListDivider">|</h4>
					<img
						className="Symbol h5Text"
						src={Comment}
						alt="like"
						width={35}
						height={32}
					/>
					<h4>Comments</h4>
				</div>
			</div>
			<div className="ListMovieGrid">
				{moviesArray.map((movieNumber) => (
					<span key={movieNumber} className="ListPoster">
						Movie {movieNumber}
					</span>
				))}
			</div>
			<div className="MovieLandingReview ListLandingReview">
				<div className="LandingReviewTop">
					<h1 className="CommentStyle">Comments</h1>
					<CommentPopUp title="List Title" />
				</div>
				<div className="ListComments">
					<Review type="Comment" customStyle={customCommentLength} />
					<Review type="Comment" customStyle={customCommentLength} />
					<Review type="Comment" customStyle={customCommentLength} />
					<Review type="Comment" customStyle={customCommentLength} />
				</div>
			</div>
		</div>
	);
};

export default MovieLanding;
