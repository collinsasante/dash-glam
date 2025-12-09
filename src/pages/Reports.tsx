import { useState } from 'react'
import Layout from '../components/Layout'

interface DailyReport {
  id: string
  date: string
  content: string
  employee: string
}

function Reports() {
  const [reportContent, setReportContent] = useState('')
  const [reports, setReports] = useState<DailyReport[]>([])
  const userEmail = localStorage.getItem('userEmail') || 'Employee'

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (reportContent.trim()) {
      const newReport: DailyReport = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        content: reportContent,
        employee: userEmail.split('@')[0]
      }
      setReports([newReport, ...reports])
      setReportContent('')
    }
  }

  return (
    <Layout>
              {/* Page Header */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
                <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
                  Daily Reports
                </h1>
                <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
                  Submit and view daily activity reports
                </div>
              </div>

              <div className="row g-6 g-xl-9">
                {/* Submit Report Form */}
                <div className="col-lg-5">
                  <div className="card card-flush shadow-sm sticky-top">
                    <div className="card-header">
                      <h3 className="card-title fw-bold text-gray-900">Submit Today's Report</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmitReport}>
                        <div className="mb-6">
                          <label className="form-label fw-semibold text-gray-700">Employee</label>
                          <input
                            type="text"
                            className="form-control form-control-solid"
                            value={userEmail.split('@')[0]}
                            disabled
                          />
                        </div>

                        <div className="mb-6">
                          <label className="form-label fw-semibold text-gray-700">Date</label>
                          <input
                            type="text"
                            className="form-control form-control-solid"
                            value={new Date().toLocaleDateString()}
                            disabled
                          />
                        </div>

                        <div className="mb-6">
                          <label className="form-label fw-semibold text-gray-700 required">
                            Report Details
                          </label>
                          <textarea
                            className="form-control form-control-solid"
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            placeholder="What did you accomplish today? Include any challenges, milestones, or important updates..."
                            rows={8}
                            required
                          />
                          <div className="form-text text-muted">
                            Be specific about tasks completed and time spent
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary w-100 btn-lg fw-semibold"
                        >
                          Submit Report
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Reports List */}
                <div className="col-lg-7">
                  <div className="card card-flush shadow-sm">
                    <div className="card-header">
                      <h3 className="card-title fw-bold text-gray-900">Recent Reports</h3>
                      <div className="card-toolbar">
                        <span className="badge badge-light-primary">{reports.length} Reports</span>
                      </div>
                    </div>
                    <div className="card-body">
                      {reports.length === 0 ? (
                        <div className="text-center py-15">
                          <i className="ki-duotone ki-document fs-5x text-gray-400 mb-7">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <h3 className="text-gray-900 fw-bold mb-3">No Reports Yet</h3>
                          <p className="text-muted fs-5 mb-0">
                            Submit your first daily report to get started!
                          </p>
                        </div>
                      ) : (
                        <div className="timeline">
                          {reports.map((report) => (
                            <div key={report.id} className="timeline-item mb-8">
                              <div className="timeline-line w-40px"></div>
                              <div className="timeline-icon symbol symbol-circle symbol-40px">
                                <div className="symbol-label bg-light-success">
                                  <span className="fs-5">✓</span>
                                </div>
                              </div>
                              <div className="timeline-content mb-10 mt-n1">
                                <div className="card card-bordered">
                                  <div className="card-body p-6">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                      <div>
                                        <h4 className="fw-bold text-gray-900 mb-1">{report.employee}</h4>
                                        <div className="text-muted fs-7">
                                          <span className="badge badge-light-primary me-2">Report</span>
                                          {report.date}
                                        </div>
                                      </div>
                                      <span className="badge badge-success">Submitted</span>
                                    </div>
                                    <p className="text-gray-700 fs-6 mb-0">{report.content}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="card card-flush mt-10 bg-light-info">
                <div className="card-body p-9">
                  <div className="d-flex align-items-center">
                    <i className="ki-duotone ki-information-5 fs-3x text-info me-5">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                    <div className="flex-grow-1">
                      <h3 className="fw-bold text-gray-900 mb-3">Daily Report Guidelines</h3>
                      <ul className="text-gray-700 fs-6 mb-0">
                        <li>Submit your report at the end of each workday</li>
                        <li>Include all major tasks and accomplishments</li>
                        <li>Note any blockers or issues that need attention</li>
                        <li>Keep it concise but informative</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
    </Layout>
  )
}

export default Reports
