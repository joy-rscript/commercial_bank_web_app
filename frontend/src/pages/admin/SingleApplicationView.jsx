import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import { applications, accounts } from '../../services/api'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EnvelopeIcon,
  UserIcon 
} from '@heroicons/react/24/outline'

const SingleApplicationView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [applicationData, setApplicationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [reason, setReason] = useState('')

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Applications', path: '/admin/app-submissions' },
    { label: 'Developers', path: '/admin/view_real_est_developers' },
    { label: 'Tenants', path: '/admin/tenant' }
  ]

  useEffect(() => {
    fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    try {
      const response = await applications.getById(id)
      setApplicationData(response.data)
    } catch (error) {
      console.error('Error fetching application:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (approved) => {
    setActionLoading(true)
    
    try {
      await applications.update({
        id: parseInt(id),
        approved,
        approval_reason: reason
      })
      
      // Send notification
      await accounts.notifyApplicationStatus({
        email: applicationData.personal_info.email,
        status: approved ? 'approve' : 'deny'
      })
      
      setShowModal(false)
      setReason('')
      fetchApplication() // Refresh data
      
    } catch (error) {
      console.error('Error updating application:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
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

  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <MenuBar menuItems={menuItems} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Application not found</p>
            <Button onClick={() => navigate('/admin/app-submissions')} className="mt-4">
              Back to Applications
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const sections = [
    { key: 'personal_info', title: 'Personal Information' },
    { key: 'previous_address_info', title: 'Current Address' },
    { key: 'employment_details', title: 'Employment Details' },
    { key: 'bank_details', title: 'Bank Details' },
    { key: 'preferred_address_info', title: 'Preferred Location' },
    { key: 'references', title: 'References' },
    { key: 'declaration_info', title: 'Declaration' },
    { key: 'official_use', title: 'Official Use' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <MenuBar menuItems={menuItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Application #{id}
            </h1>
            <p className="text-gray-600 mt-2">
              {applicationData.personal_info?.first_name} {applicationData.personal_info?.surname}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => openModal('email')}
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button
              variant="primary"
              onClick={() => openModal('approve')}
              disabled={applicationData.official_use?.approved === true}
            >
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => openModal('deny')}
              disabled={applicationData.official_use?.approved === false}
            >
              <XCircleIcon className="w-4 h-4 mr-2" />
              Deny
            </Button>
          </div>
        </div>

        {/* Application Summary */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Applicant</p>
                <p className="font-semibold">
                  {applicationData.personal_info?.first_name} {applicationData.personal_info?.surname}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="font-semibold">₵{applicationData.employment_details?.current_net_income?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Preferred Location</p>
              <p className="font-semibold">{applicationData.preferred_address_info?.preferred_location1}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              {getStatusBadge(applicationData.official_use?.approved)}
            </div>
          </div>
        </div>

        {/* Application Sections */}
        <div className="space-y-6">
          {sections.map(section => {
            const sectionData = applicationData[section.key]
            if (!sectionData) return null

            return (
              <div key={section.key} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(sectionData).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Modals */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalType === 'approve' ? 'Approve Application' :
          modalType === 'deny' ? 'Deny Application' : 'Send Email'
        }
      >
        <div className="space-y-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              modalType === 'email' ? 'Enter your message...' :
              modalType === 'approve' ? 'Reason for approval (optional)...' :
              'Reason for denial...'
            }
            rows={4}
            className="input-field"
          />
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (modalType === 'email') {
                  // Handle email sending
                  setShowModal(false)
                } else {
                  handleAction(modalType === 'approve')
                }
              }}
              loading={actionLoading}
              className="flex-1"
              variant={modalType === 'deny' ? 'danger' : 'primary'}
            >
              {modalType === 'email' ? 'Send' : modalType === 'approve' ? 'Approve' : 'Deny'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SingleApplicationView