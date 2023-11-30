import React from "react";
import "../../assets/styles/pages/MovieLanding.css";
import LikeButton from "../LikeButton";
import LikedButton from "../MoviePage/LikedButton";

const Review = ({ type, customStyle }) => {
	return (
		<div className="ReviewInfo">
			<span className="ReviewProfilePic" />
			<div className="ReviewText">
				<div className="ReviewUsername">
					<h3>Username</h3>
				</div>
				<h5 style={customStyle}>
					The Way of Water dives deep into a mesmerizing aquatic world,
					breathing new life into the beloved saga. The visuals are
					breathtaking, transporting us to a dazzling underwater realm. The
					story keeps you hooked, though some plot elements felt familiar.
				</h5>
				<div className="ReviewLikes">
					<LikeButton />
					<h6>Like {type}</h6>
					<LikedButton />
					<h6># of Likes</h6>
				</div>
			</div>
		</div>
	);
};

export default Review;
