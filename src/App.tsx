import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './assets/css/style.bundle.css'
import './assets/plugins/global/plugins.bundle.css'

import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Apps from './pages/Apps'
import Resources from './pages/Resources'
import Reports from './pages/Reports'
import Profile from './pages/Profile'

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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
