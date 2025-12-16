import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { currentUser, resendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already verified
    if (currentUser?.emailVerified) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await resendVerificationEmail();
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="d-flex flex-column flex-root" id="kt_app_root" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column flex-lg-row flex-column-fluid" style={{ minHeight: '100vh' }}>
        {/* Aside */}
        <div className="d-flex flex-column flex-lg-row-auto w-xl-600px positon-xl-relative" style={{ backgroundColor: '#dc3545' }}>
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
            {/* Header */}
            <div className="d-flex flex-row-fluid flex-column text-center p-5 p-lg-10 pt-lg-20">
              <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                Packaging Glamour
              </h1>
              <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                Verify your email address<br />
                to access your account
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
              <div className="text-center mb-10">
                {/* Icon */}
                <div className="symbol symbol-100px mx-auto mb-7">
                  <span className="symbol-label bg-light-primary">
                    <i className="ki-duotone ki-sms fs-3x text-primary">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-gray-900 mb-3">Verify Your Email</h1>
                <div className="text-gray-500 fw-semibold fs-4 mb-5">
                  We've sent a verification email to<br />
                  <strong className="text-gray-900">{currentUser?.email}</strong>
                </div>
              </div>

              {/* Success Message */}
              {message && (
                <div className="alert alert-success d-flex align-items-center mb-10">
                  <i className="ki-duotone ki-check-circle fs-2hx text-success me-4">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <div className="d-flex flex-column">
                    <span>{message}</span>
                  </div>
                </div>
              )}

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

              {/* Instructions */}
              <div className="mb-10">
                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
                  <i className="ki-duotone ki-information-5 fs-2tx text-primary me-4">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                  <div className="d-flex flex-stack flex-grow-1">
                    <div className="fw-semibold">
                      <h4 className="text-gray-900 fw-bold mb-2">What's Next?</h4>
                      <div className="fs-6 text-gray-700">
                        <p className="mb-2">1. Check your email inbox (and spam folder)</p>
                        <p className="mb-2">2. Click the verification link in the email</p>
                        <p className="mb-0">3. Return here and click "I've Verified My Email"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex flex-wrap justify-content-center pb-lg-0 gap-3">
                <button
                  onClick={handleRefresh}
                  className="btn btn-lg btn-primary fw-bold"
                >
                  <i className="ki-duotone ki-check fs-2 me-2">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  I've Verified My Email
                </button>
                <button
                  onClick={handleResendEmail}
                  className="btn btn-lg btn-light-primary fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="indicator-progress d-block">
                      Sending...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  ) : (
                    <>
                      <i className="ki-duotone ki-send fs-2 me-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Resend Email
                    </>
                  )}
                </button>
              </div>

              {/* Logout Link */}
              <div className="text-center mt-10">
                <button
                  onClick={handleLogout}
                  className="btn btn-link text-gray-500 text-hover-primary"
                >
                  Sign out and use a different account
                </button>
              </div>
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
  );
}

export default VerifyEmail;
