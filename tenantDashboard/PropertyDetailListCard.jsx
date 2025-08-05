import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import TenantDataAPI from '../../services/TenantDataAPI';

export default function PropertyDetailListCard({ property }) {
  const propertyId = 38;
  const [tenantData, setTenantData] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const token = localStorage.getItem('token'); 
  const tenantDataAPI = new TenantDataAPI(token);
  const mapAPIKey = 'AIzaSyBQ0q4TMN9QhggmuS1eboXluVLSTSwPMOg'  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const propData = {'property_id': propertyId};
        const data = await tenantDataAPI.getTenantInfo(propData);
        if(data){
          setTenantData(data);
        }
      } catch (error) {
        console.error('Error fetching tenant data:', error);
      }
    };

    if (tenantData.length === 0) {
      fetchData();
    }
  }, [propertyId]);

  return (
    <div className='p-4'>
      <div className='pb-6'>
        <div className='flex flex-row gap-4 pb-0'> 
          <h1
            className={`text-lg cursor-pointer ${!showLocation ? 'text-black border-b-2 border-gray-700 font-extrabold' : 'text-gray-600'}`}
            onClick={() => setShowLocation(false)}
          >
            Details
          </h1>
          <h1
            className={`text-lg cursor-pointer ${showLocation ? 'text-black font-extrabold' : 'text-gray-600'}`}
            onClick={() => setShowLocation(true)}
          >
            Location
          </h1>
        </div>
        <hr className="border-t border-gray-500 w-full" />
      </div>
      
      {!showLocation ? (
        <div className="flex justify-between">
          <div className="text-faint flex flex-col justify-start items-start gap-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
            <span>Tenant Name</span>
            <span>Number of Bedrooms</span>
            <span>Area (SquareFt)</span>
            <span>Next Month Rentals</span>
            <span>Date Acquired</span>
            <span>Project Name</span>
          </div>
          <div className="text-faint flex flex-col justify-end items-end gap-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
            <span>{tenantData["tenant_name"]}</span>
            <span>{tenantData["number_of_bedrooms"]}</span>
            <span>{tenantData["area"]}</span>
            <span className='text-money'>{tenantData["next_month_rentals"]}</span>
            <span>{tenantData["date_acquired"]}</span>
            <span>{tenantData["project_name"]}</span>
          </div>
        </div>
      ) : (
        <div>
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${mapAPIKey}&q=${tenantData["location_gps"]}`}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
