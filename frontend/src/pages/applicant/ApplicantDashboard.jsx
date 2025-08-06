import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/Layout/NavBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { applications, properties } from '../../services/api'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  HomeIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline'

const ApplicantDashboard = () => {
  const [applicationData, setApplicationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchApplicationData()
  }, [])

  const fetchApplicationData = async () => {
    try {
      const email = localStorage.getItem('applicant_email')
      const applicantId = localStorage.getItem('applicant_id')
      
      if (!email && !applicantId) {
        navigate('/login')
        return
      }

      const response = await applications.getByEmail(email)
      setApplicationData(response.data)

      // Check if approved and has property
      if (response.data.official_use?.approved) {
        try {
          const propertyResponse = await properties.getTenantInfo(response.data.id)
          if (propertyResponse.data) {
            localStorage.setItem('tenant_id', response.data.id)
            localStorage.setItem('property_id', propertyResponse.data.id)
            navigate('/tenant/dashboard')
          }
        } catch (error) {
          // Property not assigned yet
        }
      }
    } catch (error) {
      console.error('Error fetching application data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <LoadingSpinner size="xl" className="mt-20" />
      </div>
    )
  }

  const progressSteps = [
    {
      title: 'Application Submitted',
      completed: true,
      icon: DocumentTextIcon
    },
    {
      title: 'Application Review',
      completed: applicationData?.official_use?.approved !== null,
      icon: ClockIcon
    },
    {
      title: 'Application Approved',
      completed: applicationData?.official_use?.approved === true,
      icon: CheckCircleIcon
    },
    {
      title: 'Property Assigned',
      completed: false, // This would be determined by property assignment
      icon: HomeIcon
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
          <p className="text-gray-600 mt-2">
            Track the progress of your rent-to-own application
          </p>
        </div>

        {/* Progress Steps */}
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Application Progress
          </h2>
          <div className="space-y-6">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <step.icon className={`w-5 h-5 ${
                    step.completed ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className={`font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {step.completed && (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Details */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Application Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Application ID</p>
              <p className="font-medium">#{applicationData?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Submission Date</p>
              <p className="font-medium">
                {applicationData?.official_use?.date_received ? 
                  new Date(applicationData.official_use.date_received).toLocaleDateString() : 
                  'N/A'
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Preferred Location</p>
              <p className="font-medium">{applicationData?.preferred_address_info?.preferred_location1}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                applicationData?.official_use?.approved === true ? 'bg-green-100 text-green-800' :
                applicationData?.official_use?.approved === false ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {applicationData?.official_use?.approved === true ? 'Approved' :
                 applicationData?.official_use?.approved === false ? 'Denied' :
                 'Under Review'}
              </span>
            </div>
          </div>

          {applicationData?.official_use?.approval_reason && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Admin Notes:</p>
              <p className="text-gray-900">{applicationData.official_use.approval_reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicantDashboard