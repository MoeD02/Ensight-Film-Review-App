import React, { useState, useEffect } from "react";
import "../../assets/styles/pages/MovieLanding.css";
import LikeButton from "../LikeButton";
import LikedButton from "../MoviePage/LikedButton";
import { getUserProfileById } from "../../APIcalls"; // Replace with your actual file path

const Review = ({ type, customStyle, review }) => {
	const [authorProfile, setAuthorProfile] = useState(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
            if(!!review.author){
                const userProfile = await getUserProfileById(review.author);
                if (!!userProfile) {
                    setAuthorProfile(userProfile);
                }

            }
		};

		fetchUserProfile();
	}, [review.author]);

	return (
		<div className="ReviewInfo">
			{/* Check if authorProfile is available before rendering */}
			{authorProfile && (
				<img
					src={"http://localhost:8000/" + authorProfile.avatar} // Assuming the API returns the avatar URL
					alt={`${authorProfile.name}'s Profile`}
					className="ReviewProfilePic"
				/>
			)}
			<div className="ReviewText">
				<div className="ReviewUsername">
					{/* Display the author's username */}
					<h3>{authorProfile ? authorProfile.name : "Username"}</h3>
				</div>
				<h5 style={customStyle}>{review.text}</h5>
				{/* <div className="ReviewLikes">
					<LikeButton />
					<h6>Like {type}</h6>
					<LikedButton />
					<h6># of Likes</h6>
				</div> */}
			</div>
		</div>
	);
};

export default Review;
