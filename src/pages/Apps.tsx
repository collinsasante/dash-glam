import Layout from '../components/Layout';
import { usePermissions } from '../hooks/usePermissions';

function Apps() {
  const { accessibleApps, userDepartment } = usePermissions();

  return (
    <Layout>
              {/* Page Header */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
                <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
                  My Applications
                </h1>
                <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
                  Applications available for {userDepartment} department
                </div>
              </div>

              {/* Applications Grid */}
              <div className="row g-6 g-xl-9">
                {accessibleApps.length > 0 ? (
                  accessibleApps.map((app) => (
                    <div key={app.id} className="col-md-6 col-xl-4">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card card-custom shadow-sm hover-elevate-up h-100 border-0 text-decoration-none"
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body text-center p-10">
                          <i className={`ki-duotone ${app.icon} fs-5x text-${app.color} mb-7`}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                          <h3 className="card-title fw-bold text-gray-900 mb-4">
                            {app.name}
                          </h3>
                          <p className="text-muted fs-6 mb-6">
                            {app.description}
                          </p>
                          <div className={`btn btn-sm btn-light-${app.color} fw-semibold`}>
                            Open Application →
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-warning d-flex align-items-center">
                      <i className="ki-duotone ki-information-5 fs-2x text-warning me-4">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                      <div className="d-flex flex-column">
                        <h4 className="mb-1 text-gray-900">No Applications Available</h4>
                        <span className="text-gray-700">
                          There are no applications assigned to your department. Please contact your administrator for access.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="card card-flush mt-10">
                <div className="card-header">
                  <h3 className="card-title fw-bold text-gray-900">Application Access</h3>
                </div>
                <div className="card-body pt-5">
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="ki-duotone ki-information-5 fs-2x text-info me-4">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-gray-900">Need Access?</h4>
                      <span className="text-gray-700">
                        If you need access to any application or encounter issues, please contact your system administrator or IT support.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
    </Layout>
  )
}

export default Apps
