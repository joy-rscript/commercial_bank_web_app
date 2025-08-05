import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import PropertyDetailListCard from '../components/tenantDashboard/PropertyDetailListCard.jsx';
import RTOGoalDetails from '../components/tenantDashboard/RTOGoalDetails.jsx';
import RentalPaymentsGraph from '../components/tenantDashboard/RentalPaymentsGraph.jsx';
import PropertyPaymentHistoryCard from '../components/tenantDashboard/PropertyPaymentHistoryCard.jsx';
import { TenantMenuBar } from '../components/tenantDashboard/TenantMenuBar.jsx';
import EquityGrowth from '../components/tenantDashboard/EquityGrowth.jsx';
import MonthlyPaymentsCard from '../components/tenantDashboard/MonthlyPaymentsCard.jsx';
import DashboardSection from '../components/DashboardSection.jsx';
import house2 from '../assets/house2.jpg';
import { BsFillHouseCheckFill } from "react-icons/bs";
import TenantDataAPI from '../services/TenantDataAPI';

function TenantDashboardPage() {
  const id = 1;
  const [summary, setSummary] = useState({});
  const [paymentsData, setPaymentsData] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const propertyId = 38;
  const [tenantData, setTenantData] = useState([]);
  const token = localStorage.getItem('token'); 
  const tenantDataAPI = new TenantDataAPI(token);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setSummary({
          "cumm_revenue_received": 400000,
          "init_value": 300000,
          "terminal_value": 200000,
          "annual_revenue": 100000,
          "acquired_interest": 9000,
          "equity_ratio": 0.4,
          "penalty": 0
        });

        setPaymentsData({
          "equity_ratio": 0.4,
          "revenue_amount": 10000,
          "outstanding_revenue": 100,
          "expected_amount": 3000,
          "penalty_streak": 0
        });

        setPropertyData({
          "developer_name": "CrestView Properties",
          "description": "1 Bedroom flat, 11' x 12' Living room, Includes a storage cold room",
          "location": "House Number 07 Cameron Street",
          "image": "/mnt/data/image.png",
          "contact_person": "Samuel Kumara",
          "contact_number": "+233 209 456 4311"
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const propData = {'property_id': propertyId};
        const data = await tenantDataAPI.getTenantInfo(propData);
        if (data)
        {setTenantData(data);}
      } catch (error) {
        console.error('Error fetching tenant data!!!:', error);
      }
    };
    if (tenantData.length === 0) {
      fetchTenantData();
    }
  }, [propertyId, tenantDataAPI]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const summaryData = await tenantDataAPI.getMonthlySummary(propertyId);
  //       setSummary(summaryData);

  //       const paymentsHistoryData = await tenantDataAPI.getPropertyPaymentHistory(propertyId);
  //       setPaymentsData(paymentsHistoryData);

  //       const propertyInfo = await tenantDataAPI.getAllProperties(); // Assuming this gets detailed property data
  //       setPropertyData(propertyInfo);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [propertyId, tenantDataAPI]);

  const data = tenantData;
  return (
    <div className="bg-gray-100 max-h-screen fixed h-screen w-screen flex flex-col">
      <NavBar />
      <TenantMenuBar />
      <div className='flex justify-end m-2 mx-4'>
        <button className="bg-secondary hover:bg-secondary text-white px-6 py-1 rounded-xl flex justify-end items-end">
          + Issue Complaint
        </button>
      </div>
      <div className="mx-2 grid grid-rows-5 grid-cols-5 gap-2 min-h-full ">
        <div className="row-span-5 col-span-1 flex flex-col">
          <div className="flex-grow flex flex-col h-1/2 items-stretch rounded-lg bg-white overflow-hidden">
            <div className="flex flex-row justify-start align-bottom pt-1 rounded-lg px-4">
              <BsFillHouseCheckFill className="text-gray-600 text-2xl" />
              <h2 className="text-lg px-1 font-medium text-gray-700">{tenantData.project_name}</h2>
            </div>
            <DashboardSection
              textStyle="text-lg"
              content={
                <img
                  src={house2}
                  alt="PropertyImage"
                  className="w-full h-full object-cover rounded-lg"
                />
              }
            />
          </div>
          <div className="flex-grow flex flex-col h-1/2 bottom-0 bg-white rounded-lg">
            <PropertyDetailListCard propertyData={propertyData} />
          </div>
        </div>
        <div className="row-span-5 col-span-4 flex flex-col mx-2 rounded-lg ">
          <div className="flex flex-row row-span-2 rounded-lg mb-2 overflow-hidden gap-2">
            <div className='w-3/4 bg-white '>
              <EquityGrowth summary={summary} tenantData={tenantData} />
            </div>
            <div className="w-1/4 rounded-lg pt-4 bg-white">
              <MonthlyPaymentsCard summary={summary} payments={paymentsData} />
            </div>
          </div>
          <div className="mx-1 h-40 flex-grow col-span-4 row-span-2 flex flex-row rounded-lg">
            <PropertyPaymentHistoryCard tenantData={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboardPage;
