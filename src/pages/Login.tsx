import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Basic authentication credentials
const VALID_CREDENTIALS = {
  email: 'admin@packglamour.com',
  password: 'admin123'
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Check credentials
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="d-flex flex-column flex-root" id="kt_app_root">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        {/* Aside */}
        <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-600px positon-xl-relative">
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
            {/* Header */}
            <div className="d-flex flex-row-fluid flex-column text-center p-5 p-lg-10 pt-lg-20">
              {/* Logo */}
              <a href="/dashboard" className="py-2 py-lg-20">
                <img
                  alt="Logo"
                  src="/src/assets/logo_white.png"
                  className="h-40px h-lg-50px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </a>

              {/* Title */}
              <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                Welcome to Packaging Glamour
              </h1>

              {/* Description */}
              <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                Plan your projects by managing orders, tracking<br />
                deliveries and submitting daily reports
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
              <form className="form w-100" onSubmit={handleSubmit}>
                {/* Heading */}
                <div className="text-center mb-10">
                  <h1 className="text-gray-900 mb-3">
                    Sign In to Packaging Glamour
                  </h1>
                  <div className="text-gray-500 fw-semibold fs-4">
                    New Here?
                    {' '}
                    <Link to="/signup" className="link-primary fw-bold">
                      Create an Account
                    </Link>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-10">
                    <i className="ki-duotone ki-information-5 fs-2hx text-danger me-4">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                    <div className="d-flex flex-column">
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="fv-row mb-10">
                  <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label fw-bold text-gray-900 fs-6 mb-0">Password</label>
                    <Link to="/forgot-password" className="link-primary fs-6 fw-bold">
                      Forgot Password ?
                    </Link>
                  </div>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="text-center">
                  <button type="submit" className="btn btn-lg btn-primary w-100 mb-5">
                    <span className="indicator-label">
                      Continue
                    </span>
                  </button>

                  {/* Separator */}
                  <div className="text-center text-muted text-uppercase fw-bold mb-5">or</div>

                  {/* Demo Info */}
                  <div className="notice d-flex bg-light-info rounded border-info border border-dashed p-6">
                    <i className="ki-duotone ki-information-5 fs-2tx text-info me-4">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                    <div className="d-flex flex-column text-start">
                      <h4 className="text-gray-900 fw-bold mb-2">Demo Credentials</h4>
                      <span className="fw-semibold fs-6 text-gray-700">Email: admin@packglamour.com</span>
                      <span className="fw-semibold fs-6 text-gray-700">Password: admin123</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            <div className="d-flex flex-center fw-semibold fs-6">
              <a href="https://www.packglamour.com/" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">About</a>
              <a href="https://www.packglamour.com/" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Support</a>
              <a href="https://www.packglamour.com/" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Purchase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
