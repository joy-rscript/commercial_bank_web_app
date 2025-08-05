import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import DeveloperAPI from '../../services/DeveloperAPI.jsx';

function DevelopersList({ onSelect, filter }) {
  const [developers, setDevelopers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const token = localStorage.getItem('token');
  const developerAPI = new DeveloperAPI(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const developerData = await developerAPI.getAllDevelopers(1);
        console.log("RRR!!!!!!!!!!!!!!!!!!!!", developerData);

        // Extract developer names from the object keys
        if (developerData) {
          const developerNames = Object.keys(developerData);
          setDevelopers(developerNames);
        }
      } catch (error) {
        console.log('Error fetching developers:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Filter and sort developers based on the search query and sort order
  const filteredDevelopers = developers.filter(dev => dev.includes(searchQuery));

  const sortedDevelopers = filteredDevelopers.sort((a, b) => {
    if (a < b) return sortOrder === 'asc' ? -1 : 1;
    if (a > b) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white pt-0 w-full px-1 rounded-xl overflow-auto h-full">
      <div className="flex flex-col justify-between py-2 border-b-2 border-gray-100">
        <h2 className='text-lg font-thin text-gray-700'>Developers</h2>
        <div className="flex items-center justify-end space-x-2">
          <input
            type="text"
            placeholder="Search Developers"
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded px-2 py-1"
          />
          <button onClick={handleSort} className="text-gray-500">
            {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </button>
        </div>
      </div>
      <div className="developer-table-wrapper px-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {sortedDevelopers.map((dev, index) => (
          <div 
            key={index} 
            className='flex flex-row space-x-2 py-2 border-b cursor-pointer'
            onClick={() => onSelect(dev)}
          >
            <div className='flex flex-grow items-center'>
              <div className='text-gray-700'>{index + 1}. {dev}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopersList;
