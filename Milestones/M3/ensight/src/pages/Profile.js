import React from "react";
import ProfileTabs from '../components/Tabs/ProfileTabs';
import '../assets/styles/pages/Profile.css';

// only look at profile, watchlist, and lists
const Profile = () => {
    return (
        <div>
            <div className="UserInformation">
                <span className="UserPic"></span>
                <div className="UserText">
                    <h1 className="Username">Username</h1>
                    <h3 className="BioDesc">This is a description</h3>
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
            <ProfileTabs />
        </div>
    );
}

export default Profile;