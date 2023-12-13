import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileTabs from "../components/Tabs/ProfileTabs";
import "../assets/styles/pages/Profile.css";
import { getUserProfileById, getUserStats, getUser, getUserFavorites } from "../APIcalls";

// only look at profile, watchlist, and lists
const Profile = () => {
    const { currentTab } = useParams();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isMyPage, setIsMyPage] = useState(null);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
        const initUser = async () => {
            setUser(await getUser());
            // let userInfo = await getUser();
            // if (!!userInfo) {
            //     setUser(userInfo);
            //     setIsMyPage(userInfo.id == id)
            // }
        };
        initUser();
    }, []);

    useEffect(() => {
        setIsMyPage(user?.id == id)
    }, [user])

    useEffect(() => {
        const fetchData = async () => {
            if(!!id){
                setCurrentUserProfile(await getUserProfileById(id));
                setUserStats(await getUserStats(id));
            };
        };
        fetchData();
    }, []); // Include id as a dependency

    // if(!!currentUserProfile) {
        return (
            <div>
                <div className="UserInformation">
                    {!!currentUserProfile?.avatar
                    ? (
                        <img
                            src={
                                "https://ensight.space" +
                                currentUserProfile.avatar
                            }
                            className="UserPic"
                        />
                    )
                    : (
                        <img
                            src={
                                "https://ensight.space/static/images/placeholder.png"
                            }
                            className="UserPic"
                        />
                    )}
                    <div className="UserText">
                        <h1 className="Username">{currentUserProfile?.user}</h1>
                        <h3 className="BioDesc">{currentUserProfile?.bio}</h3>
                    </div>
                    <div className="UserExtra">
                        <div className="UserExtraInfo">
                            {/* Replace # by the number of lists they made */}
                            <h1 className="UserTextInfo">
                                {userStats ? userStats.num_movie_lists : 0}
                            </h1>
                            <h2 className="UserTextInfo">Lists</h2>
                        </div>
                        <div className="UserExtraInfo">
                            {/* Replace # by the number of user they follow */}
                            <h1 className="UserTextInfo">
                                {userStats ? userStats.num_following : 0}
                            </h1>
                            <h2 className="UserTextInfo">Following</h2>
                        </div>
                        <div className="UserExtraInfo UserExtraR">
                            {/* Replace # by the number of user follow them */}
                            <h1 className="UserTextInfo">
                                {userStats ? userStats.num_followers : 0}
                            </h1>
                            <h2 className="UserTextInfo">Followers</h2>
                        </div>
                    </div>
                </div>
                <ProfileTabs
                    userInfo={user ? user : null}
                    currentTab={currentTab}
                    currentUserID={id}
                    currentUserProfile={currentUserProfile}
                    isMine={!!isMyPage}
                />
            </div>
        );
    // }
    // else {
    //     return <div>Loading...</div>
    // }
};

export default Profile;
