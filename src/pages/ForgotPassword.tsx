import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Failed to send reset email. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div className="d-flex flex-column flex-center flex-lg-row-fluid">
        <div className="w-lg-500px p-10 mx-auto">
          <div className="card shadow-lg" style={{ borderRadius: "20px", border: "none" }}>
          <div className="card-body p-10 p-lg-12">
            {!submitted ? (
              <>
                {/* Logo and Brand */}
                <div className="text-center mb-10">
                  <div className="mb-7">
                    <img
                      src="/src/assets/logo_red.png"
                      alt="Packaging Glamour"
                      className="h-100px mx-auto mb-5"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <h1 className="text-gray-900 fw-bolder mb-3" style={{ fontSize: "2rem" }}>
                      Forgot Password?
                    </h1>
                    <p className="text-gray-600 fw-semibold fs-5">
                      No worries, we'll send you reset instructions
                    </p>
                  </div>
                </div>

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

                {/* Reset Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="mb-8">
                    <label className="form-label text-gray-900 fw-bold fs-6 mb-3">
                      Email Address
                    </label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 translate-middle-y ms-4">
                        <i className="ki-duotone ki-sms fs-2 text-gray-500">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </span>
                      <input
                        className="form-control form-control-lg ps-14"
                        style={{ borderRadius: "12px", border: "2px solid #e4e6ef", height: "55px" }}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="btn btn-lg w-100 text-white fw-bold"
                      style={{
                        background: "linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)",
                        borderRadius: "12px",
                        height: "55px",
                        border: "none",
                        boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"
                      }}
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
                          Reset Password
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link to="/login" className="btn btn-link text-gray-600 fw-semibold" style={{ textDecoration: "none" }}>
                      <i className="ki-duotone ki-arrow-left fs-3 me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="mb-10">
                    <img
                      src="/src/assets/logo_red.png"
                      alt="Packaging Glamour"
                      className="h-100px mx-auto mb-7"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <h1 className="text-gray-900 fw-bolder mb-3" style={{ fontSize: "2rem" }}>
                      Check Your Email
                    </h1>
                    <p className="text-gray-600 fw-semibold fs-5 mb-8">
                      We've sent a password reset link to
                    </p>
                    <div className="alert alert-primary d-flex align-items-center mb-8" style={{ borderRadius: "12px", border: "none", background: "#eff6ff" }}>
                      <i className="ki-duotone ki-sms fs-2x text-primary me-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <span className="fw-bold text-primary">{email}</span>
                    </div>
                    <p className="text-gray-500 fs-6 mb-10">
                      Click the link in the email to reset your password.
                      <br />
                      If you don't see it, check your spam folder.
                    </p>
                  </div>

                  {/* Return to Login */}
                  <Link
                    to="/login"
                    className="btn btn-lg w-100 text-white fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)",
                      borderRadius: "12px",
                      height: "55px",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"
                    }}
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      <i className="ki-duotone ki-arrow-left fs-2 me-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Back to Sign In
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="card-footer text-center py-5" style={{ borderTop: "1px solid #eff2f5", borderRadius: "0 0 20px 20px", background: "#f9f9f9" }}>
            <div className="text-gray-600 fw-semibold fs-7">
              <a href="https://www.packglamour.com/" className="text-gray-600 text-hover-primary mx-2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                About
              </a>
              <span className="mx-2">•</span>
              <a href="https://www.packglamour.com/" className="text-gray-600 text-hover-primary mx-2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                Support
              </a>
              <span className="mx-2">•</span>
              <a href="https://www.packglamour.com/" className="text-gray-600 text-hover-primary mx-2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                Privacy
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
