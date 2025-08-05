import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// converts DMS to decimal degrees
const dmsToDecimal = (dmsString) => {
  const regex = /(\d+)°(\d+)′(\d+)″([NS])\s(\d+)°(\d+)′(\d+)″([EW])/;
  const match = dmsString.match(regex);

  if (match) {
    const [_, latDeg, latMin, latSec, latDir, lngDeg, lngMin, lngSec, lngDir] = match;
    
    const lat = parseInt(latDeg) + parseInt(latMin) / 60 + parseInt(latSec) / 3600;
    const lng = parseInt(lngDeg) + parseInt(lngMin) / 60 + parseInt(lngSec) / 3600;

    return {
      lat: latDir === 'S' ? -lat : lat,
      lng: lngDir === 'W' ? -lng : lng
    };
  }

  throw new Error('Invalid DMS string format');
};

const mapContainerStyle = {
  height: "100%",
  width: "100%",
  borderRadius: "10px",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: window.google?.maps?.ControlPosition.RIGHT_CENTER
  },
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

const geocodeLocations = async (locations, apiKey) => {
  const geocodedLocations = [];
  for (let location of locations) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location.name)}&key=${apiKey}`);
    const data = await response.json();
    if (data.results.length > 0) {
      geocodedLocations.push({
        name: location.name,
        gpsCode: location.gpsCode,
        position: data.results[0].geometry.location
      });
    } else {
      console.error("Error geocoding location:", location.name);
    }
  }
  return geocodedLocations;
};

const SingleDeveloperDetail = ({ developer }) => {
  const [geocodedLocations, setGeocodedLocations] = useState([]);
  const apiKey = 'AIzaSyBQ0q4TMN9QhggmuS1eboXluVLSTSwPMOg'; 
  console.log("",developer);
  useEffect(() => {
    if (developer && developer.propertyLocations) {
      geocodeLocations(developer.propertyLocations, apiKey).then(setGeocodedLocations);
    }
  }, [developer]);

  if (!developer) {
    return <div className="p-4 font-semibold bg-white rounded-lg shadow-sm">Select a developer to view details.</div>;
  }

  const { numberOfProperties, website, contactPerson, propertyLocations, location_of_first_project_gps } = developer;

  // Convert location_of_first_project_gps to decimal degrees
  const center = location_of_first_project_gps
    ? location_of_first_project_gps.includes(',') && location_of_first_project_gps.split(',').length === 2
        ? location_of_first_project_gps.split(',')
        : dmsToDecimal(location_of_first_project_gps) : defaultCenter;

  return (
    <div className="h-full w-full flex">
      <div className="flex flex-col w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">{developer?.developer_name}</h1>
        <div className="stats-container grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <h5 className="text-lg font-thin">{numberOfProperties}</h5>
            <p className="text-sm text-gray-600">Number of Properties</p>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-lg font-thin">{website}</h5>
            <p className="text-sm text-gray-600">Website</p>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-lg font-thin">{developer?.location_of_first_project}</h5>
            <p className="text-sm text-gray-600">First Project</p>
          </div>
        </div>
        <span className='flex justify-start flex-row gap-4 '>
          <p className="text-sm bg-gray-50 rounded-full p-2 text-gray-600">Contact Person</p>
          <p>{contactPerson}</p>
        </span>
        <div className='stats-container grid grid-cols-3 gap-4 mt-2 items-start'>
          <div className="flex flex-col items-center">
            <h5 className="text-md font-thin">{developer?.contact_person_number || '0123445567'}</h5>
            <p className="text-md text-gray-600">{developer?.contact_person_email || developer.email_address}</p>
            <p className="text-sm text-gray-600">Contact Details</p>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-md font-thin">{developer?.contact_person_position}</h5>
            <p className="text-sm text-gray-600">Company Position</p>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-md font-thin">{developer?.location_of_first_project}</h5>
            <p className="text-sm text-gray-600">First Project</p>
          </div>
        </div>
        {propertyLocations && propertyLocations.length > 0 && (
          <div className="property-locations flex flex-wrap gap-2">
            {propertyLocations.map((location, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
                {`${location.name} (GPS: ${location.gpsCode})`}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow h-full rounded-xl p-4">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={mapOptions}
          >
            {geocodedLocations.map((location, index) => (
              <Marker 
                key={index} 
                position={location.position} 
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: 'yellow',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: 'gold'
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default SingleDeveloperDetail;
