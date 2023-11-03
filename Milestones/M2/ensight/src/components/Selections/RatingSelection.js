import React, { useState } from 'react';

const RatingSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleRatingChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div>
      <select id="rating" value={selectedGenre} onChange={handleRatingChange}>
        <option value="">Choose Rating</option>
        <option value="1">Highest</option>
        <option value="2">Lowest</option>
      </select>
    </div>
  );
};

export default RatingSelection;