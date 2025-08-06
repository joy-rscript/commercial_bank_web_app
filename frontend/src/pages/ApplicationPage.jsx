import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Layout/NavBar'
import Button from '../components/UI/Button'
import Modal from '../components/UI/Modal'
import { applications } from '../services/api'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const ApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ type: '', message: '' })
  
  const navigate = useNavigate()

  const formSections = [
    {
      title: 'Personal Information',
      fields: [
        { name: 'title', label: 'Title', type: 'select', options: ['Mr', 'Mrs', 'Miss', 'Dr'], required: true },
        { name: 'first_name', label: 'First Name', type: 'text', required: true },
        { name: 'surname', label: 'Surname', type: 'text', required: true },
        { name: 'other_names', label: 'Other Names', type: 'text' },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { name: 'marital_status', label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'] },
        { name: 'num_children', label: 'Number of Children', type: 'number', required: true },
        { name: 'id_type', label: 'ID Type', type: 'select', options: ['Ghana Card', 'SSNIT/Biometric Card'], required: true },
        { name: 'id_card_number', label: 'ID Number', type: 'text', required: true },
        { name: 'issue_date', label: 'Issue Date', type: 'date', required: true },
        { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'mobile_no1', label: 'Primary Mobile', type: 'tel', required: true },
        { name: 'mobile_no2', label: 'Secondary Mobile', type: 'tel' }
      ]
    },
    {
      title: 'Current Address',
      fields: [
        { name: 'residential_address', label: 'Current Address', type: 'textarea', required: true },
        { name: 'ghanapost_gps_code', label: 'GhanaPost GPS Code', type: 'text', required: true },
        { name: 'num_bedrooms', label: 'Number of Bedrooms', type: 'number', required: true },
        { name: 'duration_at_address_years', label: 'Years at Address', type: 'number', required: true },
        { name: 'duration_at_address_months', label: 'Months at Address', type: 'number', required: true },
        { name: 'rent_monthly', label: 'Monthly Rent (GHS)', type: 'number', required: true },
        { name: 'reason_for_moving', label: 'Reason for Moving', type: 'textarea', required: true },
        { name: 'landlord_name', label: 'Landlord Name', type: 'text', required: true },
        { name: 'landlord_mobile_no', label: 'Landlord Mobile', type: 'tel', required: true },
        { name: 'any_pets', label: 'Do you have pets?', type: 'checkbox' },
        { name: 'pet_description', label: 'Pet Description', type: 'textarea' },
        { name: 'smoke', label: 'Do you smoke?', type: 'checkbox' },
        { name: 'evicted', label: 'Ever been evicted?', type: 'checkbox' },
        { name: 'eviction_reason', label: 'Eviction Reason', type: 'textarea' }
      ]
    },
    {
      title: 'Employment Details',
      fields: [
        { name: 'current_employer_name', label: 'Current Employer', type: 'text', required: true },
        { name: 'employer_email', label: 'Employer Email', type: 'email', required: true },
        { name: 'employer_contact_no', label: 'Employer Contact', type: 'tel', required: true },
        { name: 'staff_id', label: 'Staff ID', type: 'text', required: true },
        { name: 'employment_date', label: 'Employment Date', type: 'date', required: true },
        { name: 'supervisor_name', label: 'Supervisor Name', type: 'text', required: true },
        { name: 'supervisor_contact', label: 'Supervisor Contact', type: 'tel', required: true },
        { name: 'current_net_income', label: 'Monthly Net Income (GHS)', type: 'number', required: true },
        { name: 'other_income_sources', label: 'Other Income (GHS)', type: 'number' }
      ]
    },
    {
      title: 'Bank Details',
      fields: [
        { name: 'bank_name', label: 'Bank Name', type: 'text', required: true },
        { name: 'branch', label: 'Branch', type: 'text', required: true },
        { name: 'checking_account', label: 'Account Number', type: 'text', required: true },
        { name: 'checking_account_controller_details', label: 'Account Holder Name', type: 'text', required: true },
        { name: 'savings_account', label: 'Savings Account', type: 'text' }
      ]
    },
    {
      title: 'Preferred Location',
      fields: [
        { name: 'preferred_location1', label: 'First Choice Location', type: 'textarea', required: true },
        { name: 'preferred_location2', label: 'Second Choice Location', type: 'textarea', required: true },
        { name: 'preferred_location3', label: 'Third Choice Location', type: 'textarea' },
        { name: 'min_num_bedrooms', label: 'Minimum Bedrooms', type: 'number', required: true },
        { name: 'max_num_bedrooms', label: 'Maximum Bedrooms', type: 'number', required: true },
        { name: 'preferred_move_in_date', label: 'Preferred Move-in Date', type: 'date', required: true }
      ]
    },
    {
      title: 'References',
      fields: [
        { name: 'professional_referee_name1', label: 'Professional Reference 1 - Name', type: 'text', required: true },
        { name: 'professional_referee_address1', label: 'Professional Reference 1 - Address', type: 'text', required: true },
        { name: 'professional_referee_phone1', label: 'Professional Reference 1 - Phone', type: 'tel', required: true },
        { name: 'professional_referee_name2', label: 'Professional Reference 2 - Name', type: 'text' },
        { name: 'professional_referee_address2', label: 'Professional Reference 2 - Address', type: 'text' },
        { name: 'professional_referee_phone2', label: 'Professional Reference 2 - Phone', type: 'tel' },
        { name: 'emergency_contact_name', label: 'Emergency Contact Name', type: 'text', required: true },
        { name: 'emergency_contact_address', label: 'Emergency Contact Address', type: 'text', required: true },
        { name: 'emergency_contact_phone', label: 'Emergency Contact Phone', type: 'tel', required: true }
      ]
    },
    {
      title: 'Declaration',
      fields: [
        { name: 'declaration_name', label: 'Full Name', type: 'text', required: true },
        { name: 'declaration_date', label: 'Date', type: 'date', required: true },
        { name: 'declaration_signature', label: 'Digital Signature', type: 'text', required: true }
      ]
    }
  ]

  const handleNext = () => {
    const currentSection = formSections[currentStep]
    const sectionErrors = {}
    
    currentSection.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        sectionErrors[field.name] = `${field.label} is required`
      }
    })
    
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors)
      return
    }
    
    setErrors({})
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Add declaration text
      const submissionData = {
        ...formData,
        declaration_text: 'I hereby declare that the information provided is true and accurate to the best of my knowledge and belief.'
      }
      
      const response = await applications.create(submissionData)
      
      setModalContent({
        type: 'success',
        message: 'Application submitted successfully! Please check your email to activate your account.'
      })
      setShowModal(true)
      
      // Store email for potential login redirect
      localStorage.setItem('applicant_email', formData.email)
      
    } catch (error) {
      setModalContent({
        type: 'error',
        message: error.response?.data?.error || 'An error occurred while submitting your application.'
      })
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  const renderField = (field) => {
    const value = formData[field.name] || ''
    const error = errors[field.name]

    const baseInputClasses = `input-field ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              name={field.name}
              value={value}
              onChange={handleChange}
              className={baseInputClasses}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )
      
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              name={field.name}
              value={value}
              onChange={handleChange}
              rows={3}
              className={baseInputClasses}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )
      
      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={field.name}
              checked={value === true}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
            />
            <label className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        )
      
      default:
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={value}
              onChange={handleChange}
              className={baseInputClasses}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )
    }
  }

  const currentSection = formSections[currentStep]
  const progress = ((currentStep + 1) / formSections.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            GCB Rent-to-Own Application
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are delighted at your decision to purchase a home through GCB's RTO scheme. 
            Please fill out this form to express your interest in the program.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {formSections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentSection.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSection.fields.map(renderField)}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.setItem('applicationDraft', JSON.stringify(formData))
                  navigate('/')
                }}
              >
                Save & Exit
              </Button>
              
              {currentStep === formSections.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  Submit Application
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          if (modalContent.type === 'success') {
            navigate('/login')
          }
        }}
        title={modalContent.type === 'success' ? 'Application Submitted' : 'Submission Error'}
      >
        <div className="text-center">
          {modalContent.type === 'success' ? (
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <p className="text-gray-600 mb-6">{modalContent.message}</p>
          <Button
            onClick={() => {
              setShowModal(false)
              if (modalContent.type === 'success') {
                navigate('/login')
              }
            }}
            variant={modalContent.type === 'success' ? 'primary' : 'secondary'}
          >
            {modalContent.type === 'success' ? 'Go to Login' : 'Try Again'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ApplicationPage