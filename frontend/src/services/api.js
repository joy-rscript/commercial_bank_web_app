import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/rto/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Auth API instance
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export { api, authAPI }

// Auth API methods
export const auth = {
  login: (email, password) => authAPI.post('token/', { email, password }),
  refreshToken: (refresh) => authAPI.post('token/refresh/', { refresh }),
}

// Application API methods
export const applications = {
  getAll: () => api.get('get_applications/'),
  getById: (id) => api.get(`get_application_sections?id=${id}`),
  getByEmail: (email) => api.get(`get_application_sections?email=${email}`),
  create: (data) => api.post('add_application', data),
  update: (data) => api.put('update_application', data),
}

// Developer API methods
export const developers = {
  getAll: () => api.get('developers/get_all_developers'),
  getById: (id) => api.get(`developers/get_developer?id=${id}`),
  create: (data) => api.post('developers/create_developer', data),
  update: (data) => api.patch('developers/update_developer', data),
  delete: (id) => api.delete('developers/delete_developer', { data: { developer_id: id } }),
}

// Property API methods
export const properties = {
  getAll: () => api.get('developer_projects/get_all_projects'),
  getById: (id) => api.get(`developer_projects/get_project?id=${id}`),
  create: (data) => api.post('developer_projects/create_project', data),
  assign: (data) => api.post('property/assign_property', data),
  unassign: (propertyId) => api.delete('property/unassign_property', { data: { property_id: propertyId } }),
  getTenantInfo: (propertyId) => api.get(`property/get_tenant_info?property_id=${propertyId}`),
  getMonthlySummary: (propertyId) => api.get(`property/monthly_summary?property_id=${propertyId}`),
  getEquityGrowth: (propertyId) => api.get(`property/equity_growth?property_id=${propertyId}`),
}

// Payment API methods
export const payments = {
  create: (data) => api.post('add_receipt', data),
  getReceipts: (propertyId, year, month) => {
    const params = new URLSearchParams()
    if (propertyId) params.append('property', propertyId)
    if (year) params.append('year', year)
    if (month) params.append('month', month)
    return api.get(`property/get_receipts?${params.toString()}`)
  },
}

// Dashboard API methods
export const dashboard = {
  getAdminPortfolio: () => api.get('dashboard/admin/portfolio'),
  getAdminUserBase: () => api.get('dashboard/admin/userbase'),
  getAdminDevelopers: () => api.get('dashboard/admin/developers'),
  getFinancialModel: (propertyId) => api.get(`dashboard/model/getUserModel?property_id=${propertyId}`),
}

// Account API methods
export const accounts = {
  activateAccount: (token, data) => api.patch(`accounts/complete_setup/${token}`, data),
  inviteTenant: (email) => api.patch('accounts/invite_tenant', { email }),
  inviteAdmin: (data) => api.post('accounts/invite_admin', data),
  notifyApplicationStatus: (data) => api.patch('accounts/notify_application_status', data),
}