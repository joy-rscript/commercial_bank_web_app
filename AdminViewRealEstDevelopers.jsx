import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import PropertiesDetail from '../components/adminViewAllDevelopers/PropertiesDetail.jsx';
import DevelopersList from '../components/adminViewAllDevelopers/DevelopersList.jsx';
import PropertyAdvancedSearch from '../components/adminViewAllDevelopers/PropertyAdvancedSearch.jsx';
import SingleDeveloperDetail from '../components/adminViewAllDevelopers/SingleDeveloperDetail.jsx';
import CreateDeveloper from '../components/adminViewAllDevelopers/CreateDeveloper.jsx';

function AdminViewRealEstDevelopers() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [showDeveloperForm, setShowDeveloperForm] = useState(false);
  const [filter, setFilter] = useState({});

  const handleDeveloperSelect = (developer) => {
    setSelectedDeveloper({
      ...developer,
      location_of_first_project_gps: "5°45′33″N 0°13′12″W"
      // numberOfProperties: 10,
      // averagePrice: 250000,
      // contactPerson: { name: "John Doe", mobile: "+233 123 456 789" },
      // propertyLocations: developer.properties
    });
    setShowDeveloperForm(false);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const toggleDeveloperForm = () => {
    setShowDeveloperForm(!showDeveloperForm);
  };

  return (
    <div className="bg-gray-100 fixed h-screen w-screen max-h-screen max-w-screen flex flex-col">
      <NavBar />
      <MenuBar />
      <div className="flex justify-end m-2 mx-4">
        <button
          className="bg-secondary hover:bg-secondary text-white px-6 py-1 rounded-xl"
          onClick={toggleDeveloperForm}
        >
          + {showDeveloperForm ? "" : "New Developer"}
        </button>
      </div>
      <div className="mx-2 bg-gray-100 h-full grid grid-cols-5 grid-rows-4 gap-2">
        <div className="col-span-1 row-span-4 gap-2 rounded-lg shadow-sm">
          <div className="h-1/3 bg-white rounded-lg shadow-sm p-3">
            <PropertyAdvancedSearch onFilter={handleFilterChange} />
          </div>
          <div className="h-2/3 rounded-lg bg-white shadow-sm p-1 mt-4">
            <DevelopersList onSelect={handleDeveloperSelect} filter={filter} />
          </div>
        </div>
        
        <div className="col-span-4 row-span-4">
          {showDeveloperForm ? (
            <CreateDeveloper />
          ) : (
            <>
              <div className="rounded-lg gap-1 row-span-4 h-1/2 bg-white">
                <SingleDeveloperDetail developer={selectedDeveloper} />
              </div>
              <div
                className="row-span-2 my-3 overflow-auto bg-white rounded-lg shadow-sm mx-1 p-4"
                style={{ height: '50vh', overflowY: 'auto' }}
              >
                <PropertiesDetail />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewRealEstDevelopers;
