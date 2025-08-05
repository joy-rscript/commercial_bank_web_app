import React, { useState, useEffect } from 'react';
import { TbPigMoney } from "react-icons/tb";

function PaymentSchedule() {
    const [showPaymentBreakdown, setShowPaymentBreakdown] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    
    // Dummy data
    const paymentSchedule = [
        { year: 2024, total_monthly_pymt: 3800.0, monthly_eqty_pymt: 1266.6667 },
        { year: 2025, total_monthly_pymt: 4053.3333, monthly_eqty_pymt: 1266.6667 },
        { year: 2026, total_monthly_pymt: 4332.0, monthly_eqty_pymt: 1266.6667 },
        { year: 2027, total_monthly_pymt: 4638.5333, monthly_eqty_pymt: 1266.6667 },
        { year: 2028, total_monthly_pymt: 4975.72, monthly_eqty_pymt: 1266.6667 },
        { year: 2029, total_monthly_pymt: 5346.6253, monthly_eqty_pymt: 1266.6667 },
        { year: 2030, total_monthly_pymt: 5754.6212, monthly_eqty_pymt: 1266.6667 },
        { year: 2031, total_monthly_pymt: 6203.4167, monthly_eqty_pymt: 1266.6667 },
        { year: 2032, total_monthly_pymt: 6697.0917, monthly_eqty_pymt: 1266.6667 },
        { year: 2033, total_monthly_pymt: 7240.1342, monthly_eqty_pymt: 1266.6667 },
        { year: 2034, total_monthly_pymt: 7837.481, monthly_eqty_pymt: 1266.6667 },
        { year: 2035, total_monthly_pymt: 8494.5624, monthly_eqty_pymt: 1266.6667 },
        { year: 2036, total_monthly_pymt: 9217.352, monthly_eqty_pymt: 1266.6667 },
        { year: 2037, total_monthly_pymt: 10012.4205, monthly_eqty_pymt: 1266.6667 },
        { year: 2038, total_monthly_pymt: 10886.9959, monthly_eqty_pymt: 1266.6667 },
        { year: 2039, total_monthly_pymt: 11849.0288, monthly_eqty_pymt: 1266.6667 },
        { year: 2040, total_monthly_pymt: 12907.265, monthly_eqty_pymt: 1266.6667 },
    ];

    return (
        <div className="bg-white pt-0 w-full rounded-xl sticky h-full mb-2">
            <div className="pr-2 pb-4 flex justify-between items-center sticky top-0 bg-white bg-opacity-85 border-b-2">
                <div className='bg-white'>
                    <h1 className="text-xl font-medium text-gray-900">Payment Schedule</h1>
                    <p className="max-w-2xl text-sm text-gray-500">Current - {year}</p>
                </div>
                <TbPigMoney
                    className="text-gray-500"
                    onClick={() => setShowPaymentBreakdown(!showPaymentBreakdown)}
                />
            </div>
            <div className='h-96'>
                <dl className='overflow-auto align-middle items-center text-gray-300'>
                    {!showPaymentBreakdown && paymentSchedule.map(({ year, total_monthly_pymt }, index) => (
                        <React.Fragment key={index}>
                            <div className='flex row justify-between space-y-4 items-center align-middle text-right text-gray-700'>
                                <span>{year}</span>
                                <span>€ {total_monthly_pymt.toFixed(2)}</span>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                    {showPaymentBreakdown && paymentSchedule.map(({ year, total_monthly_pymt, monthly_eqty_pymt }, index) => (
                        <React.Fragment key={index}>
                            <div className='flex row justify-between space-y-4 items-center align-middle text-right text-gray-700'>
                                <span>{year}</span>
                                <span>
                                    € {total_monthly_pymt.toFixed(2)}
                                    <div className='font-semibold align-bottom items-center text-xs space-x-2 pt-2'>
                                        <span className='text-tainted-yellow'> 
                                            € {monthly_eqty_pymt.toFixed(2)}
                                        </span>
                                    </div>
                                </span>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </dl>
            </div>
        </div>
    );
}

export default PaymentSchedule;
