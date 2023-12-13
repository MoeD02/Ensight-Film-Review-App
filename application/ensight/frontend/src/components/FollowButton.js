import React, { useState, useEffect } from "react";
import "../assets/styles/components/FollowButton.css";
import { getUser, isFollowedByUser, followUser, unfollowUser } from "../APIcalls";

const FollowButton = ({
    style,
    userToFollowId,
    isFollowed,
    // followUser,
    // unfollowUser,
    currentUser,
}) => {
    const [isFollowing, setIsFollowing] = useState(null);
    const [parentId, setParentId] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        setIsFollowing((prev)=>isFollowed);
    }, [isFollowed]);
    useEffect(() => {
        setParentId(userToFollowId);
    }, [userToFollowId]);
    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const toggleFollow = async (event) => {
        if(event.target.getAttribute("id") == "unfollow") {
            unfollowUser(parentId, user.token)
            setIsFollowing(false)
        }
        else {
            followUser(parentId, user.token)
            setIsFollowing(true)
        }
    }
    //     try {
    //         // Call the followUser function passed as a prop
    //         await followUser(userToFollowId);

    //         // Toggle the local state
    //         setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    //     } catch (error) {
    //         console.error("Failed to follow the user", error);
    //     }
    // };
    // useEffect(() => {
    //     const checkIsFollowing = async () => {
    //         try {
    //             console.log("Checking isFollowing:", currentUser);
    //             const followInfo = await isFollowedByUser(
    //                 currentUser.id,
    //                 userToFollowId,
    //                 currentUser.token
    //             );
    //             console.log("FollowInfo:", followInfo);
    //             setIsFollowing(followInfo ? followInfo.is_following : false);
    //         } catch (error) {
    //             console.error(
    //                 "Failed to check if the user is following",
    //                 error
    //             );
    //         }
    //     };
    //     checkIsFollowing();
    // }, [currentUser.id, userToFollowId, currentUser.token]);

    return (
        <>
        {isFollowing === false ?
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
