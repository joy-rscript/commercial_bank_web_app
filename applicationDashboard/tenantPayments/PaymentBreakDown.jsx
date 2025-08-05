import React from 'react';
import { TbPigMoney } from 'react-icons/tb'; // Assuming you have this icon

function PaymentBreakDown({ paymentSchedule, year, showPaymentBreakdown, setShowPaymentBreakdown }) {
  return (
    <div className="bg-white pt-0 w-full rounded-xl mb-2">
      <div className="pr-2 pb-4 flex justify-between items-center sticky top-0 bg-white bg-opacity-85 border-b-2">
        <div className='bg-white'>
          <h1 className="text-xl font-medium text-gray-900">RTO Payment Description</h1>
          <p className="max-w-2xl text-sm text-gray-500">{year}</p>
        </div>
        <TbPigMoney className="text-gray-500 cursor-pointer" onClick={() => setShowPaymentBreakdown(!showPaymentBreakdown)} />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Rent-to-Own Scheme</h2>
        <p className="text-sm text-gray-700 mt-2">
    The Rent-to-Own (RTO) scheme allows you to rent a property with the option to purchase it in the future. Rent payments include a portion that contributes towards the purchase price. Terms and conditions apply, including a fixed rental period and a predetermined purchase price. Please review the full agreement for details on eligibility, purchase options, and other conditions.
</p>

      </div>

    </div>
  );
}

export default PaymentBreakDown;
