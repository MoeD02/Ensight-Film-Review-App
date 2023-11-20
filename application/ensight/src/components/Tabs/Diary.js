import React, { useState } from "react";
import '../../assets/styles/components/ProfileTabs.css';
import LikeButton from "../LikeButton";
import StarFilled from "../../assets/images/star_filled.png";
import StarUnfilled from "../../assets/images/star_unfilled.png";

const Diary = ({ likes, starsFill }) => {
  const [isReviewViewed, setIsReviewViewed] = useState(true);


  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= starsFill) {
        stars.push(<img key={i} src={StarFilled} alt="Star Filled" width={30} height={28} />);
      } else {
        stars.push(<img key={i} src={StarUnfilled} alt="Star Unfilled" width={30} height={28} />);
      }
    }
    return stars;
  };

  const handleReviewClick = () => {
    setIsReviewViewed(!isReviewViewed);
  };

  const borderImageStyle = {
    borderImage: `linear-gradient(
      to bottom left,
      #E11708 20%,
      transparent ${isReviewViewed ? "95%" : "75%"}
    ) 1`,
  };

  return (
    <div className="DiaryContent">
      <div className="DiaryDetails" style={borderImageStyle}>
        <div className="DiaryLeft">
          <h3>12/30/2023</h3>
          <span className="DiaryPoster" />
          <h2>Movie Title</h2>
        </div>
        <div className="DiaryRight">
          <LikeButton />
          <h5>{likes} {likes === 1 ? 'like' : 'likes'}</h5>
          <div className="DiaryRateContent">
            <h4>Rating</h4>
            <div className="DiaryRating">
              {renderRatingStars()}
            </div>
          </div>
        </div>
      </div>
      <div className={isReviewViewed ? "" : "DiaryReview"}>
        {isReviewViewed ? (
            <span className="DisplayViewButton" onClick={handleReviewClick}>View Note</span>
        ) : (
            <>
                <p className="DisplayDiaryReview">
                    The Way of Water dives deep into a mesmerizing aquatic world, breathing new life into the beloved saga. The visuals are breathtaking, transporting us to a dazzling underwater realm. The story keeps you hooked, though some plot elements felt familiar.
                </p>
                <span className="DisplayHideButton" onClick={handleReviewClick}>Hide Note</span>
            </>
        )}
      </div>
    </div>
  );
};

export default Diary;