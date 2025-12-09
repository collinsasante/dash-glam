import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
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
              <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                Packaging Glamour
              </h1>
              <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                Recover your account access<br />
                and get back to work
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
              {!submitted ? (
                <form className="form w-100" onSubmit={handleSubmit}>
                  {/* Heading */}
                  <div className="text-center mb-10">
                    <h1 className="text-gray-900 mb-3">Forgot Password?</h1>
                    <div className="text-gray-500 fw-semibold fs-4">
                      Enter your email to reset your password
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="fv-row mb-10">
                    <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="email"
                      name="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                    <button type="submit" className="btn btn-lg btn-primary fw-bold me-4">
                      <span className="indicator-label">Submit</span>
                    </button>
                    <Link to="/login" className="btn btn-lg btn-light-primary fw-bold">
                      Cancel
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  {/* Success Message */}
                  <div className="mb-10">
                    <div className="symbol symbol-100px mx-auto mb-7">
                      <span className="symbol-label bg-light-success">
                        <i className="ki-duotone ki-check fs-3x text-success">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </span>
                    </div>
                    <h1 className="text-gray-900 mb-3">Password Reset Email Sent</h1>
                    <div className="text-gray-500 fw-semibold fs-4 mb-10">
                      We have sent a password reset link to<br />
                      <strong>{email}</strong>
                    </div>
                    <div className="text-gray-500 fw-semibold fs-6 mb-10">
                      Please check your email and follow the instructions to reset your password.
                      If you don't see the email, check your spam folder.
                    </div>
                  </div>

                  {/* Return to Login */}
                  <div className="mb-0">
                    <Link to="/login" className="btn btn-lg btn-primary fw-bold">
                      Return to Sign In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            <div className="d-flex flex-center fw-semibold fs-6">
              <a href="https://www.packglamour.com/" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">
                About
              </a>
              <span className="text-muted px-2">|</span>
              <span className="text-muted px-2">Need help? Contact your administrator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
