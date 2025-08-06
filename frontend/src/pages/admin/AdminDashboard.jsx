import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { dashboard } from '../../services/api'
import { 
  HomeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null)
  const [userBaseData, setUserBaseData] = useState(null)
  const [loading, setLoading] = useState(true)

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Applications', path: '/admin/app-submissions' },
    { label: 'Developers', path: '/admin/view_real_est_developers' },
    { label: 'Tenants', path: '/admin/tenant' }
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [portfolioResponse, userBaseResponse] = await Promise.all([
        dashboard.getAdminPortfolio(),
        dashboard.getAdminUserBase()
      ])
      
      setPortfolioData(portfolioResponse.data)
      setUserBaseData(userBaseResponse.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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
      name: 'Total Properties',
      value: portfolioData?.total_units || 0,
      icon: HomeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active Tenants',
      value: userBaseData?.number_of_tenants || 0,
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Avg Unit Price',
      value: `₵${portfolioData?.avg_unit_price?.toLocaleString() || 0}`,
      icon: CurrencyDollarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Occupancy Rate',
      value: `${portfolioData?.occupancy_rate?.toFixed(1) || 0}%`,
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <MenuBar menuItems={menuItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your REIT portfolio performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Developments by Location
            </h3>
            {portfolioData?.developments_per_location && (
              <div className="space-y-3">
                {Object.entries(portfolioData.developments_per_location).map(([location, percentage]) => (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{location}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Applications Received</span>
                <span className="font-semibold">{userBaseData?.applications_recieved || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Applications Approved</span>
                <span className="font-semibold text-green-600">{userBaseData?.applications_approved || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Income</span>
                <span className="font-semibold">₵{userBaseData?.average_income?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetPage