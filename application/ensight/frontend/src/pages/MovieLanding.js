import React, { useState, useEffect, useRef } from "react";
import '../assets/styles/pages/MovieLanding.css';
import LikeButton from "../components/LikeButton";
import StarFilled from "../assets/images/star_filled.png";
import StarUnfilled from "../assets/images/star_unfilled.png";
import TopCast from "../components/MoviePage/TopCast";
import Review from "../components/MoviePage/Review";
import ReviewPopup from "../components/ReviewPopUp";
import RatingPopup from "../components/RatingPopUp";

const MovieLanding = () => {
    const [onWatchlist, setOnWatchlist] = useState(false);
    const [hoverDisabled, setHoverDisabled] = useState(false);
    const [isVideoVisible, setVideoVisible] = useState(false);
    const titleRef = useRef(null);

    // this is used to resize and make the title fit on screen
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
            <div className="MovieHorizontalPoster" />
            <div className="MovieLandingContent">
                <div className="video-container">
                    {isVideoVisible && (
                        <iframe
                            src={embedUrl}
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
                        {/* <button className="Button TrailerButton" onClick={toggleVideoVisibility}>
                            {isVideoVisible ? "Hide Trailer" : "Watch Trailer"}
                    </button> */}
                        <LikeButton />
                    </div>
                    <h3 ref={titleRef} className="MovieLandingTitle">Movie Title</h3>
                    <div className="MovieLandingYearGenre">
                        <h6>Year</h6>
                        <div className="MovieLandingGenre">
                            <h6>Genre1</h6>
                            <h6>Genre2</h6>
                            <h6>Genre3</h6>
                        </div>
                    </div>
                    <div className="MovieLandingSypnosis">
                        <h3>
                            This will be the Movie's Sypnosis. 
                            It will give a brief description of what the movie is about 
                            but not enough information to spoil the movie. 
                            It should be short and about 3-4 sentences. 
                            For the Avatar example, it was 3 sentences long.
                        </h3>
                        <div className="LandingRatingWatchlist">
                            <div className="EnsightRating">
                                <h6 className="RatingText">Ensight RATING</h6>
                                <div className="MovieRating">
                                    <img className="MovieSymbol" src={StarFilled} alt="star" width={30} height={28}/>
                                    <div className="MovieSpecificRating">
                                        <h5>4.4</h5>
                                        <h5 id="MovieTotalRating">/5</h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6 className="RatingText">YOUR RATING</h6>
                                <div className="UserRating">
                                    <img className="MovieSymbol" src={StarUnfilled} alt="unstar" width={30} height={28}/>
                                    <RatingPopup title="Movie Title"/>
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
                                    <h4>Director</h4>
                                </div>
                            </div>
                            <div className="MovieCastDetails">
                                <h4 className="MovieCastTitle">Writers</h4>
                                <div className="MovieCastName">
                                    <h4>Writer1</h4>
                                    <h4>Writer1</h4>
                                    <h4>Writer1</h4>
                                </div>
                            </div>
                            <div className="MovieCastDetails">
                                <h4 className="MovieCastTitle">Stars</h4>
                                <div className="MovieCastName">
                                    <h4>Star1</h4>
                                    <h4>Star2</h4>
                                    <h4>Star3</h4>
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
                        <TopCast />
                        <TopCast />
                        <TopCast />
                        <TopCast />
                        <TopCast />
                    </div>
                </div>
                <div className="MovieLandingReview">
                    <div className="LandingReviewTop">
                        <h1>Reviews</h1>
                        <ReviewPopup title="Movie Title"/>
                    </div>
                    <div className="MovieTotalReviews">
                        <Review type="Review"/>
                        <Review type="Review"/>
                        <Review type="Review"/>
                        <Review type="Review"/>
                        <Review type="Review"/>
                        <Review type="Review"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieLanding;
