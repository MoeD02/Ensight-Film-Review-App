import React, { useState, useRef } from "react";
import '../../../assets/styles/components/ProfileTabs.css';

const ProfileFocus = () => {
    const [privacyOption, setPrivacyOption] = useState('public');
    const [isEditing, setIsEditing] = useState(true);
    const setProfilePic = useState(null);
    const fileInputRef = useRef(null);


    const handlePrivacyChange = (event) => {
        setPrivacyOption(event.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(true);
    };

    const handleSubmitClick = () => {
        setIsEditing(true);
    };

    const handleProfilePicChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setProfilePic(selectedFile);
        }
    };

    return (
        <div className="Content">
            <div className={isEditing ? "ProfileView" : "ProfileEdit"}>
                {isEditing ? (
                    <>
                        {/* only appears when the user is on their profile */}
                        <button className="Button" onClick={handleEditClick}>Edit Profile</button>
                        <div className="FavoriteMovies">
                            <h2 className="Title">Favorite Movies</h2>
                            <div className="GridContainer GridProfile">
                                {/* Change movie poster text to the movie poster image from the backend */}
                                {/* replace with all of user's favorite movies */}
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                                <h3 className="MovieProfile">Movie Poster</h3>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="EditRowA">
                            <div className="Username">
                                <h2 className="ProfileTitle">Username</h2>
                                {/* users can change their name here */}
                                <input className="User" placeholder="Username"></input>
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
                                            checked={privacyOption === 'public'}
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
                                            checked={privacyOption === 'private'}
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
                                <textarea className="BioText" placeholder="Enter a bio" />
                            </div>
                            <button className="Button LeftB" onClick={handleCancelClick}>Cancel</button>
                            {/* any changes are saved */}
                            <button className="Button RightB" onClick={handleSubmitClick}>Save</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileFocus;