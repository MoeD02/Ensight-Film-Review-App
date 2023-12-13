import React, { useState, useEffect } from "react";
import "../assets/styles/components/FollowButton.css";
import { getUser, isFollowedByUser, followUser, unfollowUser } from "../APIcalls";

const FollowButton = ({
    style,
    userToFollowId,
    userInfo,
    setUserInfo,
    // followUser,
    // unfollowUser,
    currentUser,
}) => {
    const [isFollowing, setIsFollowing] = useState(null);
    const [parentId, setParentId] = useState(null);
    const [user, setUser] = useState(null);
    // useEffect(() => {
    //     setIsFollowed(isFollowed);
    // }, [isFollowed]);
    useEffect(() => {
        setParentId(userToFollowId);
    }, [userToFollowId]);
    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const toggleFollow = async (event) => {
        if(event.target.getAttribute("id") == "unfollow") {
            unfollowUser(parentId, user.token)
            setUserInfo({
                ...userInfo,
                following: false,
            })
        }
        else {
            followUser(parentId, user.token)
            setUserInfo({
                ...userInfo,
                following: true,
            })
        }
    }

    return (
        <>
        {!userInfo.following ?
            <button
            style={style}
            id="follow"
            className={"button follow"}
            onClick={(event) => {toggleFollow(event)} }
            >
            Follow +
            </button>
            : <button
            style={style}
            id="unfollow"
            className={"button following"}
            onClick={(event) => {toggleFollow(event)}}
            >
            Following
            </button>
        }
        </>
    );
};

export default FollowButton;
