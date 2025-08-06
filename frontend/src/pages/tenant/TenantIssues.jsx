import React, { useState } from 'react'
import NavBar from '../../components/Layout/NavBar'
import MenuBar from '../../components/Layout/MenuBar'
import Button from '../../components/UI/Button'
import { ExclamationTriangleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

const TenantIssues = () => {
  const [issueForm, setIssueForm] = useState({
    issueType: '',
    description: '',
    priority: 'medium'
  })
  const [issues, setIssues] = useState([
    {
      id: 1,
      date: '2024-01-15',
      type: 'Maintenance',
      description: 'Front gate keys missing on arrival',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Payment',
      description: 'Made a payment but cannot see the update',
      status: 'Resolved',
      priority: 'Medium'
    }
  ])

  const menuItems = [
    { label: 'Dashboard', path: '/tenant/dashboard' },
    { label: 'Payments', path: '/tenant/payments' },
    { label: 'Contact Us', path: '/tenant/contact-us' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newIssue = {
      id: issues.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: issueForm.issueType,
      description: issueForm.description,
      status: 'Open',
      priority: issueForm.priority
    }
    
    setIssues([newIssue, ...issues])
    setIssueForm({ issueType: '', description: '', priority: 'medium' })
  }

  const getStatusBadge = (status) => {
    const colors = {
      'Open': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Resolved': 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
        {status}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`}>
        {priority}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <MenuBar menuItems={menuItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact & Support</h1>
          <p className="text-gray-600 mt-2">Report issues and get help with your property</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issue Form */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Report an Issue
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Type
                  </label>
                  <select
                    value={issueForm.issueType}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, issueType: e.target.value }))}
                    className="input-field"
                    required
                  >
                    <option value="">Select issue type</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Payment">Payment</option>
                    <option value="Property">Property</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={issueForm.priority}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={issueForm.description}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="input-field"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                  Submit Issue
                </Button>
              </form>
            </div>
          </div>

          {/* Issues History */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Issue History
              </h3>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {issue.type} Issue
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(issue.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{issue.description}</p>
                        <div className="flex space-x-2">
                          {getStatusBadge(issue.status)}
                          {getPriorityBadge(issue.priority)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {issues.length === 0 && (
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No issues reported yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenantIssues