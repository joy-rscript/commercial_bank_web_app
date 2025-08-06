import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Button from '../../components/UI/Button'
import { properties, payments } from '../../services/api'
import { 
  HomeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

const TenantDashboard = () => {
  const [tenantData, setTenantData] = useState(null)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const menuItems = [
    { label: 'Dashboard', path: '/tenant/dashboard' },
    { label: 'Payments', path: '/tenant/payments' },
    { label: 'Contact Us', path: '/tenant/contact-us' }
  ]

  useEffect(() => {
    fetchTenantData()
  }, [])

  const fetchTenantData = async () => {
    try {
      const propertyId = localStorage.getItem('property_id') || '38'
      
      const [tenantResponse, paymentsResponse] = await Promise.all([
        properties.getTenantInfo(propertyId),
        payments.getReceipts(propertyId, new Date().getFullYear())
      ])
      
      setTenantData(tenantResponse.data)
      setPaymentHistory(paymentsResponse.data)
    } catch (error) {
      console.error('Error fetching tenant data:', error)
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

  const stats = [
    {
      name: 'Monthly Payment',
      value: `₵${tenantData?.next_month_rentals?.toLocaleString() || 0}`,
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Equity Built',
      value: '₵45,000',
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Property Value',
      value: '₵300,000',
      icon: HomeIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <MenuBar menuItems={menuItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {tenantData?.tenant_name}</p>
          </div>
          
          <Button>
            <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
            Report Issue
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Property
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Project</p>
                  <p className="font-medium">{tenantData?.project_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unit Number</p>
                  <p className="font-medium">{tenantData?.house_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-medium">{tenantData?.number_of_bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-medium">{tenantData?.area} sq ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Acquired</p>
                  <p className="font-medium">
                    {tenantData?.date_acquired ? new Date(tenantData.date_acquired).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Payments
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ₵{payment.paid_amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.payment_mode}
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

export default TenantDashboard