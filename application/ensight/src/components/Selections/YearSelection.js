import React, { useState } from "react";
import '../../assets/styles/pages/Browse.css';
import Checkbox from '../../components/Checkbox.js';

const YearSelection = ({ onYearChange }) => {
  const [yearSelection, setYearSelection] = useState({
    Upcoming: false,
    "2020s": false,
    "2010s": false,
    "2000s": false,
    "1990s": false,
    "1980s": false,
    "1970s": false,
    "1960s": false,
    "1950s": false,
    "1940s": false,
    "1930s": false,
  });

  const handleYearChange = (year, isChecked) => {
    setYearSelection((prevSelection) => ({
      ...prevSelection,
      [year]: isChecked,
    }));
    onYearChange({ ...yearSelection, [year]: isChecked });
  };

  return (
    <div className="Selection">
      <h4 className="SelectionTitle">Year</h4>
      <div className="Labels">
        <Checkbox
          label="Upcoming"
          checked={yearSelection.Upcoming}
          onChange={(isChecked) => handleYearChange("Upcoming", isChecked)}
        />
        <Checkbox
          label="2020s"
          checked={yearSelection["2020s"]}
          onChange={(isChecked) => handleYearChange("2020s", isChecked)}
        />
        <Checkbox
          label="2010s"
          checked={yearSelection["2010s"]}
          onChange={(isChecked) => handleYearChange("2010s", isChecked)}
        />
        <Checkbox
          label="2000s"
          checked={yearSelection["2000s"]}
          onChange={(isChecked) => handleYearChange("2000s", isChecked)}
        />
        <Checkbox
          label="1990s"
          checked={yearSelection["1990s"]}
          onChange={(isChecked) => handleYearChange("1990s", isChecked)}
        />
        <Checkbox
          label="1980s"
          checked={yearSelection["1980s"]}
          onChange={(isChecked) => handleYearChange("1980s", isChecked)}
        />
        <Checkbox
          label="1970s"
          checked={yearSelection["1970s"]}
          onChange={(isChecked) => handleYearChange("1970s", isChecked)}
        />
        <Checkbox
          label="1960s"
          checked={yearSelection["1960s"]}
          onChange={(isChecked) => handleYearChange("1960s", isChecked)}
        />
        <Checkbox
          label="1950s"
          checked={yearSelection["1950s"]}
          onChange={(isChecked) => handleYearChange("1950s", isChecked)}
        />
        <Checkbox
          label="1940s"
          checked={yearSelection["1940s"]}
          onChange={(isChecked) => handleYearChange("1940s", isChecked)}
        />
        <Checkbox
          label="1930s"
          checked={yearSelection["1930s"]}
          onChange={(isChecked) => handleYearChange("1930s", isChecked)}
        />
      </div>
    </div>
  );
}

export default YearSelection;
