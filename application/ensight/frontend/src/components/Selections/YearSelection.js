import React, { useState } from "react";
import '../../assets/styles/pages/Browse.css';
import Checkbox from '../../components/Checkbox.js';

const YearSelection = ({ onYearChange }) => {
  const [yearSelection, setYearSelection] = useState({
    Upcoming: false,
    "2020": false,
    "2010": false,
    "2000": false,
    "1990": false,
    "1980": false,
    "1970": false,
    "1960": false,
    "1950": false,
    "1940": false,
    "1930": false,
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
          checked={yearSelection["2020"]}
          onChange={(isChecked) => handleYearChange("2020", isChecked)}
        />
        <Checkbox
          label="2010s"
          checked={yearSelection["2010"]}
          onChange={(isChecked) => handleYearChange("2010", isChecked)}
        />
        <Checkbox
          label="2000s"
          checked={yearSelection["2000"]}
          onChange={(isChecked) => handleYearChange("2000", isChecked)}
        />
        <Checkbox
          label="1990s"
          checked={yearSelection["1990"]}
          onChange={(isChecked) => handleYearChange("1990", isChecked)}
        />
        <Checkbox
          label="1980s"
          checked={yearSelection["1980"]}
          onChange={(isChecked) => handleYearChange("1980", isChecked)}
        />
        <Checkbox
          label="1970s"
          checked={yearSelection["1970"]}
          onChange={(isChecked) => handleYearChange("1970", isChecked)}
        />
        <Checkbox
          label="1960s"
          checked={yearSelection["1960"]}
          onChange={(isChecked) => handleYearChange("1960", isChecked)}
        />
        <Checkbox
          label="1950s"
          checked={yearSelection["1950"]}
          onChange={(isChecked) => handleYearChange("1950", isChecked)}
        />
        <Checkbox
          label="1940s"
          checked={yearSelection["1940"]}
          onChange={(isChecked) => handleYearChange("1940", isChecked)}
        />
        <Checkbox
          label="1930s"
          checked={yearSelection["1930"]}
          onChange={(isChecked) => handleYearChange("1930", isChecked)}
        />
      </div>
    </div>
  );
}

export default YearSelection;
