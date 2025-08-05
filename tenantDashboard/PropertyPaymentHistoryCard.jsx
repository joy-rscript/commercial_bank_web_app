import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaUser } from 'react-icons/fa';
import axios from 'axios';
import TenantDataAPI from '../../services/TenantDataAPI';

const PropertyPaymentHistoryCard = ({ tenantData }) => {
  const propertyId = 38;  
  const [year, setYear] = useState(new Date().getFullYear());
  const [payments, setPayments] = useState([]);
  const [displayEquity, setDisplayEquity] = useState(false);
  const token = localStorage.getItem('token');
  const tenantDataAPI = new TenantDataAPI(token);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await tenantDataAPI.getPropertyPaymentHistory(propertyId);
        if (response){
          setPayments(response);
        }else console.log("no data")
        
      } catch (error) {
        console.error('Error fetching property payment history:', error);
      }
    };
    if (payments?.length === 0) {
      fetchData();
    }
  }, [propertyId, year]);

  return (
    <div className="bg-white pt-0 w-full px-4 rounded-xl overflow-auto h-full">
      <div className="pr-2 pt-1 flex justify-between items-center sticky top-0 bg-white bg-opacity-45 backdrop-filter backdrop-blur-sm">
        <div className="bg-white">
          <h1 className="text-xl font-medium text-gray-900">Payment History</h1>
          <p className="max-w-2xl text-sm text-gray-500">{year}</p>
        </div>
        <FaEllipsisV className="text-gray-500" />
      </div>
      <div className="p-2 border-gray-200">
        <dl>
          {payments?.map((payment, index) => (
            <div key={index} className="px-4 py-4 sm:px-6 flex border-b justify-between">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                  <FaUser className="text-gray-400" />
                </div>
                <div className="ml-4">
                  <h5 className="text-sm font-medium text-gray-900">{tenantData?.tenant_name}</h5>
                  <p className="text-xs text-gray-500">{tenantData?.tenant_application_number}</p>
                </div>
              </div>
              <h5 className="text-sm font-medium text-gray-900 flex items-center justify-center">{payment?.payment_mode}</h5>
              <h5 className="text-sm font-medium text-gray-900 flex items-center justify-center">{payment?.payment_date}</h5>
              <div className="items-end">
                <p className="text-sm text-right font-semibold text-gray-800">+ {payment?.paid_amount}</p>
                <p className="text-xs text-right text-tainted-yellow">{payment?.rent_amount}</p>
                {displayEquity && (
                  <p className="text-xs text-deep-secondary-contrast">{payment?.equity_amount}</p>
                )}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default PropertyPaymentHistoryCard;
