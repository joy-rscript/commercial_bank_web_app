import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/Layout/NavBar'
import Button from '../components/UI/Button'
import { accounts } from '../services/api'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const PasswordResetPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: localStorage.getItem('applicant_email') || '',
    password_1: '',
    password_2: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    password_1: false,
    password_2: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    }
    
    if (!formData.password_1) {
      newErrors.password_1 = 'Password is required'
    } else if (formData.password_1.length < 8) {
      newErrors.password_1 = 'Password must be at least 8 characters'
    }
    
    if (!formData.password_2) {
      newErrors.password_2 = 'Please confirm your password'
    } else if (formData.password_1 !== formData.password_2) {
      newErrors.password_2 = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      await accounts.activateAccount(token, formData)
      
      // Auto-login after successful activation
      const loginResult = await auth.login(formData.email, formData.password_1)
      
      if (loginResult.success) {
        navigate('/applicant/dashboard')
      } else {
        navigate('/login')
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.error || 'Failed to activate account. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Activate Your Account</h2>
              <p className="mt-2 text-gray-600">Set your password to complete account setup</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password_1" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password_1"
                    name="password_1"
                    type={showPasswords.password_1 ? 'text' : 'password'}
                    value={formData.password_1}
                    onChange={handleChange}
                    className={`input-field pr-10 ${errors.password_1 ? 'border-red-300' : ''}`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, password_1: !prev.password_1 }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.password_1 ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password_1 && <p className="mt-1 text-sm text-red-600">{errors.password_1}</p>}
              </div>

              <div>
                <label htmlFor="password_2" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="password_2"
                    name="password_2"
                    type={showPasswords.password_2 ? 'text' : 'password'}
                    value={formData.password_2}
                    onChange={handleChange}
                    className={`input-field pr-10 ${errors.password_2 ? 'border-red-300' : ''}`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, password_2: !prev.password_2 }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.password_2 ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password_2 && <p className="mt-1 text-sm text-red-600">{errors.password_2}</p>}
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/login')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  loading={loading}
                  disabled={loading}
                >
                  Activate Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetPage