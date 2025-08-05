import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx'; 
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import DashboardSection from '../components/DashboardSection.jsx'
import SuccessfulApplicantsSection from '../components/applicationDashboard/SuccessfulApplicantsSection.jsx';
import PendingApplicants from '../components/applicationDashboard/PendingApplicants.jsx';
import ApplicantNumbersGraph from '../components/applicationDashboard/ApplicantNumbersGraph.jsx';
import ApplicantsEmploymentChart from '../components/applicationDashboard/ApplicantsEmploymentChart.jsx';
import { useNavigate } from 'react-router-dom';

function AdminAppsViewPage() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzQ1Mjk2LCJpYXQiOjE3MjIxNTMyOTYsImp0aSI6ImQ2NTA1MzNiYmRmMzQ2NTFiNGNlMDNmOTU3YWVjOGJkIiwidXNlcl9pZCI6MSwiYXVkIjoiR0NCUkVJVCIsImlzcyI6IkdDQlJFSVRXRUIifQ.G5rbHJ6J9MrLh8WM9c0iwWG7A3zEoDKKVHxM6xsFH1M"
  localStorage.setItem("token", token);
  const [selectedApplicant, setSelectedApplicant] = useState({});
  const navigate = useNavigate()

  const handleSelectedApplicant = () => {
    console.log("!!!!!!!!!!!", selectedApplicant);
    navigate(`/admin/app-submissions/${selectedApplicant.id}`)
  }
  
  return (
    <div className="bg-gray-100 fixed top-0 left-0 w-full h-full z-50">
    <NavBar />
    <MenuBar />
    <div className="mx-2 mt-4 grid grid-cols-5 grid-rows-4 gap-2 ">
      <div className="col-span-1 row-span-4 bg-white rounded-lg shadow-sm mx-1 p-3">
        <SuccessfulApplicantsSection selectedApplicant={selectedApplicant} setSelectedApplicant={setSelectedApplicant} />
      </div>
      <div className="col-span-4 row-span-4">
        <div className=" ">
          <div className="grid grid-cols-4 gap-1 row-span-2 ">
            <div className="col-span-2 bg-white rounded-lg shadow-sm mx-1 p-4">
              <ApplicantsEmploymentChart />
            </div>
            <div className="col-span-2 bg-white rounded-lg shadow-sm mx-1 p-4">
              <ApplicantNumbersGraph />
            </div>
          </div>
          <div className="row-span-2 my-3 overflow-auto bg-white rounded-lg shadow-sm mx-1 p-4" style={{ height: '50vh', overflowY: 'auto' }}>
            <PendingApplicants />
          </div>
        </div>
      </div>
    </div>
  </div>
  

  );
}

export default AdminAppsViewPage;
