import Layout from '../components/Layout'

function Resources() {
  const resources = [
    {
      title: 'Employee Handbook',
      description: 'Company policies, procedures, and guidelines for all employees',
      type: 'PDF',
      size: '2.5 MB',
      updated: 'Jan 2025',
      category: 'Policy'
    },
    {
      title: 'Product Guidelines',
      description: 'Packaging specifications, standards, and quality requirements',
      type: 'PDF',
      size: '1.8 MB',
      updated: 'Dec 2024',
      category: 'Technical'
    },
    {
      title: 'Training Materials',
      description: 'Onboarding videos and skill development resources',
      type: 'Video',
      size: '45 min',
      updated: 'Nov 2024',
      category: 'Training'
    },
    {
      title: 'Safety Procedures',
      description: 'Workplace safety protocols and emergency procedures',
      type: 'PDF',
      size: '1.2 MB',
      updated: 'Jan 2025',
      category: 'Safety'
    },
    {
      title: 'Quality Control Guide',
      description: 'Step-by-step quality assurance and inspection procedures',
      type: 'PDF',
      size: '3.1 MB',
      updated: 'Dec 2024',
      category: 'Technical'
    },
    {
      title: 'Communication Standards',
      description: 'Email templates, communication protocols, and best practices',
      type: 'PDF',
      size: '950 KB',
      updated: 'Oct 2024',
      category: 'Policy'
    }
  ]

  return (
    <Layout>
              {/* Page Header */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
                <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
                  Employee Resources
                </h1>
                <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
                  Handbooks, guides, and training materials
                </div>
              </div>

              {/* Resources Grid */}
              <div className="row g-6 g-xl-9">
                {resources.map((resource, index) => (
                  <div key={index} className="col-md-6 col-xl-4">
                    <div className="card card-flush h-100 shadow-sm hover-elevate-up">
                      <div className="card-body p-9">
                        <div className="d-flex align-items-center mb-5">
                          <div className="symbol symbol-50px me-5">
                            <span className="symbol-label bg-light-primary">
                              <span className="fs-2">{resource.type === 'PDF' ? '📄' : '🎥'}</span>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <span className={`badge badge-light-${
                              resource.category === 'Safety' ? 'danger' :
                              resource.category === 'Technical' ? 'info' :
                              resource.category === 'Training' ? 'warning' : 'primary'
                            }`}>
                              {resource.category}
                            </span>
                          </div>
                        </div>

                        <h3 className="fw-bold text-gray-900 mb-3">{resource.title}</h3>
                        <p className="text-gray-600 fs-6 mb-5">{resource.description}</p>

                        <div className="d-flex justify-content-between align-items-center text-gray-500 fs-7 mb-5">
                          <span>📦 {resource.size}</span>
                          <span>📅 {resource.updated}</span>
                        </div>

                        <button className="btn btn-sm btn-light-primary w-100 fw-semibold">
                          Download / View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="row g-6 g-xl-9 mt-5">
                <div className="col-lg-6">
                  <div className="card card-flush h-100">
                    <div className="card-header">
                      <h3 className="card-title fw-bold text-gray-900">Quick Links</h3>
                    </div>
                    <div className="card-body pt-5">
                      <div className="d-flex flex-column gap-4">
                        <a href="#" className="d-flex align-items-center p-4 rounded bg-light hover-bg-light-primary">
                          <span className="fs-2 me-4">📚</span>
                          <div>
                            <div className="fw-bold text-gray-900">Knowledge Base</div>
                            <div className="text-muted fs-7">Search articles and FAQs</div>
                          </div>
                        </a>
                        <a href="#" className="d-flex align-items-center p-4 rounded bg-light hover-bg-light-primary">
                          <span className="fs-2 me-4">💬</span>
                          <div>
                            <div className="fw-bold text-gray-900">Support Center</div>
                            <div className="text-muted fs-7">Get help from IT team</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card card-flush h-100 bg-light-warning">
                    <div className="card-body p-9">
                      <div className="d-flex align-items-center">
                        <i className="ki-duotone ki-question-2 fs-3x text-warning me-5">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                        <div className="flex-grow-1">
                          <h3 className="fw-bold text-gray-900 mb-3">Need Something Else?</h3>
                          <p className="text-gray-700 mb-0">
                            Can't find what you're looking for? Contact HR or your department manager for additional resources and documentation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </Layout>
  )
}

export default Resources
