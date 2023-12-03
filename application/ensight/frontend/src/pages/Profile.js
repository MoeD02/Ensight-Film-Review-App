import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileTabs from "../components/Tabs/ProfileTabs";
import "../assets/styles/pages/Profile.css";
import { getCurrentUser, getUserProfileById } from "../APIcalls";

// only look at profile, watchlist, and lists
const Profile = () => {
	const { currentTab } = useParams();
	const { id } = useParams();
	const [authToken, setAuthToken] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [isMyPage, setIsMyPage] = useState(false);
	const [currentUserProfile, setCurrentUserProfile] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("Authorization");
			if (token) {
				setAuthToken(token);
				try {
					const userData = await getCurrentUser(token);
					setCurrentUser(userData);
					console.log(
						"This is the current logged in user's id: " +
							currentUser.id +
							" And this is the Profile we are on's id: " +
							id
					);
					if (
						typeof currentUser.id === "string" &&
						id.trim() === currentUser.id.trim()
					) {
						setIsMyPage(true);
						const profileData = await getUserProfileById(id);
						setCurrentUserProfile(profileData);
					} else {
						setIsMyPage(false);
						const profileData = await getUserProfileById(id);
						setCurrentUserProfile(profileData);
					}
				} catch (error) {
					console.error("Failed to fetch user data", error);
				}
			} else {
				console.log("no auth");
			}
		};

		fetchData();
	}, [id]); // Include id as a dependency

	return (
		<div>
			<div className="UserInformation">
				<img
					src={"http://localhost:8000" + currentUserProfile.avatar}
					className="UserPic"
				/>

				<div className="UserText">
					<h1 className="Username">{currentUserProfile.user}</h1>
					<h3 className="BioDesc">{currentUserProfile.bio}</h3>
				</div>
				<div className="UserExtra">
					<div className="UserExtraInfo">
						{/* Replace # by the number of lists they made */}
						<h1 className="UserTextInfo">#</h1>
						<h2 className="UserTextInfo">Lists</h2>
					</div>
					<div className="UserExtraInfo">
						{/* Replace # by the number of user they follow */}
						<h1 className="UserTextInfo">#</h1>
						<h2 className="UserTextInfo">Following</h2>
					</div>
					<div className="UserExtraInfo UserExtraR">
						{/* Replace # by the number of user follow them */}
						<h1 className="UserTextInfo">#</h1>
						<h2 className="UserTextInfo">Followers</h2>
					</div>
				</div>
			</div>
			<ProfileTabs
				currentTab={currentTab}
				currentUserProfile={currentUserProfile}
			/>
		</div>
	);
};

export default Profile;
