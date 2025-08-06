import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { properties, payments } from '../../services/api'
import { CreditCardIcon, CalendarIcon } from '@heroicons/react/24/outline'

const TenantPayments = () => {
  const [paymentData, setPaymentData] = useState(null)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const menuItems = [
    { label: 'Dashboard', path: '/tenant/dashboard' },
    { label: 'Payments', path: '/tenant/payments' },
    { label: 'Contact Us', path: '/tenant/contact-us' }
  ]

  useEffect(() => {
    fetchPaymentData()
  }, [])

  const fetchPaymentData = async () => {
    try {
      const propertyId = localStorage.getItem('property_id') || '38'
      
      const [summaryResponse, historyResponse] = await Promise.all([
        properties.getMonthlySummary(propertyId),
        payments.getReceipts(propertyId, new Date().getFullYear())
      ])
      
      setPaymentData(summaryResponse.data)
      setPaymentHistory(historyResponse.data)
    } catch (error) {
      console.error('Error fetching payment data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <MenuBar menuItems={menuItems} />
        <LoadingSpinner size="xl" className="mt-20" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <MenuBar menuItems={menuItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">Manage your rent and equity payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Schedule */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Schedule
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next Payment Due</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₵{paymentData?.next_month_payment_rent + paymentData?.next_month_payment_equity || 0}
                      </p>
                    </div>
                    <CalendarIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                {paymentData?.total_arrears > 0 && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Outstanding</p>
                        <p className="text-lg font-semibold text-red-600">
                          ₵{paymentData.total_arrears.toLocaleString()}
                        </p>
                      </div>
                      <CreditCardIcon className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment History
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Rent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Equity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentHistory.map((payment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₵{payment.paid_amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₵{payment.rent_amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₵{payment.equity_amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.receipt_number}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {paymentHistory.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No payment history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenantPayments