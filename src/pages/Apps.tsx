import Layout from '../components/Layout'

function Apps() {
  const apps = [
    {
      name: 'HR System',
      description: 'Main dashboard for internal operations and management',
      url: 'https://dash.packglamour.com/packaging-glamour-signin',
      icon: 'profile-user',
      iconPaths: 4,
      color: 'primary',
      category: 'Internal'
    },
    {
      name: 'Delivery Management',
      description: 'Track and manage delivery operations and logistics',
      url: 'https://delivery.packglamour.com/',
      icon: 'delivery-3',
      iconPaths: 5,
      color: 'success',
      category: 'Operations'
    },
    {
      name: 'Order Tracking',
      description: 'Customer-facing portal for tracking order status',
      url: 'https://track.packglamour.com/',
      icon: 'package',
      iconPaths: 3,
      color: 'info',
      category: 'Customer'
    },
    {
      name: 'Design Submission',
      description: 'Customer portal for submitting product design specifications',
      url: 'https://design.packglamour.com/',
      icon: 'color-swatch',
      iconPaths: 2,
      color: 'warning',
      category: 'Customer'
    }
  ]

  return (
    <Layout>
              {/* Page Header */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
                <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
                  Company Applications
                </h1>
                <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
                  Access all internal and customer-facing applications
                </div>
              </div>

              {/* Applications Grid */}
              <div className="row g-6 g-xl-9">
                {apps.map((app, index) => (
                  <div key={index} className="col-md-6 col-xl-3">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      <div className="card card-custom shadow-sm hover-elevate-up h-100 border-0">
                        <div className="card-body text-center p-10">
                          <i className={`ki-duotone ki-${app.icon} fs-5x text-${app.color} mb-7`}>
                            {Array.from({ length: app.iconPaths }, (_, i) => (
                              <span key={i} className={`path${i + 1}`}></span>
                            ))}
                          </i>
                          <span className={`badge badge-light-${app.color} mb-5`}>{app.category}</span>
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
                      </div>
                    </a>
                  </div>
                ))}
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
