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
import { getMovieDetails } from "../APIcalls";

const MovieLanding = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const { id } = useParams();

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

    const embedUrl = `https://www.youtube.com/embed/d9MyW72ELq0`;

    const toggleWatchlist = () => {
        if (!onWatchlist) {
            setOnWatchlist(true);
            setHoverDisabled(true);
        }
    }

    const toggleVideoVisibility = () => {
        setVideoVisible(!isVideoVisible);
    }

    return (
        <div className="MovieLandingPageStyle">
            {movieDetails ? (
                <>
                    <div className="MovieHorizontalPoster" />
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
                                <LikeButton />
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
                                <h3>{movieDetails?.synopsis}</h3>
                                <div className="LandingRatingWatchlist">
                                    <div className="EnsightRating">
                                        <h6 className="RatingText">Ensight RATING</h6>
                                        <div className="MovieRating">
                                            <img className="MovieSymbol" src={StarFilled} alt="star" width={30} height={28} />
                                            <div className="MovieSpecificRating">
                                                <h5>{movieDetails.rating_average}</h5>
                                                <h5 id="MovieTotalRating">/5</h5>
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
                                            <h4>{movieDetails?.director}</h4>
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
