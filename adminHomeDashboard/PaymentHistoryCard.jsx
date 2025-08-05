import React from 'react';
import { FaEllipsisV, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PaymentHistoryCard = () => {
    const payments = [
        { name: 'Ms Yasmin Tetteh', id: 'GE-15936-2102', amount: '€22,000.00', date: 'Mar 19' },
        { name: 'Mr Selom Kwaku-Dade', id: 'GE-15936-2102', amount: '€10,000.00', date: 'Mar 3' },
        { name: 'Mr Jordan Owusu Yebuah', id: 'GE-15936-2102', amount: '€9,000.00', date: 'Mar 13' },
        { name: 'Mrs Senam Lomiokor', id: 'GE-15936-2102', amount: '€17,000.00', date: 'Mar 27' },
        { name: 'Mrs Abigail Naa Hasford', id: 'GE-15936-2102', amount: '€25,000.00', date: 'Mar 17' },
    ];
    
    return (
        <div className="bg-white p-4 pt-0 w-full rounded-xl overflow-auto h-3/4">
            <div className="px-2 py-1 sm:px-4 flex justify-between items-center sticky top-0 bg-white bg-opacity-85">
                <div>
                  <h1 className="text-xl font-thin text-gray-900 py-4 ">Payment History</h1>
                    <p className=" max-w-2xl text-sm text-gray-500 ">March 2024</p>
                </div>
                <FaEllipsisV className="text-gray-500" />
            </div>
            <div className="p-6 border-gray-200">
                <dl>
                    {payments.map((payment, index) => (
                        <div key={index} className="bg-white px-4 py-4 sm:px-6 flex justify-between items-center border-b">
                            <div className="flex items-center">
                                <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <div className="ml-4">
                                    <h5 className="text-sm font-medium text-gray-900">{payment.name}</h5>
                                    <p className="text-xs text-gray-500">{payment.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-green-500">+ {payment.amount}</p>
                                <p className="text-xs text-gray-400">{payment.date}</p>
                            </div>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};



export default PaymentHistoryCard;
