import React, { useState, useEffect } from 'react';

const PropertyAdvancedSearch = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [bedroomNumber, setBedroomNumber] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  useEffect(() => {
    handleFilter();
  }, [location, bedroomNumber, squareFeet]);

  const handleFilter = () => {
    onFilter({ location, bedroomNumber, squareFeet });
  };

  const webkitStyles = `
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield; /* Firefox */
    }

    input:focus {
      outline: none;
    }
  `;

  return (
    <div className="p-1">
      <style>{webkitStyles}</style>
      <h2 className="text-lg font-thin mb-4 text-gray-700">Advanced Search</h2>
      <div className="mb-4 flex items-center">
        <label className="text-gray-700 mr-2 w-1/4 text-xs">Location</label>
        <input
          type="text"
          className="w-3/4 px-2 py-1 border rounded-full border-gray-200 bg-gray-100 focus:outline-none"
          placeholder="Search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={handleFilter}
          onBlur={handleFilter}
        />
      </div>
      <div className="flex mb-4">
        <div className="flex items-center mr-2 w-1/2">
          <label className="text-gray-700 mr-2 w-1/3 text-xs">Bedroom Number</label>
          <input
            type="number"
            className="w-2/3 px-2 py-1 border rounded-full border-gray-200 bg-gray-100 focus:outline-none no-arrows"
            placeholder="Search"
            value={bedroomNumber}
            onChange={(e) => setBedroomNumber(e.target.value)}
            onKeyUp={handleFilter}
            onBlur={handleFilter}
          />
        </div>
        <div className="flex items-center w-1/2">
          <label className="text-gray-700 mr-2 w-1/3 text-xs">Square Feet</label>
          <input
            type="number"
            className="w-2/3 px-2 py-1 border rounded-full border-gray-200 bg-gray-100 focus:outline-none no-arrows"
            placeholder="Search"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            onKeyUp={handleFilter}
            onBlur={handleFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyAdvancedSearch;
