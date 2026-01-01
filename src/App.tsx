import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './assets/css/style.bundle.css'
import './assets/plugins/global/plugins.bundle.css'
import './assets/css/custom.css'

import { AuthProvider, useAuth } from './contexts/AuthContext'
import DepartmentRoute from './components/DepartmentRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import Apps from './pages/Apps'
import Resources from './pages/Resources'
import Reports from './pages/Reports'
import Profile from './pages/Profile'

// Keep only internal app modules that are still used
import EmployeeManagement from './pages/apps/EmployeeManagement'
import SystemAdmin from './pages/apps/SystemAdmin'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Redirect to email verification if email is not verified
  if (!currentUser.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
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
            path="/apps/employees"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Administration', 'Management']}>
                  <EmployeeManagement />
                </DepartmentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps/admin"
            element={
              <ProtectedRoute>
                <DepartmentRoute allowedDepartments={['Administration', 'Engineering', 'Management']}>
                  <SystemAdmin />
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
