import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import NotificationModal from '../NotificationModal';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { IoMdClose } from 'react-icons/io';
import Loading from '../Loading';

const PaymentForm = ({ tenantData, setPaymentSectionOpen }) => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState({
    date: new Date().toLocaleDateString(),
    accountName: tenantData.accountName || '',
    accountNumber: tenantData.accountNumber || '',
    amount: '',
    propertyId: tenantData.propertyId || '',
    oneTimePayment: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayment({ ...payment, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const accessToken = Cookies.get('access');
      const response = await axios.post('http://localhost:8000/api/payments', payment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setSubmitMessage('Payment processed successfully. Check payment dashboard for new updates');
        setIsSuccess(true);
      } else {
        setSubmitMessage('An error occurred during the payment processing. Try again later');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage('An error occurred during the payment processing. Try again later');
      setIsSuccess(false);
    } finally {
      setShowNotification(true);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowNotification(false);
    setPaymentSectionOpen(false);
  };

  return (
    <div className="relative border-gray-400 border-2 flex-1 bg-none px-8 py-6 rounded-lg text-gray-700 items-center gap-6">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setPaymentSectionOpen(false)}
      >
        <IoMdClose className="w-6 h-6" />
      </button>
      <h2 className="text-lg font-light mb-4 mt-4">Fill the form below to make a payment.</h2>
      <form onSubmit={handleSubmit}>
        <h2>Process Payment</h2>
        <div className='mb-4 flex flex-row justify-between items-center gap-8'>
          <label>
          Developer ID:
          <input type="text" value={tenantData?.developer_id || ''} readOnly />
        </label>
        <label>
          Tenant ID:
          <input type="text" value={tenantData?.tenant_id || ''} readOnly />
        </label>
        </div>
        

        <div className='mb-4 flex flex-row justify-between items-center gap-8'>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="date">Date Payment Made</label>
            <input
              type="text"
              id="date"
              name="date"
              readOnly
              value={payment.date}
              onChange={handleChange}
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="accountName">Account Name</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              readOnly
              value={payment.accountName}
              onChange={handleChange}
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
        </div>
        <div className='mb-4 flex flex-row justify-start items-center gap-6'>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="accountNumber">Bank Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              readOnly
              value={payment.accountNumber}
              onChange={handleChange}
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={payment.amount}
              onChange={handleChange}
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
        </div>
        <div className='mb-4 flex flex-row justify-start items-center gap-6'>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="propertyId">Property ID</label>
            <input
              type="text"
              id="propertyId"
              name="propertyId"
              readOnly
              value={payment.propertyId}
              onChange={handleChange}
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
          <div className="mx-2 flex items-center">
            <input
              type="checkbox"
              id="oneTimePayment"
              name="oneTimePayment"
              checked={payment.oneTimePayment}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="block text-gray-700" htmlFor="oneTimePayment">One Time Payment</label>
          </div>
        </div>
        <div className='flex flex-col justify-end items-end '>
          <div>
            <button type="submit">Submit Payment</button>
            <button type="button" onClick={() => setPaymentSectionOpen(false)}>
              Cancel
            </button>
   
          </div>
        </div>
      </form>
      {showNotification && (
        <NotificationModal
          isOpen={showNotification}
          onClose={handleClose}
          color={isSuccess ? "#32CD32" : "#FF6347"} // Green for success, Red for error
          hoverColor={isSuccess ? "#228B22" : "#FF4500"} // Darker green for success, Darker red for error
          msg={submitMessage}
          icon={isSuccess ? (
            <IoMdCheckmarkCircleOutline color="#32CD32" className="w-12 h-12"/>
          ) : (
            <PiWarningCircleBold color="#FF6347" className="w-12 h-12" />
          )}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default PaymentForm;
