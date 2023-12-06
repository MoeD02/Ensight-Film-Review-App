import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/pages/Browse.css";
import {
	searchUsers,
	getUsers,
	getUserStats,
	initUser,
	isFollowedByUser,
	followUser,
} from "../../APIcalls.js";
import FollowButton from "../FollowButton.js";

const UserResults = ({ searchTerm }) => {
	const [userData, setUserData] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			let currentUserInfo = await initUser();
			if (!!currentUserInfo) {
				setCurrentUser(currentUserInfo);
			}

			let data;
			if (searchTerm != null) {
				data = await searchUsers(searchTerm);
			} else {
				data = await getUsers("highest_followers", 5);
			}

			if (data) {
				const updatedData = await Promise.all(
					data.map(async (user) => {
						const stats = await getUserStats(user.id);
						const followInfo = await isFollowedByUser(
							currentUserInfo.id,
							user.id,
							currentUserInfo.token
						);
						const followed = followInfo ? followInfo.data : null; // Check if followInfo is not null

						return { ...user, stats, followed };
					})
				);
				setUserData(updatedData);
			} else {
				console.error("Failed to fetch user data");
			}
		};

		fetchData();
	}, [searchTerm]);
	 const follow_user = async (userToFollowId) => {
			// You can add error handling here
			const result = await followUser(userToFollowId, currentUser.token);
			if (result) {
				// Update the state or perform any other necessary actions
				console.log(`Successfully followed user ${userToFollowId}`);
			} else {
				console.error(`Failed to follow user ${userToFollowId}`);
			}
		};

	return (
		<>
			{userData.map((user, index) => (
				<div className="ResultContent Results" key={index}>
					<div className="UserResults">
						<Link
							to={`/Profile/${user.id}/profile`}
							className="browse-link"
							key={index}>
							<img
								className="UserPicResults"
								src={"http://localhost:8000" + user.avatar}
							/>

							<div className="MoviePosterDetails">
								<h5 className="MoviePosterTitle">{user.user}</h5>
								<h6 className="MoviePosterStars">{user.bio}</h6>
							</div>
							<div className="ResultExtra">
								<div className="ResultExtraInfo">
									<h3>{user.stats.num_movie_lists}</h3>
									<h3 className="ResultStatement">lists</h3>
								</div>
								<div className="ResultExtraInfo">
									<h3>{user.stats.num_following}</h3>
									<h3 className="ResultStatement">following</h3>
								</div>
								<div className="ResultExtraInfo">
									<h3>{user.stats.num_followers}</h3>
									<h3 className="ResultStatement">followers</h3>
								</div>
							</div>
						</Link>
					</div>
					{currentUser && (
						<FollowButton
							userToFollowId={user.id}
							
							followUser={follow_user} // Use the individual user's followed state
							currentUser={currentUser}
						/>
					)}
				</div>
			))}
		</>
	);
};

export default UserResults;
