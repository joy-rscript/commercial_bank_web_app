import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import { developers, properties } from '../../services/api'
import { PlusIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

const AdminDevelopers = () => {
  const [developersData, setDevelopersData] = useState({})
  const [propertiesData, setPropertiesData] = useState([])
  const [selectedDeveloper, setSelectedDeveloper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newDeveloper, setNewDeveloper] = useState({
    developer_name: '',
    location: '',
    phone_number: '',
    email_address: '',
    website: '',
    year_of_incorporation: '',
    year_of_first_project: '',
    location_of_first_project: '',
    key_contact_person: '',
    contact_person_position: '',
    contact_person_number: '',
    contact_person_email: ''
  })

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Applications', path: '/admin/app-submissions' },
    { label: 'Developers', path: '/admin/view_real_est_developers' },
    { label: 'Tenants', path: '/admin/tenant' }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [developersResponse, propertiesResponse] = await Promise.all([
        developers.getAll(),
        properties.getAll()
      ])
      
      setDevelopersData(developersResponse.data)
      setPropertiesData(propertiesResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDeveloper = async (e) => {
    e.preventDefault()
    
    try {
      await developers.create(newDeveloper)
      setShowCreateModal(false)
      setNewDeveloper({
        developer_name: '',
        location: '',
        phone_number: '',
        email_address: '',
        website: '',
        year_of_incorporation: '',
        year_of_first_project: '',
        location_of_first_project: '',
        key_contact_person: '',
        contact_person_position: '',
        contact_person_number: '',
        contact_person_email: ''
      })
      fetchData()
    } catch (error) {
      console.error('Error creating developer:', error)
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developers</h1>
            <p className="text-gray-600 mt-2">Manage real estate developers and their projects</p>
          </div>
          
          <Button onClick={() => setShowCreateModal(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Developer
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Developers List */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Developers</h3>
              <div className="space-y-2">
                {Object.keys(developersData).map((developerName) => (
                  <button
                    key={developerName}
                    onClick={() => setSelectedDeveloper(developerName)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedDeveloper === developerName
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">{developerName}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Details & Projects */}
          <div className="lg:col-span-3">
            {selectedDeveloper ? (
              <div className="space-y-6">
                {/* Developer Info */}
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {selectedDeveloper}
                  </h3>
                  {/* Add developer details here */}
                </div>

                {/* Projects */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Project Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Units
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {developersData[selectedDeveloper] && 
                         Object.entries(developersData[selectedDeveloper]).map(([projectName, project]) => (
                          <tr key={projectName} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {project.project_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {project.location}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {project.project_no_of_units}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              ₵{project.bedroom_price?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {project.complete || 'In Progress'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <BuildingOfficeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a developer to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Developer Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Developer"
        size="lg"
      >
        <form onSubmit={handleCreateDeveloper} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Developer Name *
              </label>
              <input
                type="text"
                value={newDeveloper.developer_name}
                onChange={(e) => setNewDeveloper(prev => ({ ...prev, developer_name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={newDeveloper.location}
                onChange={(e) => setNewDeveloper(prev => ({ ...prev, location: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newDeveloper.phone_number}
                onChange={(e) => setNewDeveloper(prev => ({ ...prev, phone_number: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={newDeveloper.email_address}
                onChange={(e) => setNewDeveloper(prev => ({ ...prev, email_address: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Developer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Action Modal */}
      <Modal
        isOpen={showModal && modalType !== 'create'}
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
                  // Handle email
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

export default AdminDevelopers