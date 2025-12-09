import Layout from '../components/Layout'

function Dashboard() {
  const userEmail = localStorage.getItem('userEmail') || 'Employee'

  return (
    <Layout>
              {/* Page Header */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
                <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
                  Dashboard Overview
                </h1>
                <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
                  Welcome back, {userEmail.split('@')[0]} • {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="row g-6 g-xl-9 mb-10">
                <div className="col-md-6 col-xl-3">
                  <div className="card border border-gray-300 h-100">
                    <div className="card-body p-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-50px me-3">
                          <span className="symbol-label bg-light-primary">
                            <i className="ki-duotone ki-chart-line-up-2 fs-2x text-primary">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <span className="text-gray-500 fw-semibold d-block fs-7">Total Orders</span>
                          <span className="text-gray-900 fw-bold fs-2">1,247</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge badge-light-success fs-8">
                          <i className="ki-duotone ki-arrow-up fs-7 text-success">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          12.5%
                        </span>
                        <span className="text-gray-500 fs-8 ms-2">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card border border-gray-300 h-100">
                    <div className="card-body p-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-50px me-3">
                          <span className="symbol-label bg-light-success">
                            <i className="ki-duotone ki-delivery-3 fs-2x text-success">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                              <span className="path5"></span>
                            </i>
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <span className="text-gray-500 fw-semibold d-block fs-7">In Production</span>
                          <span className="text-gray-900 fw-bold fs-2">342</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge badge-light-success fs-8">
                          <i className="ki-duotone ki-arrow-up fs-7 text-success">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          8.2%
                        </span>
                        <span className="text-gray-500 fs-8 ms-2">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card border border-gray-300 h-100">
                    <div className="card-body p-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-50px me-3">
                          <span className="symbol-label bg-light-info">
                            <i className="ki-duotone ki-package fs-2x text-info">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </i>
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <span className="text-gray-500 fw-semibold d-block fs-7">Completed</span>
                          <span className="text-gray-900 fw-bold fs-2">905</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge badge-light-success fs-8">
                          <i className="ki-duotone ki-arrow-up fs-7 text-success">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          15.3%
                        </span>
                        <span className="text-gray-500 fs-8 ms-2">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card border border-gray-300 h-100">
                    <div className="card-body p-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-50px me-3">
                          <span className="symbol-label bg-light-warning">
                            <i className="ki-duotone ki-profile-user fs-2x text-warning">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                            </i>
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <span className="text-gray-500 fw-semibold d-block fs-7">Active Clients</span>
                          <span className="text-gray-900 fw-bold fs-2">87</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge badge-light-success fs-8">
                          <i className="ki-duotone ki-arrow-up fs-7 text-success">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          6.1%
                        </span>
                        <span className="text-gray-500 fs-8 ms-2">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-6 g-xl-9 mb-10">
                {/* Recent Activity */}
                <div className="col-xl-8">
                  <div className="card h-100">
                    <div className="card-header border-0">
                      <h3 className="card-title fw-bold text-gray-900">Recent Activity</h3>
                      <div className="card-toolbar">
                        <button className="btn btn-sm btn-light">View All</button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="timeline">
                        <div className="timeline-item mb-6">
                          <div className="timeline-line w-40px"></div>
                          <div className="timeline-icon symbol symbol-circle symbol-40px">
                            <div className="symbol-label bg-light-success">
                              <i className="ki-duotone ki-check fs-2 text-success">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </div>
                          </div>
                          <div className="timeline-content mb-10 mt-n1">
                            <div className="pe-3 mb-2">
                              <div className="fs-6 fw-bold text-gray-900 mb-1">Order #PG-2847 completed</div>
                              <div className="text-gray-500 fw-semibold fs-7">Custom packaging for luxury cosmetics</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="badge badge-light-success">Completed</span>
                              <span className="text-gray-500 fs-8 ms-3">2 hours ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="timeline-item mb-6">
                          <div className="timeline-line w-40px"></div>
                          <div className="timeline-icon symbol symbol-circle symbol-40px">
                            <div className="symbol-label bg-light-primary">
                              <i className="ki-duotone ki-abstract-26 fs-2 text-primary">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </div>
                          </div>
                          <div className="timeline-content mb-10 mt-n1">
                            <div className="pe-3 mb-2">
                              <div className="fs-6 fw-bold text-gray-900 mb-1">New design submission received</div>
                              <div className="text-gray-500 fw-semibold fs-7">Premium bottle packaging design</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="badge badge-light-primary">New</span>
                              <span className="text-gray-500 fs-8 ms-3">5 hours ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="timeline-item mb-6">
                          <div className="timeline-line w-40px"></div>
                          <div className="timeline-icon symbol symbol-circle symbol-40px">
                            <div className="symbol-label bg-light-info">
                              <i className="ki-duotone ki-delivery-time fs-2 text-info">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </div>
                          </div>
                          <div className="timeline-content mb-10 mt-n1">
                            <div className="pe-3 mb-2">
                              <div className="fs-6 fw-bold text-gray-900 mb-1">Shipment dispatched</div>
                              <div className="text-gray-500 fw-semibold fs-7">Order #PG-2841 on route to customer</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <span className="badge badge-light-info">In Transit</span>
                              <span className="text-gray-500 fs-8 ms-3">Yesterday</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="col-xl-4">
                  <div className="card h-100">
                    <div className="card-header border-0">
                      <h3 className="card-title fw-bold text-gray-900">Quick Access</h3>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-3">
                        <a href="/apps" className="btn btn-flex btn-light-primary w-100 text-start">
                          <i className="ki-duotone ki-rocket fs-2 me-3">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div className="flex-grow-1">
                            <span className="fw-bold d-block">Applications</span>
                            <span className="text-muted fs-8">Access all apps</span>
                          </div>
                        </a>

                        <a href="/reports" className="btn btn-flex btn-light-info w-100 text-start">
                          <i className="ki-duotone ki-document fs-2 me-3">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div className="flex-grow-1">
                            <span className="fw-bold d-block">Daily Reports</span>
                            <span className="text-muted fs-8">Submit reports</span>
                          </div>
                        </a>

                        <a href="/resources" className="btn btn-flex btn-light-success w-100 text-start">
                          <i className="ki-duotone ki-book fs-2 me-3">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                          <div className="flex-grow-1">
                            <span className="fw-bold d-block">Resources</span>
                            <span className="text-muted fs-8">Browse documents</span>
                          </div>
                        </a>

                        <div className="separator my-3"></div>

                        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-4">
                          <i className="ki-duotone ki-shield-tick fs-2tx text-primary me-3">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          <div className="d-flex flex-column">
                            <h5 className="text-gray-900 fw-bold mb-1">All Systems Operational</h5>
                            <span className="text-gray-700 fs-7">Last checked: {new Date().toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Overview */}
              <div className="row g-6 g-xl-9">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header border-0">
                      <h3 className="card-title fw-bold text-gray-900">Production Overview</h3>
                      <div className="card-toolbar">
                        <select className="form-select form-select-sm form-select-solid w-150px">
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last 90 days</option>
                        </select>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* Chart Placeholder with Visual Bars */}
                      <div className="d-flex justify-content-between align-items-end h-300px border-bottom border-gray-300 pb-3 mb-8">
                        {/* Bar Chart Visualization */}
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-primary rounded-top" style={{width: '60px', height: '85%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Mon</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-primary rounded-top" style={{width: '60px', height: '72%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Tue</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-primary rounded-top" style={{width: '60px', height: '95%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Wed</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-primary rounded-top" style={{width: '60px', height: '78%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Thu</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-primary rounded-top" style={{width: '60px', height: '88%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Fri</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-light-primary rounded-top border border-primary border-dashed" style={{width: '60px', height: '45%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Sat</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center flex-fill mx-2">
                          <div className="d-flex align-items-end justify-content-center w-100" style={{height: '240px'}}>
                            <div className="d-flex flex-column align-items-center justify-content-end h-100">
                              <div className="bg-light-primary rounded-top border border-primary border-dashed" style={{width: '60px', height: '35%'}}></div>
                              <span className="text-gray-700 fw-bold fs-7 mt-2">Sun</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center me-6 mb-3">
                          <div className="symbol symbol-30px me-3">
                            <span className="symbol-label bg-light-primary">
                              <i className="ki-duotone ki-chart-simple fs-2 text-primary">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                              </i>
                            </span>
                          </div>
                          <div>
                            <div className="fs-7 text-gray-600 fw-semibold">Daily Production</div>
                            <div className="fs-5 fw-bold text-gray-900">Average: 342 units/day</div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center me-6 mb-3">
                          <div className="symbol symbol-30px me-3">
                            <span className="symbol-label bg-light-success">
                              <i className="ki-duotone ki-arrow-up fs-2 text-success">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                          </div>
                          <div>
                            <div className="fs-7 text-gray-600 fw-semibold">Weekly Growth</div>
                            <div className="fs-5 fw-bold text-success">+12.5%</div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                          <div className="symbol symbol-30px me-3">
                            <span className="symbol-label bg-light-info">
                              <i className="ki-duotone ki-chart-line-up fs-2 text-info">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                          </div>
                          <div>
                            <div className="fs-7 text-gray-600 fw-semibold">Peak Day</div>
                            <div className="fs-5 fw-bold text-gray-900">Wednesday - 428 units</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </Layout>
  )
}

export default Dashboard
