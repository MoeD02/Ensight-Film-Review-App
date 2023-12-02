import React, { useState, useRef, useEffect } from "react";
import "../../../assets/styles/components/ProfileTabs.css";
import { updateUserProfile,fetchMoviesByIds } from "../../../APIcalls";

const ProfileFocus = ({ currentUserProfile }) => {
	const [privacyOption, setPrivacyOption] = useState("public");
	const [isEditing, setIsEditing] = useState(true);
	const [profilePic,setProfilePic] = useState({});
	const fileInputRef = useRef(null);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [newUsername, setNewUsername] = useState("");
	const [newBio, setNewBio] = useState("");
	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		// Fetch movie details for the favorite movie IDs
		const fetchMovies = async () => {
			let response;

			if (currentUserProfile && currentUserProfile.favorites) {
				console.log(
					"Here is 1 fav movie ID: " + currentUserProfile.favorites[0]
				);
				response = await fetchMoviesByIds(currentUserProfile.favorites);
			}

			if (response && Array.isArray(response.movies)) {
				console.log("Favorite Movies Array:", response.movies); // Updated log statement
				setFavoriteMovies(response.movies);
			} else {
				console.error("Fetch error or invalid response:", response);
			}
		};
		const fetchAuth = async () => {
			const token = localStorage.getItem("Authorization");
			if (token) {
				setAuthToken(token);
				
			} else {
				console.log("no auth");
			}
		};

		fetchAuth();

		fetchMovies();
	}, [currentUserProfile.favorites]);

	const handlePrivacyChange = (event) => {
		setPrivacyOption(event.target.value);
	};

	const handleEditClick = () => {
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(true);
	};

	const handleSubmitClick = async () => {
		
		try {
			const profileUpdateInfo = {
				id: currentUserProfile.id,
				new_username: newUsername,
				new_bio: newBio,
				new_avatar: profilePic,
			};

			// Call the updateProfile function
			await updateUserProfile(profileUpdateInfo, authToken);

			// Additional actions or UI updates can be added here if needed

			setIsEditing(true); // Set back to editing mode after the update is complete
		} catch (error) {
			console.error("Error updating profile:", error.message);
			// Handle error, update UI, show error messages, etc.
		}
	};

	const handleProfilePicChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setProfilePic(selectedFile);
		}
	};

	useEffect(() => {
		// This effect will run whenever profilePic changes
		console.log("Selected File:", profilePic);
	}, [profilePic]);
	const handleUsernameChange = (event) => {
		setNewUsername(event.target.value);
	};

	const handleBioChange = (event) => {
		setNewBio(event.target.value);
	};

	return (
		<div className="Content">
			<div className={isEditing ? "ProfileView" : "ProfileEdit"}>
				{isEditing ? (
					<>
						{/* only appears when the user is on their profile */}
						<button className="Button" onClick={handleEditClick}>
							Edit Profile
						</button>
						<div className="FavoriteMovies">
							<h2 className="Title">Favorite Movies</h2>
							<div className="GridContainer GridProfile">
								{/* Change movie poster text to the movie poster image from the backend */}
								{/* replace with all of user's favorite movies */}
								{favoriteMovies.map((movie) => (
									<h3 key={movie.id} className="MovieProfile">
										<img
											src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
											alt={movie.title}
										/>
									</h3>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						<div className="EditRowA">
							<div className="Username">
								<h2 className="ProfileTitle">Username</h2>
								{/* users can change their name here */}
								<input
									className="User"
									placeholder="Username"
									value={newUsername}
									onChange={handleUsernameChange}
								/>
							</div>
							<div className="ProfilePic">
								<h2 className="ProfileTitle">Change PFP</h2>
								{/* users can change their pfp here */}
								<input
									type="file"
									accept="image/*"
									onChange={handleProfilePicChange}
									ref={fileInputRef}
									className="ImageInput"
								/>
							</div>
							<div className="Privacy">
								<h2 className="ProfileTitle">Privacy</h2>
								{/* users can change their status here */}
								<div className="PrivacyChoice">
									<label>
										<input
											className="PrivacyButton"
											type="radio"
											value="public"
											checked={privacyOption === "public"}
											onChange={handlePrivacyChange}
										/>
										<span className="RadioDetail" />
										Public
									</label>
									<label>
										<input
											className="PrivacyButton"
											type="radio"
											value="private"
											checked={privacyOption === "private"}
											onChange={handlePrivacyChange}
										/>
										<span className="RadioDetail" />
										Private
									</label>
								</div>
							</div>
						</div>
						<div className="EditRowB">
							<div className="Bio">
								<h2 className="ProfileTitle">Bio</h2>
								{/* users can change their bio here */}
								<textarea
									className="BioText"
									placeholder="Enter a bio"
									value={newBio}
									onChange={handleBioChange}
								/>
							</div>
							<button className="Button LeftB" onClick={handleCancelClick}>
								Cancel
							</button>
							{/* any changes are saved */}
							<button className="Button RightB" onClick={handleSubmitClick}>
								Save
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileFocus;
