import React, { useState } from 'react';

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Choose Genre</option>
        <option value="1">Mystery</option>
        <option value="2">Action</option>
        <option value="3">Comedy</option>
      </select>
    </div>
  );
};

export default GenreSelection;