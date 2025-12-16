import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './assets/css/style.bundle.css'
import './assets/plugins/global/plugins.bundle.css'

import { AuthProvider, useAuth } from './contexts/AuthContext'
import DepartmentRoute from './components/DepartmentRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Apps from './pages/Apps'
import Resources from './pages/Resources'
import Reports from './pages/Reports'
import Profile from './pages/Profile'

// App modules
import ProductionDashboard from './pages/apps/ProductionDashboard'
import InventoryManagement from './pages/apps/InventoryManagement'
import DeliveryTracker from './pages/apps/DeliveryTracker'
import LabelCalculator from './pages/apps/LabelCalculator'
import CRM from './pages/apps/CRM'
import Accounting from './pages/apps/Accounting'
import EmployeeManagement from './pages/apps/EmployeeManagement'
import SystemAdmin from './pages/apps/SystemAdmin'
import Analytics from './pages/apps/Analytics'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth()
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps"
            element={
              <ProtectedRoute>
                <Apps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Department-specific app routes */}
          <Route
            path="/apps/production"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Production', 'Management']}>
                  <ProductionDashboard />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/inventory"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Warehouse', 'Management']}>
                  <InventoryManagement />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/delivery"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Logistics', 'Management']}>
                  <DeliveryTracker />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/label-calculator"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Sales', 'Production', 'Management']}>
                  <LabelCalculator />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/crm"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Sales', 'Management']}>
                  <CRM />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/accounting"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Finance', 'Management']}>
                  <Accounting />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/employees"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['HR', 'Management']}>
                  <EmployeeManagement />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/admin"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['IT', 'Management']}>
                  <SystemAdmin />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/analytics"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Management', 'Finance', 'Sales']}>
                  <Analytics />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
