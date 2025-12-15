import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      await signup(formData.email, formData.password, displayName);
      navigate('/dashboard');
    } catch (err: any) {
      // Handle Firebase errors
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                Join our team and access<br />
                all company resources and applications
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-600px p-10 p-lg-15 mx-auto">
              <form className="form w-100" onSubmit={handleSubmit}>
                {/* Heading */}
                <div className="text-center mb-10">
                  <h1 className="text-gray-900 mb-3">Create an Account</h1>
                  <div className="text-gray-500 fw-semibold fs-4">
                    Already have an account?{' '}
                    <Link to="/login" className="link-primary fw-bold">
                      Sign in here
                    </Link>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-7">
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

                {/* Name Inputs */}
                <div className="row fv-row mb-7">
                  <div className="col-xl-6">
                    <label className="form-label fw-bold text-gray-900 fs-6">First Name</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-label fw-bold text-gray-900 fs-6">Last Name</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="fv-row mb-7">
                  <label className="form-label fw-bold text-gray-900 fs-6">Email</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="fv-row mb-7">
                  <label className="form-label fw-bold text-gray-900 fs-6">Password</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <div className="text-muted fs-7 mt-2">
                    Use 6 or more characters with a mix of letters and numbers
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="fv-row mb-7">
                  <label className="form-label fw-bold text-gray-900 fs-6">Confirm Password</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="fv-row mb-10">
                  <label className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="form-check-label fw-semibold text-gray-700 fs-6">
                      I agree to the{' '}
                      <a href="https://www.packglamour.com/" target="_blank" rel="noopener noreferrer" className="link-primary">
                        Terms & Conditions
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="indicator-progress d-block">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    ) : (
                      <span className="indicator-label">Create Account</span>
                    )}
                  </button>
                </div>
              </form>
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

export default SignUp;
