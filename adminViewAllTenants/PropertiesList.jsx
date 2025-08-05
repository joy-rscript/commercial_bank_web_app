import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListCard from '../ListCard';
import { Typography } from '@mui/material';

function PropertiesList({ selectedDeveloper, setSelectedDeveloper }) {
  const [tenantData, setTenantData] = useState([]);
  const tenantPropertyStats = [
    {
      property_name: "Crester Valley",
      total_tenants: 10,
      total_properties: 15,
      occupied_properties: 10,
      vacant_properties: 5,
      paid_properties: 6,
      outstanding_properties: 4,
      total_rent_collected: 50100,
      total_rent_owing: 15000,
    },
    {
      property_name: "Stellar Structures",
      total_tenants: 8,
      total_properties: 15,
      occupied_properties: 8,
      vacant_properties: 7,
      paid_properties: 5,
      outstanding_properties: 3,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:8000/rto/get_tenants/', {});
        // setTenantData(response.data);

        setTenantData( [
          // Tenants for "Crester Valley" (1 tenant for each occupied property)
          {
            tenantId: "T001",
            propertyId: "P001",
            account: "Kwame Asare",
            dateAssigned: "2024-05-01",
            rent_per_month: 2700,
            property_name: "Crester Valley",  // Adjusted to match tenantPropertyStats
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
            property_name: "Crester Valley",  // Adjusted to match tenantPropertyStats
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
            property_name: "Crester Valley",  // Adjusted to match tenantPropertyStats
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
          
          // Tenants for "Dahwenya Structures" (1 tenant for each occupied property)
          {
            tenantId: "T004",
            propertyId: "P004",
            account: "Kwabena Mensah",
            dateAssigned: "2024-06-01",
            rent_per_month: 2000,
            property_name: "Dahwenya Structures",  // Adjusted to match tenantPropertyStats
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
        
          // Tenants for "Aseda Properties" (2 tenants, both properties occupied)
          {
            tenantId: "T005",
            propertyId: "P005",
            account: "Ama Osei",
            dateAssigned: "2024-05-15",
            rent_per_month: 3500,
            property_name: "Aseda Properties",  // Matches the tenantPropertyStats
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
            property_name: "Aseda Properties",  // Matches the tenantPropertyStats
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
        ] )


      } catch (error) {
        console.error('Error fetching tenant data:', error);
      }
    };

    fetchData();
  }, []);

  const tenantCards = tenantData.map((tnt, index) => (
    <ListCard 
      key={index} 
      item={
        <div 
          className={`flex flex-row space-x-2 ${selectedDeveloper === tnt ? 'bg-gray-300' : 'bg-white'}`}
          onClick={() => setSelectedDeveloper(tnt)}
        >
          <Typography color="gray" variant="h7">
            {index + 1}{"."}
          </Typography>
          <Typography color="gray" variant="h7">
            {tnt.property_name + " " + tnt.location}
          </Typography>
        </div>
      } 
    />
  ));

  return (
    <div>
      <div>
        <h2 className='text-lg font-thin text-gray-700 border-b-2 border-gray-100 py-1'>Properties</h2>
      </div>
      {tenantCards}
    </div>
  );
}

export default PropertiesList;
