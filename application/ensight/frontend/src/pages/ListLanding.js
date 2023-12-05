import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/pages/ListLanding.css";
import LikeButton from "../components/LikeButton";
import Comment from "../assets/images/comment.png";
import Review from "../components/MoviePage/Review";
import CommentPopUp from "../components/CommentPopUp";
import { useParams } from "react-router-dom";
import {
	getListDetails
} from "../APIcalls";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ListLanding = () => {
  const totalMovies = 15;
  const { id } = useParams();
  const [listData, setListData] = useState({});

  console.log("This is the list's title" + listData.title);
  useEffect(() => {
    const fetchListDetails = async () => {
      const data = await getListDetails(id);
      if (data) {
        setListData(data);
      }
    };

    fetchListDetails();
  }, [id]);

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
				<h3 className="ListUsername">{listData.author || "Unknown Author"}</h3>
			</div>
			<div className="ListInformation">
				<h1>{listData.title}</h1>
				<h4 className="ListDescription">{listData.description}</h4>
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
				{listData.movies &&
					listData.movies.map((movie, index) => (
							<Link to={`/MovieLanding/${movie.id}`} key={index}>
						<span key={index} className="ListPoster">
								<img
									className="listPoster"
									src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
									alt={`Movie Poster ${index}`}
								/>
						</span>
							</Link>
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

export default ListLanding;

