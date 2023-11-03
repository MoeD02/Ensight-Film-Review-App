import React, { useState } from 'react';

const YearSelection = () => {
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
        <option value="">Choose year</option>
        <option value="1">1980s</option>
        <option value="2">1990s</option>
        <option value="3">2000s</option>
      </select>
    </div>
  );
};

export default YearSelection;