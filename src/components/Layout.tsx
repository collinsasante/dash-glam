import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail") || "employee@packglamour.com";

  useEffect(() => {
    // Initialize KTComponents after component mounts
    if (typeof window !== 'undefined' && (window as any).KTComponents) {
      (window as any).KTComponents.init();
    }

    // Manual toggle handler as fallback
    const toggleButton = document.getElementById('kt_app_sidebar_toggle');
    if (toggleButton) {
      const handleToggle = () => {
        document.body.classList.toggle('app-sidebar-minimize');
      };
      toggleButton.addEventListener('click', handleToggle);

      return () => {
        toggleButton.removeEventListener('click', handleToggle);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        {/* Header */}
        <div
          id="kt_app_header"
          className="app-header"
          data-kt-sticky="true"
          data-kt-sticky-activate="{default: true, lg: true}"
          data-kt-sticky-name="app-header-minimize"
          data-kt-sticky-offset="{default: '200px', lg: '300px'}"
          data-kt-sticky-animation="false"
        >
          <div
            className="app-container container-fluid d-flex align-items-stretch flex-stack"
            id="kt_app_header_container"
          >
            {/* Mobile toggle */}
            <div className="d-flex align-items-center d-block d-lg-none ms-n3">
              <div
                className="btn btn-icon btn-color-gray-600 btn-active-color-primary w-35px h-35px me-1"
                id="kt_app_sidebar_mobile_toggle"
              >
                <span className="svg-icon svg-icon-2">☰</span>
              </div>
              <Link to="/dashboard">
                <h3 className="text-gray-900 mb-0">PG</h3>
              </Link>
            </div>

            {/* Toolbar wrapper */}
            <div
              className="app-navbar flex-lg-grow-1 justify-content-end"
              id="kt_app_header_navbar"
            >
              {/* User menu */}
              <div className="app-navbar-item ms-1 ms-lg-3">
                <div className="d-flex align-items-center">
                  <div className="d-none d-lg-block me-3">
                    <span className="text-gray-700 fw-semibold">
                      {userEmail.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-light"
                  >
                    <i className="ki-duotone ki-exit-right fs-3 me-1">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wrapper */}
        <div
          className="app-wrapper flex-column flex-row-fluid"
          id="kt_app_wrapper"
        >
          {/* Sidebar */}
          <div
            id="kt_app_sidebar"
            className="app-sidebar flex-column"
            data-kt-drawer="true"
            data-kt-drawer-name="app-sidebar"
            data-kt-drawer-activate="{default: true, lg: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="250px"
            data-kt-drawer-direction="start"
            data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
          >
            {/* Logo */}
            <div
              className="app-sidebar-logo position-relative"
              id="kt_app_sidebar_logo"
            >
              <Link to="/dashboard" className="d-flex align-items-center">
                <img
                  src="/src/assets/logo_red.png"
                  alt="Packaging Glamour"
                  style={{height: '40px', maxWidth: '180px', objectFit: 'contain'}}
                />
              </Link>

              {/* Sidebar toggle */}
              <button
                type="button"
                id="kt_app_sidebar_toggle"
                className="app-sidebar-toggle btn btn-icon btn-sm btn-color-gray-600 btn-active-color-primary border border-gray-300 h-30px w-30px position-absolute rounded-circle top-50 start-100 translate-middle rotate"
                data-kt-toggle="true"
                data-kt-toggle-state="active"
                data-kt-toggle-target="body"
                data-kt-toggle-name="app-sidebar-minimize"
              >
                <i className="ki-duotone ki-double-left fs-2 rotate-180">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </button>
            </div>

            {/* User */}
            <div
              className="app-sidebar-user-default app-sidebar-user-minimize bg-light border border-gray-300 rounded mx-9 mt-9 mt-lg-2"
              id="kt_app_sidebar_user"
            >
              <Link
                to="/profile"
                className="d-flex align-items-center w-200px p-4 text-decoration-none parent-hover"
              >
                <span className="cursor-pointer symbol symbol-circle symbol-40px me-4">
                  <span className="symbol-label bg-light-primary">
                    <i className="ki-duotone ki-profile-circle fs-2 text-primary">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                  </span>
                </span>
                <span className="d-flex flex-column">
                  <span className="text-gray-800 fs-7 fw-bold parent-hover-primary">
                    {userEmail.split("@")[0]}
                  </span>
                  <span className="text-gray-500 fs-8 fw-semibold">
                    Employee
                  </span>
                </span>
              </Link>
            </div>

            {/* Menu */}
            <div className="app-sidebar-menu overflow-hidden">
              <div
                id="kt_app_sidebar_menu_wrapper"
                className="app-sidebar-wrapper my-5"
              >
                <div
                  id="kt_app_sidebar_menu_scroll"
                  className="hover-scroll-overlay-y my-5 mx-4"
                  data-kt-scroll="true"
                  data-kt-scroll-activate="true"
                  data-kt-scroll-height="auto"
                  data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_user"
                  data-kt-scroll-offset="5px"
                >
                  <div
                    className="menu menu-column menu-rounded menu-sub-indention fw-semibold px-1"
                    id="#kt_app_sidebar_menu"
                    data-kt-menu="true"
                    data-kt-menu-expand="false"
                  >
                    {/* Menu heading */}
                    <div className="menu-item pt-5 ms-2">
                      <div className="menu-content">
                        <span className="menu-heading fw-bold text-uppercase fs-5">
                          Navigation
                        </span>
                      </div>
                    </div>

                    {/* Dashboard */}
                    <div className="menu-item">
                      <Link
                        to="/dashboard"
                        className={`menu-link ${isActive("/dashboard") ? "active" : ""}`}
                      >
                        <span className="menu-icon">
                          <i className="ki-duotone ki-element-11 fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                        </span>
                        <span className="menu-title">Dashboard</span>
                      </Link>
                    </div>

                    {/* Applications */}
                    <div className="menu-item">
                      <Link
                        to="/apps"
                        className={`menu-link ${isActive("/apps") ? "active" : ""}`}
                      >
                        <span className="menu-icon">
                          <i className="ki-duotone ki-rocket fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </span>
                        <span className="menu-title">Applications</span>
                      </Link>
                    </div>

                    {/* Resources */}
                    <div className="menu-item">
                      <Link
                        to="/resources"
                        className={`menu-link ${isActive("/resources") ? "active" : ""}`}
                      >
                        <span className="menu-icon">
                          <i className="ki-duotone ki-book fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                        </span>
                        <span className="menu-title">Resources</span>
                      </Link>
                    </div>

                    {/* Reports */}
                    <div className="menu-item">
                      <Link
                        to="/reports"
                        className={`menu-link ${isActive("/reports") ? "active" : ""}`}
                      >
                        <span className="menu-icon">
                          <i className="ki-duotone ki-document fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </span>
                        <span className="menu-title">Daily Reports</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
              <div
                id="kt_app_content"
                className="app-content flex-column-fluid"
              >
                <div
                  id="kt_app_content_container"
                  className="app-container container-fluid"
                >
                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div id="kt_app_footer" className="app-footer">
              <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                <div className="text-gray-900 order-2 order-md-1">
                  <span className="text-muted fw-semibold me-1">
                    {new Date().getFullYear()}©
                  </span>
                  <a
                    href="https://www.packglamour.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 text-hover-primary"
                  >
                    Packaging Glamour
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
