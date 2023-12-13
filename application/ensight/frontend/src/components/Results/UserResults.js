import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/pages/Browse.css";
import {
    searchUsers,
    getUsers,
    getUserStats,
    getUser,
    isFollowingArray,
    getUserResults,
    followUser,
    unfollowUser,
} from "../../APIcalls.js";
import FollowButton from "../FollowButton.js";

const UserResults = ({ searchTerm, user }) => {
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [selfUser, setSelfUser] = useState(null);
    const FollowUser = {
        borderRadius: "100px",
    };
    useEffect(() => {
        setSelfUser(user);
    }, [user]);

    useEffect(() => {
        let data;
        const fetchData = async () => {
            if (searchTerm != null) {
                // data = await searchUsers(searchTerm);
                // try {
                //     if (data) {
                //         const updatedData = await Promise.all(
                //             data.map(async (user) => {
                //                 const stats = await getUserStats(user.id);
                //                 const followInfo = await isFollowingArray(
                //                     authToken
                //                 );
                //                 return { ...user, stats, followed };
                //             })
                //         );
                //         setUserData(updatedData);
                //     } else {
                //         console.error("Failed to fetch user data");
                //     }
                // } catch (error) {
                //     console.error("Error while accessing id", error);
                // }
                setUserData(
                    (await searchUsers(selfUser.token, searchTerm)).userInfo
                );
            } else {
                setUserData((await getUserResults(selfUser.token)).userInfo);
            }
        };
        if (!!selfUser) {
            fetchData();
        }
    }, [searchTerm, selfUser]);
    // useEffect(() => {
    //     let data;
    //     if (searchTerm != null) {
    //         data = await searchUsers(searchTerm);
    //     } else {
    //         data = await getUsers("highest_followers", 5);
    //     }
    //     try {
    //         if (data) {
    //             const updatedData = await Promise.all(
    //                 data.map(async (user) => {
    //                     const stats = await getUserStats(user.id);
    //                     const followInfo = await isFollowingArray(authToken, )
    //                     return { ...user, stats, followed };
    //                 })
    //             );
    //             setUserData(updatedData);
    //         } else {
    //             console.error("Failed to fetch user data");
    //         }
    //     } catch (error) {
    //         console.error("Error while accessing id", error);
    //     }

    //     fetchData();
    // }, [searchTerm]);
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
            {!!userData &&
                userData.map((userInfo, index) => (
                    <div className="ResultContent Results" key={index}>
                        <div className="UserResults">
                            <img
                                className="UserPicResults"
                                src={`https://ensight.space${userInfo.user.avatar}`}
                                alt={`User ${userInfo.user}'s avatar`}
                            />

                            <div className="MoviePosterDetails">
                                <Link
                                    to={`/Profile/${userInfo.user.id}/profile`}
                                    className="browse-link"
                                    key={index}
                                >
                                    <h5 className="MoviePosterTitle">
                                        {userInfo.user.user}
                                    </h5>
                                </Link>
                                <h6 className="MoviePosterStars">
                                    {userInfo.user.bio}
                                </h6>
                            </div>
                        </div>

                        <div className="ResultExtra">
                            <div className="ResultExtraInfo">
                                <h3>{userInfo.num_lists}</h3>
                                <h3 className="ResultStatement">lists</h3>
                            </div>
                            <div className="ResultExtraInfo">
                                <h3>{userInfo.num_following}</h3>
                                <h3 className="ResultStatement">following</h3>
                            </div>
                            <div className="ResultExtraInfo">
                                <h3>{userInfo.num_followers}</h3>
                                <h3 className="ResultStatement">followers</h3>
                            </div>

                            {userInfo.following ? (
                                <button
                                    className={"button following"}
                                    onClick={() => unfollowUser(userInfo.user.id, selfUser.token)}
                                >
                                    Following
                                </button>
                            ) : (
                                <button
                                    className={"button follow"}
                                    onClick={() => followUser(userInfo.user.id, selfUser.token)}
                                >
                                    Follow +
                                </button>
                            )}
                            {/* {!!currentUser &&
                            <FollowButton
                                userToFollowId={userInfo.user.id}
                                followUser={follow_user} // Use the individual user's followed state
                                currentUser={selfUser}
                                isFollowed={userInfo.following}
                            />
                        : (
                            <></>
                        ) } */}
                        </div>
                    </div>
                ))}
        </>
    );
};

export default UserResults;
