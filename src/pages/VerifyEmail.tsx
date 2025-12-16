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
    <div className="d-flex flex-column flex-root" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="d-flex flex-center w-100 h-100 p-5">
        <div className="card shadow-lg" style={{ maxWidth: "550px", width: "100%", borderRadius: "20px", border: "none" }}>
          <div className="card-body p-10 p-lg-12">
            {/* Logo and Brand */}
            <div className="text-center mb-10">
              <div className="mb-7">
                <div className="symbol symbol-100px mx-auto mb-5" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)", borderRadius: "20px" }}>
                  <span className="symbol-label">
                    <i className="ki-duotone ki-shield-tick fs-3x text-white">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </span>
                </div>
                <h1 className="text-gray-900 fw-bolder mb-3" style={{ fontSize: "2rem" }}>
                  Verify Your Email
                </h1>
                <p className="text-gray-600 fw-semibold fs-5 mb-6">
                  We've sent a verification link to
                </p>
                <div className="alert alert-primary d-flex align-items-center" style={{ borderRadius: "12px", border: "none", background: "#eff6ff" }}>
                  <i className="ki-duotone ki-sms fs-2x text-primary me-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <span className="fw-bold text-primary">{currentUser?.email}</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {message && (
              <div className="alert alert-success d-flex align-items-center mb-8" style={{ borderRadius: "12px", border: "none", background: "#f0fdf4" }}>
                <i className="ki-duotone ki-check-circle fs-2hx text-success me-3">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <span className="fw-semibold text-success">{message}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-8" style={{ borderRadius: "12px", border: "none", background: "#fee" }}>
                <i className="ki-duotone ki-shield-cross fs-2hx text-danger me-3">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <span className="fw-semibold">{error}</span>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-10">
              <div className="card" style={{ background: "#f9fafb", border: "2px dashed #e5e7eb", borderRadius: "12px" }}>
                <div className="card-body p-6">
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-4" style={{ width: "40px", height: "40px", background: "#dc3545", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="fw-bold text-white fs-5">1</span>
                    </div>
                    <div>
                      <h5 className="text-gray-900 fw-bold mb-1">Check your email</h5>
                      <p className="text-gray-600 fs-7 mb-0">Look for the verification email in your inbox (and spam folder)</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-4" style={{ width: "40px", height: "40px", background: "#dc3545", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="fw-bold text-white fs-5">2</span>
                    </div>
                    <div>
                      <h5 className="text-gray-900 fw-bold mb-1">Click the link</h5>
                      <p className="text-gray-600 fs-7 mb-0">Click the verification link in the email we sent you</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="me-4" style={{ width: "40px", height: "40px", background: "#dc3545", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="fw-bold text-white fs-5">3</span>
                    </div>
                    <div>
                      <h5 className="text-gray-900 fw-bold mb-1">Return here</h5>
                      <p className="text-gray-600 fs-7 mb-0">Come back and click "I've Verified My Email" button below</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6">
              <button
                onClick={handleRefresh}
                className="btn btn-lg w-100 text-white fw-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)",
                  borderRadius: "12px",
                  height: "55px",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <i className="ki-duotone ki-check-circle fs-2 me-2">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  I've Verified My Email
                </span>
              </button>

              <button
                onClick={handleResendEmail}
                className="btn btn-lg w-100 btn-light-primary fw-bold"
                style={{ borderRadius: "12px", height: "55px", border: "2px solid #dc3545" }}
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="d-flex align-items-center justify-content-center">
                    <i className="ki-duotone ki-send fs-2 me-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    Resend Verification Email
                  </span>
                )}
              </button>
            </div>

            {/* Logout Link */}
            <div className="text-center">
              <button
                onClick={handleLogout}
                className="btn btn-link text-gray-600 fw-semibold"
                style={{ textDecoration: "none" }}
              >
                <i className="ki-duotone ki-exit-left fs-3 me-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Sign out and use a different account
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer text-center py-5" style={{ borderTop: "1px solid #eff2f5", borderRadius: "0 0 20px 20px", background: "#f9f9f9" }}>
            <div className="text-gray-600 fw-semibold fs-7">
              <a href="https://www.packglamour.com/" className="text-gray-600 text-hover-primary mx-2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                Need help?
              </a>
              <span className="mx-2">•</span>
              <span className="text-gray-600">Contact your administrator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
