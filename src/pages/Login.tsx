import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      // Handle Firebase errors
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later");
      } else {
        setError("Failed to sign in. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-root" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div className="d-flex flex-center w-100 p-5" style={{ minHeight: "100vh" }}>
        <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "20px", border: "none" }}>
          <div className="card-body p-10 p-lg-12">
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
                  Packaging Glamour
                </h1>
                <p className="text-gray-600 fw-semibold fs-5">
                  Sign in to your account
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

            {/* Login Form */}
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

              {/* Password Input */}
              <div className="mb-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label className="form-label text-gray-900 fw-bold fs-6 mb-0">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="link-primary fw-bold fs-7"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="position-relative">
                  <span className="position-absolute top-50 translate-middle-y ms-4">
                    <i className="ki-duotone ki-lock fs-2 text-gray-500">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </span>
                  <input
                    className="form-control form-control-lg ps-14 pe-14"
                    style={{ borderRadius: "12px", border: "2px solid #e4e6ef", height: "55px" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-3"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: "transparent", border: "none" }}
                  >
                    <i className={`ki-duotone ${showPassword ? 'ki-eye-slash' : 'ki-eye'} fs-2 text-gray-500`}>
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-8">
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
                      Signing in...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center">
                      <i className="ki-duotone ki-arrow-right fs-2 me-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Sign In
                    </span>
                  )}
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-gray-600 fw-semibold fs-6">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-primary fw-bold" style={{ textDecoration: "none" }}>
                    Create Account
                  </Link>
                </span>
              </div>
            </form>
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
  );
}

export default Login;
