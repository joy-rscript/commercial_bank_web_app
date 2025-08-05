import React from 'react'

export default function UserBaseInfo() {
    const propertyStats = {
        
        applicationsReceived: 100,
        applicationsApproved: 75,
        numberOfTenants: 40,
        averageIncome: 50000,
        averageRentPayment: 1200
      };
  return (
    <div className="flex justify-between p-2 mt-2 sm:mt-4 md:mt-2 lg:mt-4 xl:mt-8">
        <div className="text-faint flex flex-col justify-start items-start gap-2  text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
          <span >Applications Received</span>
          <span>Applications Approved</span>
          <span>Number of Tenants</span>
          <span>Average Income</span>
          <span >Average Rent Payment</span>
          
        </div>
        <div className="text-faint flex flex-col justify-end items-end  gap-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
          <span>{propertyStats.applicationsReceived}</span>
          <span>{propertyStats.applicationsApproved}</span>
          <span>{propertyStats.numberOfTenants}</span>
          <span className='text-money '>{propertyStats.averageIncome}c</span>
          <span className='text-money'>{propertyStats.averageRentPayment}c</span>
        
        </div>
      </div>
  )
}
