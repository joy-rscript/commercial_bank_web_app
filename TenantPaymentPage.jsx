import React from 'react';
import NavBar from '../components/NavBar.jsx'; 
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PaymentSchedule from '../components/applicationDashboard/tenantPayments/PaymentSchedule.jsx';
import PaymentBreakDown from '../components/applicationDashboard/tenantPayments/PaymentBreakDown.jsx';
import PropertyPaymentHistoryCard from '../components/tenantDashboard/PropertyPaymentHistoryCard.jsx';
import { TenantMenuBar } from '../components/tenantDashboard/TenantMenuBar.jsx';

function TenantPaymentPage() {
  const {id} = useParams();
  const [tenantData, setTenantData] = useState({});
  const [paymentsData, setPaymentsData] = useState([]);
  const [paymentSectionOpen, setPaymentSectionOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTenantData({
          "title": "Mr",
          "surname": "Smith",
          "first_name": "John",
          "email": "john.smith@example.com",
          "mobile_no1": "1234567890",
          "location" : "N21 25 45",
          "address" : "22, Oshodi, Lekki Phase 1",
          "rent_per_month" : 3000,
          "bedrooms":3,
          "square_ft" : 2000,
          "handing_over_date":"2021-01-01",
          "rent_type": "RTO",
          "initial_value": 300000,
          "accountName": "John Smith",
          "accountNumber": "1234567890",
          "propertyId": id,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-gray-100 fixed h-screen w-screen max-h-screen max-w-screen flex flex-col">
      <NavBar />
      <TenantMenuBar />
      <div className='flex justify-end m-2 gap-2'>
        
        <button className="bg-secondary hover:bg-secondary text-white px-6 py-1 rounded-xl flex justify-end items-end mr-6">
          + Issue Complaint
        </button>
      </div>
      
      <div className="mr-6  rounded-lg mx-6 grid grid-cols-9 gap-2 bg-gray-100" style={{height: '80vh'}}>
        <div className="grid grid-row-5 col-span-2 bg-white overflow-auto rounded-lg p-2" style={{height: '80vh'}}>
          <div className="row-span-2 rounded-lg p-4 bg-white h-full">
            <PaymentSchedule />
          </div>
        </div>

        {!paymentSectionOpen && (
          <div className="row-span-7 col-span-7 flex flex-col min-h-96">
            <div className='row-span-3 rounded-lg mb-4 p-4 bg-white h-96'>
              <PaymentBreakDown />
            </div>
            
            <div className="row-span-4 bottom-0 overflow-auto bg-white rounded-lg shadow-sm mx-1 p-4" style={{ height: '50vh', overflowY: 'auto' }}>
              <PropertyPaymentHistoryCard paymentsData={paymentsData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TenantPaymentPage;
