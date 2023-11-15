import React, { useState } from 'react';
import '../assets/styles/components/Checkbox.css'

const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <label className="container">
      <div>  
        <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            style={{ display: 'none' }}
        />
        <svg viewBox="0 0 64 64" height="15px" width="15px">
            <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            className={`${'path'} ${checked ? 'checked' : ''}`}
            ></path>
        </svg>
      </div>
      <div>
        <h4 className='CheckType'>{label}</h4>
      </div>
    </label>
  );
};

export default Checkbox;