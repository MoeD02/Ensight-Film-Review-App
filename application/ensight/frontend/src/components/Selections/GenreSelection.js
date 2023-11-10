import React from "react";
import '../../assets/styles/pages/Browse.css';
import Checkbox from '../Checkbox.js';

const Browse = () => {
  return (
    <div className="Selection">
        <h4 className="SelectionTitle">Genre</h4>
        <div className="Labels">
          <Checkbox label='Action'/>
          <Checkbox label='Adventure'/>
          <Checkbox label='Animation'/>
          <Checkbox label='Comedy'/>
          <Checkbox label='Crime'/>
          <Checkbox label='Documentary'/>
          <Checkbox label='Drama'/>
          <Checkbox label='Family'/>
          <Checkbox label='Fantasy'/>
          <Checkbox label='History'/>
          <Checkbox label='Horror'/>
          <Checkbox label='Music'/>
          <Checkbox label='Mystery'/>
          <Checkbox label='Romance'/>
          <Checkbox label='Science Fiction'/>
          <Checkbox label='Thriller'/>
          <Checkbox label='TV Movie'/>
          <Checkbox label='War'/>
          <Checkbox label='Western'/>
        </div>
    </div>
  );
}

export default Browse;