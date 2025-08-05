import React from 'react';
import NavBar from '../components/NavBar.jsx'; 
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import DashboardSection from '../components/DashboardSection.jsx'
import SuccessfulApplicantsSection from '../components/applicationDashboard/SuccessfulApplicantsSection.jsx';
import PendingApplicants from '../components/applicationDashboard/PendingApplicants.jsx';
import ApplicantNumbersGraph from '../components/applicationDashboard/ApplicantNumbersGraph.jsx';
import ApplicantsEmploymentChart from '../components/applicationDashboard/ApplicantsEmploymentChart.jsx';
import TopLocationsChart from '../components/adminHomeDashboard/TopLocationsChart.jsx';
import UserBaseInfo from '../components/adminHomeDashboard/UserBaseInfo.jsx';
import RentalInfo from '../components/adminHomeDashboard/RentalInfo.jsx';
import PaymentHistoryCard from '../components/adminHomeDashboard/PaymentHistoryCard.jsx';
import RevenueLineGraph from '../components/adminHomeDashboard/RevenueLineGraph.jsx';

function AdminAppsViewPage() {
   
  return (
    <div className="bg-gray-100 max-h-screen h-screen w-screen fixed flex flex-col">
      <NavBar />
      <MenuBar />
      <div className="mx-2 mt-4 grid grid-rows-5 grid-cols-5 gap-2 min-h-full">
      <div className="row-span-5 col-span-1 flex flex-col">
          <div className="rounded-lg mb-4 pb-2 bg-white overflow-hidden">
            <DashboardSection 
              heading="Portfolio" 
              textStyle="text-lg" 
              content={<TopLocationsChart />} 
            />
          </div>
          <div className="bg-red-100 rounded-lg">
          <DashboardSection 
              heading="User Base" 
              textStyle="text-lg" 
              content={<UserBaseInfo/>} 
            />
          </div>
      </div>
      <div className="row-span-5 col-span-4 flex flex-col">
          <div className="rounded-lg mb-2  bg-white overflow-hidden pb-5 ">
              <DashboardSection 
                heading="Accounts" 
                width={'w-full'}
                textStyle="text-xl semibold" 
                content={<RentalInfo />} 
              />
           
          </div>
          <div className="mx-1 flex-grow col-span-4 row-span-2 flex flex-row rounded-lg">
            <div className=' mr-2'>
             <PaymentHistoryCard />
            </div>
            
            <div className=' ml-2 w-3/5 bg-white'>
            <RevenueLineGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAppsViewPage;
