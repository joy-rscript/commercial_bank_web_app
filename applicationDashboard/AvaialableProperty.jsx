import React, { useEffect, useState } from 'react';
import DeveloperAPI from '../../services/DeveloperAPI';
import SetupPropertyFinModel from '../adminHomeDashboard/SetupPropertyFinModel';

function AvailableProperty({ applicantData }) {
  const [developers, setDevelopers] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [initialValue, setInitialValue] = useState(300000); // Example value
  const [years, setYears] = useState('');
  const [amountPerMonth, setAmountPerMonth] = useState('');
  const [interestRate, setInterestRate] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      const token = localStorage.getItem('token');
      const developerAPI = new DeveloperAPI(token);
      try {
        const data = await developerAPI.getAllDevelopers();
        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developer data:', error);
      }
    };

    if (Object.keys(developers).length === 0) {
      fetchDevelopers();
    }
  }, [developers]);

  const renderPropertyDetails = (property) => (
    <div className="ml-0 grid grid-cols-3 gap-6 justify-start items-start w-2/3 text-sm">
      {Object.entries(property).map(([key, value], index) => (
        (key !== 'project_description' && key !== 'location' && key !== 'developer_name' && key !== 'amenities') ? ( 
          <div key={index} className="flex flex-col items-center mb-2 text-gray-800">
            <span className="text-xl font-normal text-black items-center justify-self-center">{value}</span>
            <span className="text-md font-light">{key.replace('_', ' ')}</span>
          </div>
        ) : null
      ))}
    </div>
  );

  return (
    <div className="container">
      {Object.entries(developers).map(([developerName, properties], devIndex) => (
        <div key={devIndex} className="p-4 rounded-lg">
          {Object.keys(properties).length > 0 ? (
            Object.entries(properties).map(([propName, prop], propIndex) => (
              <div className='flex items-end justify-start align-bottom border-b-2 border-gray-200 bottom-1' key={propIndex}>
                <div className="mb-6 mt-4 ml-2 w-3/4">
                  <h2 className="font-bold text-gray-700 text-lg">{developerName} - {prop.project_name}</h2>
                  <h3 className="text-gray-600 font-thin pb-2">{prop.location}</h3>
                  {renderPropertyDetails(prop)}
                  <div className="mt-8">
                    <span className="text-md font-thin text-gray-800">Description</span>
                    <p className="text-md font-normal text-gray-900">{prop.project_description}</p>
                    <p>{"amenities: " + prop.amenities}</p>                  
                  </div>
                </div>
                <div>
                  <SetupPropertyFinModel applicantData={applicantData} propertyData={prop} />
                </div>
              </div>
            ))
          ) : (
            <div>No properties available for {developerName}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AvailableProperty;
