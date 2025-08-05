import React, { useEffect, useState } from 'react'
import TenantDataAPI from '../../services/TenantDataAPI';

function MonthlyPaymentsCard({summary, payments}) {

    const id = 38;
    const tenant_id = localStorage.getItem('tenant_id');
    const date = new Date();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);    
    const year = date.getFullYear();
    const [summaryData, setSummaryData] = useState([])
    const token = localStorage.getItem('token');
    const tenantDataAPI = new TenantDataAPI(token);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const summaryDataResponse = await tenantDataAPI.getMonthlySummary(id);
          console.log(summaryDataResponse?.end_of_year_rentals);
          if (Array.isArray(summaryDataResponse)) {
            setSummaryData(summaryDataResponse);
          } else {
            setSummaryData([summaryDataResponse]);
          }
        } catch (error) {
          console.log('Error fetching summary data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (summaryData.length === 0) {
        fetchData();
      }
    }, [TenantDataAPI]);

    console.log("summaryData,", summaryData[0]?.end_of_year_rentals);
  return (
    <div className='p-4 font-sans bg-white'>
        <div className='gap-4'>
             <h2 className='font-medium text-lg'>Monthly Rental Payments</h2>
             <h6 className='font-light text-gray-600 text-sm px- mb-4' >{month} {year} </h6>
        </div>
        <div className=''>
          <h4 className='px-6 font-light text-gray-600 pl-2'>NEXT MONTHLY RENTALS, cedis</h4>
        <div className='py-10 pl-2 flex row align-bottom items-end gap-2 justify-center'> 
          <h1 className='text-xl font-medium '>₵ </h1>
        <h1 className='text-6xl font-medium '>
          {(summaryData[0]?.next_month_payment_rent + summaryData[0]?.next_month_payment_equity) > 1000  ?
           `${((summaryData[0]?.next_month_payment_rent + summaryData[0]?.next_month_payment_equity) / 1000).toFixed(2)}k` : 
           (summaryData[0]?.next_month_payment_rent + summaryData[0]?.next_month_payment_equity).toFixed(2)}
          </h1>        
           <h6 className='font-light text-error'> {summaryData[0]?.total_arrears.toFixed(2)} arrears</h6>
        </div>
        <span className='flex flex-row justify-between items-center gap-2 text-gray-600 mt-4 px-6'>
            <h4>Annual Notional Equity</h4>
            <h4>{summaryData[0]?.end_of_year_equity.toFixed(2)}</h4>
        </span>
        <span className='flex flex-row justify-between items-center gap-2 text-gray-600 px-6'>
            <h4>Annual Rental payments</h4>
            <h4>{summaryData[0]?.end_of_year_rentals.toFixed(2)}</h4>        
        </span>
        </div>
        


        
    </div>
  )
}

export default MonthlyPaymentsCard