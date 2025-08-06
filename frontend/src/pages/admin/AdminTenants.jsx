import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Button from '../../components/UI/Button'
import { properties, payments } from '../../services/api'
import { UserIcon, CreditCardIcon } from '@heroicons/react/24/outline'

const AdminTenants = () => {
  const [tenantsData, setTenantsData] = useState([])
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Applications', path: '/admin/app-submissions' },
    { label: 'Developers', path: '/admin/view_real_est_developers' },
    { label: 'Tenants', path: '/admin/tenant' }
  ]

  // Mock tenant data - replace with actual API call
  const mockTenants = [
    {
      id: 1,
      name: 'Kwame Asare',
      email: 'kwame.asare@example.com',
      phone: '+233 123 456 789',
      property: 'Crester Valley Unit 1',
      monthlyRent: 2700,
      equityRatio: '30%',
      status: 'Current',
      lastPayment: '2024-01-15'
    },
    {
      id: 2,
      name: 'Eunice Frimpong',
      email: 'eunice.frimpong@example.com',
      phone: '+233 987 654 321',
      property: 'Crester Valley Unit 2',
      monthlyRent: 2300,
      equityRatio: '25%',
      status: 'Current',
      lastPayment: '2024-01-10'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTenantsData(mockTenants)
      setLoading(false)
    }, 1000)
  }, [])

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
            <p className="text-gray-600 mt-2">Manage tenant accounts and payments</p>
          </div>
          
          {selectedTenant && (
            <Button onClick={() => setShowPaymentModal(true)}>
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tenants List */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Tenants</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {tenantsData.map((tenant) => (
                  <div
                    key={tenant.id}
                    onClick={() => setSelectedTenant(tenant)}
                    className={`p-6 cursor-pointer transition-colors ${
                      selectedTenant?.id === tenant.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                          <p className="text-sm text-gray-500">{tenant.property}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₵{tenant.monthlyRent.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{tenant.equityRatio} equity</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tenant Details */}
          <div className="lg:col-span-1">
            {selectedTenant ? (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tenant Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedTenant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedTenant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedTenant.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property</p>
                    <p className="font-medium">{selectedTenant.property}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="font-medium">₵{selectedTenant.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equity Ratio</p>
                    <p className="font-medium">{selectedTenant.equityRatio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Payment</p>
                    <p className="font-medium">{selectedTenant.lastPayment}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a tenant to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTenants