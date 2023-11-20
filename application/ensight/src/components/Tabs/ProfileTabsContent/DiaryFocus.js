import React, { useState, useRef } from "react";
import "../../../assets/styles/components/ProfileTabs.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Diary from "../Diary";
import StarFilled from "../../../assets/images/star_filled.png";
import StarUnfilled from "../../../assets/images/star_unfilled.png";
import WhitePencil from "../../../assets/images/white_pencil.png";

const DiaryFocus = () => {
  const [filledStars, setFilledStars] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [showDiaryCreation, setShowDiaryCreation] = useState(true);
  const [showMovieDiary, setShowMovieDiary] = useState(false);
  const [showDiaryCreationDetail, setShowDiaryCreationDetail] = useState(false);
  const datePickerRef = useRef(null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleStarClick = (index) => {
    if (index === filledStars - 1) {
      setFilledStars(0);
    } else {
      setFilledStars(index + 1);
    }
  };

  const handleDiaryCreationClick = () => {
    setShowDiaryCreation(false);
    setShowMovieDiary(true);
    setShowDiaryCreationDetail(false);
  };

  const handleMovieDiaryClick = (movieNumber) => {
    setShowDiaryCreation(false);
    setShowMovieDiary(false);
    setShowDiaryCreationDetail(true);
    setFilledStars(0);
    setStartDate(new Date());

    setSelectedMovie(movieNumber);
  };

  const handleSaveCancelClick = () => {
    setShowDiaryCreation(true);
    setShowMovieDiary(false);
    setShowDiaryCreationDetail(false);
  };

  const openCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div>
      {showDiaryCreation && (
        <div>
          <Diary likes={30} starsFill={3} />
          <Diary likes={2454} starsFill={1} />
          <Diary likes={1} starsFill={5} />
          <div className="DiaryCreation" onClick={handleDiaryCreationClick}>
            <h2>Add a Diary Entry</h2>
          </div>
        </div>
      )}

      {showMovieDiary && (
        <div className="SearchMovieDiary">
          {/* Your Movie Diary content here */}
          <div class="MovieSearch DiarySearch">
            <input
              className="SearchInput DiaryInput"
              type="text"
              placeholder="Search Movie"
            />
            <button class="SearchButton DiaryButton">Search</button>
          </div>
          <div className="DiaryMovieResults">
            {/*
            <span className="MovieDiary Movie1" onClick={handleMovieDiaryClick} />
            <span className="MovieDiary Movie2" onClick={handleMovieDiaryClick} />
            <span className="MovieDiary Movie3" onClick={handleMovieDiaryClick} />
            */}
            <span
              className="MovieDiary Movie1"
              onClick={() => handleMovieDiaryClick(1)}
            />
            <span
              className="MovieDiary Movie2"
              onClick={() => handleMovieDiaryClick(2)}
            />
            <span
              className="MovieDiary Movie3"
              onClick={() => handleMovieDiaryClick(3)}
            />
          </div>
          <div className="DiaryCancelContainer">
            <button className="Button DiaryCancel" onClick={handleSaveCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDiaryCreationDetail && (
        <div className="DiaryContainer">
          <button className="Button DiaryBack" onClick={handleDiaryCreationClick}>Back &#8626;</button>
          <div className="DiaryCreationDetail">
            <span
              className={`DiaryMoviePosterLarge Movie${selectedMovie}`}
            />
            {/* <span className="DiaryMoviePosterLarge" /> */}
            <div className="DiaryMovieInfo">
              <h2>Movie Title</h2>
              <h4>Note</h4>
              <textarea />
              <div>
                <div className="DiaryRatingStarChoice">
                  <div className="DiaryStars">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <img
                          key={index}
                          className="MovieSymbol RatingStar"
                          src={
                            index < filledStars ? StarFilled : StarUnfilled
                          }
                          alt={
                            index < filledStars
                              ? "star-filled"
                              : "star-unfilled"
                          }
                          width={35}
                          height={32}
                          onClick={() => handleStarClick(index)}
                        />
                      ))}
                    <div className="DiaryMovieDate">
                      <h5>watched on:</h5>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        ref={datePickerRef}
                        onInputClick={openCalendar}
                        className="DiaryDateCalendar"
                      />
                      <img src={WhitePencil} alt="Pencil_Icon" onClick={openCalendar} className="PencilIcon" width={20} height={20}/>
                    </div>
                  </div>
                  <button className="Button DiarySave" onClick={handleSaveCancelClick}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryFocus;