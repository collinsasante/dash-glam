import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await signup(formData.email, formData.password, displayName, formData.department);
      navigate('/verify-email');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password');
      } else {
        setError('Failed to create account. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="d-flex flex-column flex-root" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div className="d-flex flex-center w-100 p-5 py-10" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px", border: "none" }}>
          <div className="card-body p-8 p-lg-10">
            {/* Logo and Brand */}
            <div className="text-center mb-8">
              <div className="mb-5">
                <img
                  src="/src/assets/logo_red.png"
                  alt="Packaging Glamour"
                  className="h-80px mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <h1 className="text-gray-900 fw-bolder mb-2" style={{ fontSize: "1.75rem" }}>
                  Create Your Account
                </h1>
                <p className="text-gray-600 fw-semibold fs-6">
                  Join Packaging Glamour team today
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-6" style={{ borderRadius: "12px", border: "none", background: "#fee" }}>
                <i className="ki-duotone ki-shield-cross fs-2hx text-danger me-3">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <span className="fw-semibold">{error}</span>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              {/* Name Inputs */}
              <div className="row mb-6">
                <div className="col-md-6 mb-6 mb-md-0">
                  <label className="form-label text-gray-900 fw-bold fs-7 mb-2">First Name</label>
                  <input
                    className="form-control form-control-lg"
                    style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                    type="text"
                    name="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-gray-900 fw-bold fs-7 mb-2">Last Name</label>
                  <input
                    className="form-control form-control-lg"
                    style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label className="form-label text-gray-900 fw-bold fs-7 mb-2">Email Address</label>
                <div className="position-relative">
                  <span className="position-absolute top-50 translate-middle-y ms-4">
                    <i className="ki-duotone ki-sms fs-2 text-gray-500">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </span>
                  <input
                    className="form-control form-control-lg ps-14"
                    style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                    type="email"
                    name="email"
                    placeholder="john.doe@packglamour.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Department Input */}
              <div className="mb-6">
                <label className="form-label text-gray-900 fw-bold fs-7 mb-2">Department</label>
                <div className="position-relative">
                  <span className="position-absolute top-50 translate-middle-y ms-4" style={{ zIndex: 2 }}>
                    <i className="ki-duotone ki-briefcase fs-2 text-gray-500">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </span>
                  <select
                    className="form-select form-select-lg ps-14"
                    style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Production">Production</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              {/* Password Inputs */}
              <div className="row mb-6">
                <div className="col-md-6 mb-6 mb-md-0">
                  <label className="form-label text-gray-900 fw-bold fs-7 mb-2">Password</label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-4">
                      <i className="ki-duotone ki-lock fs-2 text-gray-500">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                    </span>
                    <input
                      className="form-control form-control-lg ps-14 pe-14"
                      style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Min 6 characters"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: "transparent", border: "none" }}
                    >
                      <i className={`ki-duotone ${showPassword ? 'ki-eye-slash' : 'ki-eye'} fs-3 text-gray-500`}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-gray-900 fw-bold fs-7 mb-2">Confirm Password</label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-4">
                      <i className="ki-duotone ki-shield-tick fs-2 text-gray-500">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                    </span>
                    <input
                      className="form-control form-control-lg ps-14 pe-14"
                      style={{ borderRadius: "10px", border: "2px solid #e4e6ef", height: "50px" }}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ background: "transparent", border: "none" }}
                    >
                      <i className={`ki-duotone ${showConfirmPassword ? 'ki-eye-slash' : 'ki-eye'} fs-3 text-gray-500`}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-7">
                <label className="form-check form-check-custom form-check-solid align-items-start">
                  <input
                    className="form-check-input me-3 mt-1"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    disabled={loading}
                    style={{ borderRadius: "6px", width: "20px", height: "20px" }}
                  />
                  <span className="form-check-label text-gray-700 fs-7">
                    I agree to the{' '}
                    <a href="https://www.packglamour.com/" target="_blank" rel="noopener noreferrer" className="link-primary fw-bold" style={{ textDecoration: "none" }}>
                      Terms & Conditions
                    </a>
                    {' '}and{' '}
                    <a href="https://www.packglamour.com/" target="_blank" rel="noopener noreferrer" className="link-primary fw-bold" style={{ textDecoration: "none" }}>
                      Privacy Policy
                    </a>
                  </span>
                </label>
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
                      Creating account...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center">
                      <i className="ki-duotone ki-check-circle fs-2 me-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Create Account
                    </span>
                  )}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-gray-600 fw-semibold fs-6">
                  Already have an account?{' '}
                  <Link to="/login" className="link-primary fw-bold" style={{ textDecoration: "none" }}>
                    Sign In
                  </Link>
                </span>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="card-footer text-center py-4" style={{ borderTop: "1px solid #eff2f5", borderRadius: "0 0 20px 20px", background: "#f9f9f9" }}>
            <div className="text-gray-600 fw-semibold fs-8">
              By creating an account, you agree to our terms and conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
