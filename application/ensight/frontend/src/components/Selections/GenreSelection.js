import React, { useState } from "react";
import "../../assets/styles/pages/Browse.css";
import Checkbox from "../../components/Checkbox.js";

const GenreSelection = ({ onGenreChange }) => {
  const [genreSelection, setGenreSelection] = useState({
    Action: false,
    Adventure: false,
    Animation: false,
    Comedy: false,
    Crime: false,
    Documentary: false,
    Drama: false,
    Family: false,
    Fantasy: false,
    History: false,
    Horror: false,
    Music: false,
    Mystery: false,
    Romance: false,
    "Science Fiction": false,
    Thriller: false,
    "TV Movie": false,
    War: false,
    Western: false,
  });



  const handleGenreChange = (genre, isChecked) => {
    setGenreSelection((prevSelection) => ({
      ...prevSelection,
      [genre]: isChecked,
    }));
    onGenreChange({ ...genreSelection, [genre]: isChecked }); // Pass the updated genreSelection
  };

  //console.log(genreSelection);

  return (
    <div className="Selection">
      <h4 className="SelectionTitle">Genre</h4>
      <div className="Labels">
        <Checkbox
          label="Action"
          checked={genreSelection.Action}
          onChange={(isChecked) => handleGenreChange("Action", isChecked)}
        />
        <Checkbox
          label="Adventure"
          checked={genreSelection.Adventure}
          onChange={(isChecked) => handleGenreChange("Adventure", isChecked)}
        />
        <Checkbox
          label="Animation"
          checked={genreSelection.Animation}
          onChange={(isChecked) => handleGenreChange("Animation", isChecked)}
        />
        <Checkbox
          label="Comedy"
          checked={genreSelection.Comedy}
          onChange={(isChecked) => handleGenreChange("Comedy", isChecked)}
        />
        <Checkbox
          label="Crime"
          checked={genreSelection.Crime}
          onChange={(isChecked) => handleGenreChange("Crime", isChecked)}
        />
        <Checkbox
          label="Documentary"
          checked={genreSelection.Documentary}
          onChange={(isChecked) => handleGenreChange("Documentary", isChecked)}
        />
        <Checkbox
          label="Drama"
          checked={genreSelection.Drama}
          onChange={(isChecked) => handleGenreChange("Drama", isChecked)}
        />
        <Checkbox
          label="Family"
          checked={genreSelection.Family}
          onChange={(isChecked) => handleGenreChange("Family", isChecked)}
        />
        <Checkbox
          label="Fantasy"
          checked={genreSelection.Fantasy}
          onChange={(isChecked) => handleGenreChange("Fantasy", isChecked)}
        />
        <Checkbox
          label="History"
          checked={genreSelection.History}
          onChange={(isChecked) => handleGenreChange("History", isChecked)}
        />
        <Checkbox
          label="Horror"
          checked={genreSelection.Horror}
          onChange={(isChecked) => handleGenreChange("Horror", isChecked)}
        />
        <Checkbox
          label="Music"
          checked={genreSelection.Music}
          onChange={(isChecked) => handleGenreChange("Music", isChecked)}
        />
        <Checkbox
          label="Mystery"
          checked={genreSelection.Mystery}
          onChange={(isChecked) => handleGenreChange("Mystery", isChecked)}
        />
        <Checkbox
          label="Romance"
          checked={genreSelection.Romance}
          onChange={(isChecked) => handleGenreChange("Romance", isChecked)}
        />
        <Checkbox
          label="Science Fiction"
          checked={genreSelection["Science Fiction"]}
          onChange={(isChecked) =>
            handleGenreChange("Science Fiction", isChecked)
          }
        />
        <Checkbox
          label="Thriller"
          checked={genreSelection.Thriller}
          onChange={(isChecked) => handleGenreChange("Thriller", isChecked)}
        />
        <Checkbox
          label="TV Movie"
          checked={genreSelection["TV Movie"]}
          onChange={(isChecked) => handleGenreChange("TV Movie", isChecked)}
        />
        <Checkbox
          label="War"
          checked={genreSelection.War}
          onChange={(isChecked) => handleGenreChange("War", isChecked)}
        />
        <Checkbox
          label="Western"
          checked={genreSelection.Western}
          onChange={(isChecked) => handleGenreChange("Western", isChecked)}
        />
      </div>
    </div>
  );
};

export default GenreSelection;