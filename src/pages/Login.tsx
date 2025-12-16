import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    <div
      className="d-flex flex-column flex-root"
      id="kt_app_root"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="d-flex flex-column flex-lg-row flex-column-fluid"
        style={{ minHeight: "100vh" }}
      >
        {/* Aside */}
        <div
          className="d-flex flex-column flex-lg-row-auto w-xl-600px positon-xl-relative"
          style={{ backgroundColor: "#dc3545" }}
        >
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
                    e.currentTarget.style.display = "none";
                  }}
                />
              </a>

              {/* Title */}
              <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                Welcome to Packaging Glamour
              </h1>

              {/* Description */}
              <p className="d-none d-lg-block fw-semibold fs-2 text-white">
                Plan your projects by managing orders, tracking
                <br />
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
                  <h1 className="text-gray-900 mb-3">Sign In</h1>
                  <div className="text-gray-500 fw-semibold fs-4">
                    New Here?{" "}
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
                  <label className="form-label fs-6 fw-bold text-gray-900">
                    Email
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label fw-bold text-gray-900 fs-6 mb-0">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="link-primary fs-6 fw-bold"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
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
                      <span className="indicator-label">Continue</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            <div className="d-flex flex-center fw-semibold fs-6">
              <a
                href="https://www.packglamour.com/"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <a
                href="https://www.packglamour.com/"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support
              </a>
              <a
                href="https://www.packglamour.com/"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
