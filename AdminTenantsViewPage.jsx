import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import PropertiesList from '../components/adminViewAllTenants/PropertiesList.jsx';
import DeveloperStats from '../components/adminViewAllTenants/DeveloperStats.jsx';
import TenantPropertyStatsGraph from '../components/adminViewAllTenants/TenantPropertyStatsGraph.jsx';
import TenantList from '../components/adminViewAllTenants/TenantList.jsx';
import PaymentForm from '../components/adminViewAllTenants/PaymentForm.jsx'; // Import the PaymentForm component
import FinancialModelGraph from '../components/adminViewAllTenants/FinancialModelGraph.jsx';
const tenantPropertyStats = [
  {
    property_name: "Crester Valley",
    total_tenants: 5,
    total_properties: 8,
    occupied_properties: 5,
    vacant_properties: 3,
    paid_properties: 4,
    outstanding_properties: 1,
    total_rent_collected: 50100,
    total_rent_owing: 15000,
  },
  {
    property_name: "Stellar Structures",
    total_tenants: 3,
    total_properties: 10,
    occupied_properties: 3,
    vacant_properties: 7,
    paid_properties: 3,
    outstanding_properties: 0,
    total_rent_collected: 30000,
    total_rent_owing: 10900,
  },
  {
    property_name: "Dahwenya Structures",
    total_tenants: 1,
    total_properties: 3,
    occupied_properties: 1,
    vacant_properties: 2,
    paid_properties: 1,
    outstanding_properties: 0,
    total_rent_collected: 2000,
    total_rent_owing: 1300,
  },
  {
    property_name: "Aseda Properties",
    occupied_properties: 2,
    vacant_properties: 0,
    paid_properties: 1,
    outstanding_properties: 1,
    total_tenants: 2,
    total_properties: 2,
    total_rent_collected: 7000,
    total_rent_owing: 5000,
  },
  {
    property_name: "Stellar Structures",
    occupied_properties: 0,
    vacant_properties: 1,
    paid_properties: 0,
    outstanding_properties: 0,
    total_tenants: 0,
    total_properties: 1,
    total_rent_collected: 0,
    total_rent_owing: 0,
  },
];

const tenantData = [
  {
    tenantId: "T001",
    propertyId: "P001",
    account: "Kwame Asare",
    dateAssigned: "2024-05-01",
    rent_per_month: 2700,
    property_name: "Crester Valley",  
    equityRatio: "30%",
    flag: "None",
    mobile_no1: "1234567890",
    title: "Mr",
    surname: "Asare",
    first_name: "Kwame",
    email: "kk.asare@example.com",
    address: "22, Oshodi, Lekki Phase 1",
    location: "W21 11 45",
    bedrooms: 3,
    square_ft: 2600,
    handing_over_date: "2024-07-21",
    rent_type: "RTO",
    initial_value: 300000
  },
  {
    tenantId: "T002",
    propertyId: "P002",
    account: "Eunice Frimpong",
    dateAssigned: "2024-06-01",
    rent_per_month: 2300,
    property_name: "Crester Valley",  
    equityRatio: "25%",
    flag: "None",
    mobile_no1: "1234567890",
    title: "Ms",
    surname: "Frimpong",
    first_name: "Eunice",
    email: "eunice.frimpong@example.com",
    address: "22, Oshodi, Lekki Phase 1",
    location: "N21 05 15",
    bedrooms: 3,
    square_ft: 2000,
    handing_over_date: "2024-07-01",
    rent_type: "RTO",
    initial_value: 300000
  },
  {
    tenantId: "T003",
    propertyId: "P003",
    account: "Esi Teetteh",
    dateAssigned: "2024-05-01",
    rent_per_month: 3000,
    property_name: "Crester Valley",  
    equityRatio: "40%",
    flag: "Late",
    mobile_no1: "1235567890",
    title: "Ms",
    surname: "Teetteh",
    first_name: "Esi",
    email: "esi.teetteh@example.com",
    address: "22, Oshodi, Lekki Phase 1",
    location: "N21 09 45",
    bedrooms: 3,
    square_ft: 2000,
    handing_over_date: "2024-06-01",
    rent_type: "RTO",
    initial_value: 300000
  },
  
  {
    tenantId: "T004",
    propertyId: "P004",
    account: "Kwabena Mensah",
    dateAssigned: "2024-06-01",
    rent_per_month: 2000,
    property_name: "Dahwenya Structures",  
    equityRatio: "30%",
    flag: "None",
    mobile_no1: "2345678901",
    title: "Mr",
    surname: "Mensah",
    first_name: "Kwabena",
    email: "kwabena.mensah@example.com",
    address: "45, Ikoyi, Lagos",
    location: "W21 12 10",
    bedrooms: 2,
    square_ft: 1500,
    handing_over_date: "2024-06-15",
    rent_type: "RTO",
    initial_value: 150000
  },

  
  {
    tenantId: "T005",
    propertyId: "P005",
    account: "Ama Osei",
    dateAssigned: "2024-05-15",
    rent_per_month: 3500,
    property_name: "Aseda Properties",  
    equityRatio: "35%",
    flag: "None",
    mobile_no1: "3456789012",
    title: "Ms",
    surname: "Osei",
    first_name: "Ama",
    email: "ama.osei@example.com",
    address: "67, Victoria Island, Lagos",
    location: "N21 06 25",
    bedrooms: 4,
    square_ft: 2800,
    handing_over_date: "2024-05-15",
    rent_type: "RTO",
    initial_value: 350000
  },
  {
    tenantId: "T006",
    propertyId: "P006",
    account: "Kofi Appiah",
    dateAssigned: "2024-06-01",
    rent_per_month: 3000,
    property_name: "Aseda Properties",  
    equityRatio: "40%",
    flag: "None",
    mobile_no1: "4567890123",
    title: "Mr",
    surname: "Appiah",
    first_name: "Kofi",
    email: "kofi.appiah@example.com",
    address: "89, Lekki Phase 2, Lagos",
    location: "N21 07 30",
    bedrooms: 3,
    square_ft: 2500,
    handing_over_date: "2024-06-01",
    rent_type: "RTO",
    initial_value: 300000
  }
];

const handleTenantSelect = (tenant) => {
  setSelectedTenant(tenant);
};

const initialFinancialData = {
  cost_per_unit: 100000,
  target_rental_yield: 0.05,
  init_down_payment: 20000,
  annual_rent_increase: 0.03,
  annual_home_value_increase: 0.04,
  years_to_pay_init_cost: 10,
  per_unit_markup_cost: 5000,
  annual_equity_pymt_increase: 0.02,
};

const tenantFinData = {
  //to later put all the tenants fin data hree dummmy data
}



function AdminTenantsViewPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null); 
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [selectedTenantFinData, setSelectedTenantFinData] = useState({
    tenantId: "T001",
    propertyId: "P001",
    account: "Kwame Asare",
    dateAssigned: "2024-06-01",
    rent_per_month: 2700,
    property_name: "Dahwenya Properties",
    equityRatio: "30%",
    flag: "None",
    mobile_no1: "1234567890",
    title: "Mr",
    surname: "Kwame ",
    first_name: "Asare",
    email: "kk.asare@example.com",
    address: "22, Oshodi, Lekki Phase 1",
    location: "N21 25 45",
    bedrooms: 3,
    square_ft: 2600,
    handing_over_date: "2024-07-21",
    rent_type: "RTO",
    initial_value: 300000
  },)
  const handleProcessPayment = () => {
    if (selectedTenant) {
      setShowPayment(true);
    }
  };

  console.log(showPayment);
  return (
    <div className="bg-gray-100 fixed h-screen w-screen max-h-screen max-w-screen flex flex-col">
      <NavBar />
      <MenuBar />
      <div className="flex justify-end m-2 mx-4">
        <button
          className={`bg-secondary hover:bg-secondary-dark text-white px-6 py-1 rounded-xl ${!selectedTenant ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleProcessPayment}
          disabled={!selectedTenant}
        >
          {showPayment ? "" : "Process Payment"}
        </button>
      </div>
      <div className="mx-2 bg-gray-100 mt-2 h-full grid grid-cols-5 grid-rows-4 gap-2">
        <div className="col-span-1 row-span-4 bg-white rounded-lg shadow-sm mx-1 p-3">
          <PropertiesList selectedDeveloper={selectedDeveloper} setSelectedDeveloper={setSelectedDeveloper} />
        </div>
        {!selectedTenant &&
        (<div className="col-span-4 row-span-4">
          <div className="grid grid-cols-4 gap-1 row-span-4 h-1/2">
            <div className="col-span-2 bg-white rounded-lg shadow-sm mx-1 h-full p-4">
              <DeveloperStats revenueStats={tenantPropertyStats} />
            </div>
            <div className="col-span-2 bg-white rounded-lg shadow-sm mx-1 p-4">
              <TenantPropertyStatsGraph propertyStats={tenantPropertyStats} />
            </div>
          </div>
          <div className="row-span-2 my-3 overflow-auto bg-white rounded-lg shadow-sm mx-1 p-4" style={{ height: '50vh', overflowY: 'auto' }}>
            <TenantList tenantData={tenantData} selectedTenant={selectedTenant} setSelectedTenant={setSelectedTenant} />
          </div>
        </div>)
}
 
          {selectedTenant && (
            <div className='bg-white col-span-4 row-span-4 rounded-lg overflow-x-auto'>
              <div>
                <h1>Financial Model for {selectedTenant.name}</h1>
                <FinancialModelGraph financialData={initialFinancialData} />
              </div>
            </div>
          )}
      


      </div>
      {showPayment && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <PaymentForm tenantData={selectedTenant}  setPaymentSectionOpen={setShowPayment} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTenantsViewPage;
