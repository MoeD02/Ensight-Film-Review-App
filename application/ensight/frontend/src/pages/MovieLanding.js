// MovieLanding.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import '../assets/styles/pages/MovieLanding.css';
import LikeButton from "../components/LikeButton";
import StarFilled from "../assets/images/star_filled.png";
import StarUnfilled from "../assets/images/star_unfilled.png";
import TopCast from "../components/MoviePage/TopCast";
import Review from "../components/MoviePage/Review";
import ReviewPopup from "../components/ReviewPopUp";
import RatingPopup from "../components/RatingPopUp";
import { addToFavorites, removeFromFavorites, getMovieDetails, isLikedByUser, initUser } from "../APIcalls";

// const initUser = async () => {
//     let token = localStorage.getItem('Authorization');
//     if(token) {
//         const user = await getCurrentUser(token);

//         if(user != null) {
//             return {
//                 name: user.username,
//                 id: user.id,
//                 token: token,
//             }
//         }
//         else {
//             // remove expired token
//             localStorage.removeItem('Authorization');
//         }
//     }
//     return null;
// };


const MovieLanding = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const { id } = useParams();
//    const [authToken, setAuthToken] = useState(initAuth);
    const [liked, setLiked] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initPage = async () => {
            let userInfo = await initUser();
            if(!!userInfo) {
                setUser(userInfo);
                let likeInfo = await isLikedByUser(userInfo.id, id);
                setLiked(likeInfo.data);
            }
        }
        initPage();
    }, []);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const data = await getMovieDetails(id);
            if (data) {
                setMovieDetails(data);
            }
        };

        fetchMovieDetails();
    }, [id]);



    const [onWatchlist, setOnWatchlist] = useState(false);
    const [hoverDisabled, setHoverDisabled] = useState(false);
    const [isVideoVisible, setVideoVisible] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const adjustFontSize = () => {
            const titleElement = titleRef.current;
            if (titleElement) {
                const containerWidth = titleElement.parentElement.offsetWidth;

                titleElement.style.fontSize = "50px";

                const titleWidth = titleElement.scrollWidth;
                if (titleWidth > containerWidth) {
                    const newFontSize = (containerWidth / titleWidth) * parseFloat(window.getComputedStyle(titleElement).fontSize);
                    titleElement.style.fontSize = `${newFontSize}px`;
                }
            }
        };

        adjustFontSize();
        window.addEventListener("resize", adjustFontSize);
        return () => {
            window.removeEventListener("resize", adjustFontSize);
        };
    }, [isVideoVisible]);

    

    const toggleWatchlist = () => {
        if (!onWatchlist) {
            setOnWatchlist(true);
            setHoverDisabled(true);
        }
    }

    const toggleVideoVisibility = () => {
        setVideoVisible(!isVideoVisible);
    }
    const add_to_favorites = async (movie, auth) => {
        try {
            const data = await addToFavorites(movie, auth);
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Failed to add movie to favorites', error);
        }
    };
    const remove_from_favorites = async (movie, auth) => {
        try {
            const resp = await removeFromFavorites(movie, auth);
        }
        catch (error) {
            console.error('remove_from_favorites failed')
        }
    }

    return (
        <div className="MovieLandingPageStyle">
            {movieDetails ? (
                <>
                     <div className="MovieHorizontalPoster">
            {/* Inline styles using the style attribute */}
            <div
                style={{
                    position: 'absolute',
                    zIndex: -1,
                    width: '100%',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    background:`url(http://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
                    maskImage: 'linear-gradient(black 85%, transparent)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </div>
                    <div className="MovieLandingContent">
                        <div className="video-container">
                            {isVideoVisible && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${movieDetails.trailer_path}`}
                                    title="Movie Trailer"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                        <div className="MovieLandingInformation">
                            <div className="MovieLandingFavorite">
                                <button
                                    className="create-list-button custom-button trailer-button"
                                    onClick={toggleVideoVisibility}>
                                    {isVideoVisible ? "Hide Trailer" : "Watch Trailer"}
                                </button>
                                {!!user
                                    ? <LikeButton
                                        checked={liked} 
                                        id={id} user={user} 
                                        Check={add_to_favorites}
                                        Uncheck={remove_from_favorites} 
                                        />
                                    : <></>
                                }
                            </div>
                            <h3 ref={titleRef} className="MovieLandingTitle">{movieDetails.title}</h3>
                            <div className="MovieLandingYearGenre">
                                <h6>{movieDetails.release_date}</h6>
                                <div className="MovieLandingGenre">
                                    {movieDetails.genres && movieDetails.genres.map((genre, index) => (
                                        <h6 key={index}>{genre}</h6>
                                    ))}
                                </div>
                            </div>
                            <div className="MovieLandingSypnosis">
                                <h3>{movieDetails.description}</h3>
                                <div className="LandingRatingWatchlist">
                                    <div className="EnsightRating">
                                        <h6 className="RatingText">Ensight RATING</h6>
                                        <div className="MovieRating">
                                            <img className="MovieSymbol" src={StarFilled} alt="star" width={30} height={28} />
                                            <div className="MovieSpecificRating">
                                                <h5>{movieDetails.rating_average}</h5>
                                                <h5 id="MovieTotalRating">/10</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="RatingText">YOUR RATING</h6>
                                        <div className="UserRating">
                                            <img className="MovieSymbol" src={StarUnfilled} alt="unstar" width={30} height={28} />
                                            <RatingPopup title={movieDetails.title} />
                                        </div>
                                    </div>
                                    <button
                                        className={`create-list-button custom-button movie-watch-button ${onWatchlist ? 'on-watchlist' : ''}`}
                                        onClick={toggleWatchlist}
                                        disabled={onWatchlist}
                                        style={{ pointerEvents: hoverDisabled ? "none" : "auto" }}
                                    >
                                        {onWatchlist ? "On Watchlist" : "Add to Watchlist"}
                                    </button>
                                </div>
                                <div className="MovieLandingCast">
                                    <div className="MovieCastDetails">
                                        <h4 className="MovieCastTitle">Director</h4>
                                        <div className="MovieCastName">
                                            <h4>{movieDetails.director}</h4>
                                        </div>
                                    </div>
                                    <div className="MovieCastDetails">
                                        <h4 className="MovieCastTitle">Writers</h4>
                                        <div className="MovieCastName">
                                            {movieDetails?.writers && movieDetails.writers.map((writer, index) => (
                                                <h4 key={index}>{writer}</h4>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="MovieCastDetails">
                                        <h4 className="MovieCastTitle">Stars</h4>
                                        <div className="MovieCastName">
                                            {movieDetails?.stars && movieDetails.stars.map((star, index) => (
                                                <h4 key={index}>{star}</h4>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="MovieLandingDetails">
                        <div className="MovieLandingTopCast">
                            <h1>Top Cast</h1>
                            <div className="MovieTotalTopCasts">
                                {movieDetails?.top_cast && movieDetails.top_cast.map((cast, index) => (
                                    <TopCast key={index} {...cast} />
                                ))}
                            </div>
                        </div>
                        <div className="MovieLandingReview">
                            <div className="LandingReviewTop">
                                <h1>Reviews</h1>
                                <ReviewPopup title={movieDetails.title} />
                            </div>
                            <div className="MovieTotalReviews">
                                {movieDetails?.reviews && movieDetails.reviews.map((review, index) => (
                                    <Review key={index} type="Review" {...review} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MovieLanding;
