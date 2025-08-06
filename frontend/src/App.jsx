import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ApplicationPage from './pages/ApplicationPage'
import PasswordResetPage from './pages/PasswordResetPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminApplications from './pages/admin/AdminApplications'
import AdminDevelopers from './pages/admin/AdminDevelopers'
import AdminTenants from './pages/admin/AdminTenants'
import SingleApplicationView from './pages/admin/SingleApplicationView'

// Tenant Pages
import TenantDashboard from './pages/tenant/TenantDashboard'
import TenantPayments from './pages/tenant/TenantPayments'
import TenantIssues from './pages/tenant/TenantIssues'

// Applicant Pages
import ApplicantDashboard from './pages/applicant/ApplicantDashboard'

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gcb-rto-application" element={<ApplicationPage />} />
            <Route path="/account/activate/:token" element={<PasswordResetPage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['gcb_admin', 'gcb_superadmin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/app-submissions" element={
              <ProtectedRoute allowedRoles={['gcb_admin', 'gcb_superadmin']}>
                <AdminApplications />
              </ProtectedRoute>
            } />
            <Route path="/admin/app-submissions/:id" element={
              <ProtectedRoute allowedRoles={['gcb_admin', 'gcb_superadmin']}>
                <SingleApplicationView />
              </ProtectedRoute>
            } />
            <Route path="/admin/view_real_est_developers" element={
              <ProtectedRoute allowedRoles={['gcb_admin', 'gcb_superadmin']}>
                <AdminDevelopers />
              </ProtectedRoute>
            } />
            <Route path="/admin/tenant" element={
              <ProtectedRoute allowedRoles={['gcb_admin', 'gcb_superadmin']}>
                <AdminTenants />
              </ProtectedRoute>
            } />

            {/* Tenant Routes */}
            <Route path="/tenant/dashboard" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/tenant/payments" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantPayments />
              </ProtectedRoute>
            } />
            <Route path="/tenant/contact-us" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantIssues />
              </ProtectedRoute>
            } />

            {/* Applicant Routes */}
            <Route path="/applicant/dashboard" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <ApplicantDashboard />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App