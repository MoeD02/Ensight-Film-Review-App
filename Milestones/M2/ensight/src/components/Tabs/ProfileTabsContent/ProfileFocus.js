import React from "react";
import '../../../assets/styles/components/ProfileTabs.css';

const ProfileFocus = () => {
    return (
        <div className="Content">
            {/* only appears when the user is on their page*/}
            <button className="Button">Edit Profile</button>
            <div className="FavoriteMovies">
                <h2>Favorite Movies</h2>
                <div className="GridContainer GridProfile">
                    <h3 className="MovieProfile">Movie Poster</h3>
                    <h3 className="MovieProfile">Movie Poster</h3>
                    <h3 className="MovieProfile">Movie Poster</h3>
                    <h3 className="MovieProfile">Movie Poster</h3>
                    <h3 className="MovieProfile">Movie Poster</h3>
                    <h3 className="MovieProfile">Movie Poster</h3>
                    {/* this should be kept so the user can add more movies unless viewing a profile*/}
                    <button className="MovieProfile AddMovie">+</button>
                </div>
            </div>
        </div>
    );
};
export default ProfileFocus