import React from "react";
import '../../assets/styles/pages/Browse.css';
import Checkbox from '../../components/Checkbox.js';

const Browse = () => {
  return (
    <div className="Selection">
        <h4 className="SelectionTitle">Year</h4>
        <div className="Labels">
          <Checkbox label='Upcoming'/>
          <Checkbox label='2020s'/>
          <Checkbox label='2010s'/>
          <Checkbox label='2000s'/>
          <Checkbox label='1990s'/>
          <Checkbox label='1980s'/>
          <Checkbox label='1970s'/>
          <Checkbox label='1960s'/>
          <Checkbox label='1950s'/>
          <Checkbox label='1940s'/>
          <Checkbox label='1930s'/>
        </div>
    </div>
  );
}

export default Browse;