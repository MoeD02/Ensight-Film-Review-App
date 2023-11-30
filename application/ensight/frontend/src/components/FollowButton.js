import React, { useState } from "react";
import "../assets/styles/components/FollowButton.css";

const FollowButton = ({ style }) => {
	const [isFollowing, setIsFollowing] = useState(false);

	const toggleFollow = () => {
		setIsFollowing((prevIsFollowing) => !prevIsFollowing);
	};

	return (
		<button
			style={style}
			className={`button ${isFollowing ? "following" : "follow"}`}
			onClick={toggleFollow}>
			{isFollowing ? "Following" : "Follow +"}
		</button>
	);
};

export default FollowButton;
