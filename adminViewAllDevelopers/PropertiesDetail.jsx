import React, { useEffect, useState } from 'react';
import { FaEllipsisV, FaSort } from 'react-icons/fa';
import PropertyAPI from '../../services/PropertyAPI';
import DeveloperAPI from '../../services/DeveloperAPI';
import PropertyDetailsModal from './PropertyDetailsModal.jsx'; // Import the modal component

const year = 2024;

function PropertiesDetail() {
  const [propertyData, setPropertyData] = useState([]);
  const [devMap, setDevMap] = useState(new Map());
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const propertyAPI = new PropertyAPI(token);
  const developerAPI  = new DeveloperAPI(token);
  const [sortConfig, setSortConfig] = useState({ key: 'project_name', direction: 'ascending' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await propertyAPI.getAllProperties();
        
        if (Array.isArray(propertyData)) {
          setPropertyData(propertyData);
        } else {
          setPropertyData([propertyData]);
        }
      } catch (error) {
        console.log('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyData.length === 0) {
      fetchData();
    }
  }, [propertyAPI]);

  useEffect(() => {
    const fetchDevData = async () => {
      try {
        const developerIds = [...new Set(propertyData?.map(p => p.developer))];
        const developerPromises = developerIds?.map(id => developerAPI.getAllDevelopers(id));
        const developersResponses = await Promise.all(developerPromises);
  
        const devMap = new Map();
        developersResponses?.forEach(response => {
          const devList = response;
          for (const [developerName, developerData] of Object.entries(devList)) {
            if (developerData && typeof developerData === 'object') {
              for (const [projectName, projectData] of Object.entries(developerData)) {
                if (projectData && projectData.developer) {
                  devMap.set(projectData.developer, developerName);
                } else {
                  // console.log('Unexpected project data structure:',projectData);
                }
              }
            } else {
              // console.log('Unexpected developer data structure: Name', developerData);
            }
          }
        });
  
        setDevMap(devMap);
      } catch (error) {
        console.log('Error fetching developer data:', error);
      }
    };
  
    if (propertyData.length > 0 && devMap.size === 0) {
      fetchDevData();
    }
  }, [propertyData, developerAPI, devMap.size]);

  const handleSort = (key) => {
    setSortConfig(prevState => ({
      key,
      direction: prevState.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const sortedCollection = [...propertyData]?.sort((a, b) => {
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
    return 0;
  });

  // console.log("sortedCollection", sortedCollection);

  const flattedArray = sortedCollection.flatMap(projectObj => Object.entries(projectObj).map(([projectName, details]) => ({
      project_name: projectName,
      ...details
    }))
  );
  const sortedCollectionArray = Object.keys(sortedCollection).map(key => ({
   
    ...sortedCollection[key]
  }));

  const handleRowClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  // console.log("PROJ :",sortedCollectionArray);

  flattedArray?.map((project, index) => {
    // console.log(`the Developer index and developer project information ${index + 1}:`, project);
  });
  return (
    <div className="bg-white pt-0 w-full px-4 rounded-xl overflow-auto h-full">
      <div className="flex justify-between items-center pr-2 bg-white sticky top-0">
        <div>
          <h1 className="text-xl font-thin text-gray-900 bg-white">Projects</h1>
        </div>
        <div className='bg-white sticky' style={{ zIndex: 2000 }}>
          <FaEllipsisV className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="property-table-wrapper" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full text-sm text-left overflow-auto bg-white text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 z-10">
              <tr className='bg-gray-300 z-10'>
                {["Project Name", "LOCATION", "START DATE", "TOTAL UNITS", "BEDROOM PRICE", "NUMBER OF BEDROOMS", "STATUS"].map((heading, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    style={{ fontWeight: '300', textAlign: index >= 3 ? 'center' : 'left' }}
                    onClick={() => handleSort(heading.replace(' ', '_').toLowerCase())}
                  >
                    {heading}
                    {(heading.toLowerCase() === 'project_name' || heading.toLowerCase() === 'location') && <FaSort className="inline ml-1" />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flattedArray.map((property, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 cursor-pointer" onClick={() => handleRowClick(property)}>
                  <td className="px-6 py-3">
                    {devMap?.get(property?.developer) ? (
                      <>
                        <span className="text-md">{devMap.get(property?.developer)}</span>
                        <br />
                        <span className="text-sm">{property?.project_name}</span>
                      </>
                    ) : (
                      <span className="text-md">{property?.project_name}</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <p className='text-md'>{property?.location}</p>
                    <p className='text-sm'>{property?.location_gps || '5°45′33″N 0°13′12″W'}</p>
                  </td>
                  <td className="px-6 py-3 font-thin text-md">{property?.project_start_date}</td>
                  <td className="px-6 py-3 text-center">
                    <p className='text-md'>{property?.project_no_of_units}</p>
                    <p className='text-sm text-dark-secondary-contrast'>{property?.no_assigned_units}</p>
                  </td>
                  <td className="px-6 py-3 ">
                    <p className='text-md text-money'>{property?.bedroom_price}</p>
                    <p className='text-sm'>{property?.bedroom_size} sqft</p>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <p className='text-md'>{property?.no_of_bedrooms}</p>
                    <p className='text-sm'>{property?.bedroom_size} sqft</p>
                  </td>
                  <td className="px-6 py-3 text-md">{property?.complete || "complete"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedProperty && (
        <PropertyDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          propertyData={selectedProperty} 
          developerName={devMap.get(selectedProperty?.developer)} 
        />
      )}
    </div>
  );
}

export default PropertiesDetail;
