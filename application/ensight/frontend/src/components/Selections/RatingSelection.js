import React, { useState } from "react";
import '../../assets/styles/pages/Browse.css';

const Browse = () => {
  const [ratingOption, setRatingOption] = useState('highest');

  const handleRatingChange = (event) => {
    setRatingOption(event.target.value);
  };

  return (
    <div className="Selection">
        <h4 className="SelectionTitle">Rating</h4>
        <div className="PrivacyChoice">
          <label>
              <input
                  className="PrivacyButton"
                  type="radio"
                  value="highest"
                  checked={ratingOption === 'highest'}
                  onChange={handleRatingChange}
              />
              <span className="RadioDetail" />
              Highest
          </label>
          <label>
              <input
                  className="PrivacyButton"
                  type="radio"
                  value="lowest"
                  checked={ratingOption === 'lowest'}
                  onChange={handleRatingChange}
              />
              <span className="RadioDetail" />
              Lowest
          </label>
      </div>
    </div>
  );
}

export default Browse;