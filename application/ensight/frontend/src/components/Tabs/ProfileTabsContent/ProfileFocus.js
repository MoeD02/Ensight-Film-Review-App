import React, { useState, useRef, useEffect } from "react";
import "../../../assets/styles/components/ProfileTabs.css";
import { updateUserProfile,fetchMoviesByIds, getUserFavorites, getUser } from "../../../APIcalls";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";

const ProfileFocus = ({ userInfo, currentUserID, currentUserProfile, isMyPage }) => {
    const [user, setUser] = useState(null);
	const [privacyOption, setPrivacyOption] = useState("public");
	const [isEditing, setIsEditing] = useState(true);
	const [profilePic,setProfilePic] = useState({});
	const fileInputRef = useRef(null);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [newUsername, setNewUsername] = useState("");
	const [newBio, setNewBio] = useState("");
    const [pageOwner, setPageOwner] = useState(null);
    const [isMine, setIsMine] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        if(!!userInfo) {
            setUser(userInfo);
        }
        if(!!currentUserID) {
            setPageOwner(currentUserID);
        }
        if(!!user && !!pageOwner) {
            setIsMine(user.id === pageOwner);
        }
    }, [userInfo, currentUserID]);

	useEffect(() => {
        const fetchMovies = async () => {
            setFavoriteMovies(await getUserFavorites(id));
        }
        fetchMovies();
        }, []);

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
			await updateUserProfile(profileUpdateInfo, user.token);

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
	}, [profilePic])
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
						<button
							className={`Button ${
								isMyPage ? "" : "hidden"
							}`}
							onClick={handleEditClick}>
							Edit Profile
						</button>
                        <div className="FavoriteMovies">
							<h2 className="Title">Favorite Movies</h2>
							<div className="GridContainer GridProfile">
								{/* Change movie poster text to the movie poster image from the backend */}
								{/* replace with all of user's favorite movies */}
                                {favoriteMovies?.map((movie,index) => (
                                    <Link to={`/MovieLanding/${movie.id}`}key ={index}>
				
									<h3 key={movie.id} className="MovieProfile">
										<img
											src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
										/>
									</h3>
									</Link>
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
