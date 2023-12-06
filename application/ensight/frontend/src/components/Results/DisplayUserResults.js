import React, { useState, useEffect } from "react";
import "../../assets/styles/pages/Browse.css";
import "../../assets/styles/pages/DisplayUser.css";
import FollowButton from "../FollowButton.js";
import { Link } from "react-router-dom";
import { getUserStats, followUser, initUser } from "../../APIcalls.js";

const UserResults = ({ Username, UserBio, avatar, userId }) => {
	const [userStats, setUserStats] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUserStats = async () => {
			const stats = await getUserStats(userId);
			setUserStats(stats);
		};

		fetchUserStats();
	}, [userId]);

	useEffect(() => {
		const initPage = async () => {
			let userInfo = await initUser();
			if (!!userInfo) {
				setUser(userInfo);
			}
		};
		initPage();
	}, []);

	const follow_user = async (userToFollowId) => {
		try {
			if (user) {
				const result = await followUser(userToFollowId, user.token);
				if (result) {
					console.log(`Successfully followed user ${userToFollowId}`);
				} else {
					console.error(`Failed to follow user ${userToFollowId}`);
				}
			} else {
				console.error("User not initialized");
			}
		} catch (error) {
			console.error("Error while following user", error);
		}
	};

	return (
		<div className="ResultContent Results DisplayResults">
			<div className="UserResults">
				<Link to={`/Profile/${userId}/profile`} className="browse-link">
					<img
						src={"http://localhost:8000" + avatar}
						className="UserPicResults DisplayUserPic"
						alt={`${Username}'s Avatar`}
					/>
					<div className="MoviePosterDetails">
						<h5 className="DisplayPosterTitle">{Username}</h5>
					</div>
				</Link>
			</div>
			<div className="DisplayBioContainer">
				<h6 className="DisplayBio">{UserBio}</h6>
			</div>
			<div className="ResultExtra">
				<div className="ResultExtraInfo">
					<h3>{userStats ? userStats.num_movie_lists : 0}</h3>
					<h3 className="ResultStatement">lists</h3>
				</div>
				<div className="ResultExtraInfo">
					<h3>{userStats ? userStats.num_following : 0}</h3>
					<h3 className="ResultStatement">following</h3>
				</div>
				<div className="ResultExtraInfo">
					<h3>{userStats ? userStats.num_followers : 0}</h3>
					<h3 className="ResultStatement">followers</h3>
				</div>
				{user && (
					<FollowButton
						userToFollowId={userId}
						followUser={follow_user}
						currentUser={user}
					/>
				)}
			</div>
		</div>
	);
};

export default UserResults;
