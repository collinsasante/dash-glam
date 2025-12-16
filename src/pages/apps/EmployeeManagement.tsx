import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { airtableService, type AirtableRecord } from '../../services/airtable';

function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState<'employees' | 'attendance' | 'leaves'>('employees');
  const [employees, setEmployees] = useState<AirtableRecord[]>([]);
  const [attendance, setAttendance] = useState<AirtableRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'employees') {
        const data = await airtableService.getEmployees();
        setEmployees(data);
      } else if (activeTab === 'attendance') {
        const data = await airtableService.getAttendance();
        setAttendance(data);
      } else if (activeTab === 'leaves') {
        const data = await airtableService.getLeaveRequests();
        setLeaveRequests(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data. Please configure Airtable.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLeave = async (recordId: string) => {
    try {
      await airtableService.updateLeaveRequest(recordId, { Status: 'Approved' });
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to approve leave request');
    }
  };

  const handleRejectLeave = async (recordId: string) => {
    try {
      await airtableService.updateLeaveRequest(recordId, { Status: 'Rejected' });
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to reject leave request');
    }
  };

  return (
    <Layout>
      <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
        <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
          Employee Management
        </h1>
        <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
          Manage employee records, attendance tracking, and leave requests
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="card-header border-0 pt-6">
          <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x border-transparent fs-4 fw-semibold">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
                onClick={() => setActiveTab('employees')}
              >
                <i className="ki-duotone ki-user fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Employees
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                onClick={() => setActiveTab('attendance')}
              >
                <i className="ki-duotone ki-calendar fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Attendance
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
                onClick={() => setActiveTab('leaves')}
              >
                <i className="ki-duotone ki-time fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Leave Requests
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-6">
          <i className="ki-duotone ki-information-5 fs-2x text-danger me-4">
            <span className="path1"></span>
            <span className="path2"></span>
            <span className="path3"></span>
          </i>
          <div className="d-flex flex-column">
            <h4 className="mb-1 text-gray-900">Error</h4>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="row g-6 g-xl-9">
          {loading ? (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-10">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          ) : employees.length === 0 ? (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-10">
                  <i className="ki-duotone ki-information-5 fs-5x text-muted mb-5">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                  </i>
                  <h3 className="text-gray-900 fw-bold mb-3">No Employees Found</h3>
                  <p className="text-muted fs-5">
                    Set up your Airtable base to start managing employees.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            employees.map((employee) => (
              <div key={employee.id} className="col-md-6 col-xl-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-center flex-column p-9">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <div className="symbol-label bg-light-primary">
                        <span className="text-primary fs-1 fw-bold">
                          {employee.fields['Full Name']?.toString().charAt(0) || 'E'}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-gray-800 text-hover-primary fw-bold mb-0">
                      {employee.fields['Full Name']}
                    </h4>
                    <div className="fw-semibold text-gray-500 mb-6">{employee.fields['Position'] || 'Employee'}</div>
                    <div className="d-flex flex-wrap flex-center mb-5">
                      <div className="border border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">{employee.fields['Department']}</div>
                        <div className="fw-semibold text-gray-500">Department</div>
                      </div>
                      <div className="border border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
                        <div className={`fs-6 fw-bold ${
                          employee.fields['Status'] === 'Active' ? 'text-success' :
                          employee.fields['Status'] === 'On Leave' ? 'text-warning' : 'text-danger'
                        }`}>
                          {employee.fields['Status']}
                        </div>
                        <div className="fw-semibold text-gray-500">Status</div>
                      </div>
                    </div>
                    <div className="text-gray-600 text-center mb-5">
                      <i className="ki-duotone ki-sms fs-3 text-primary me-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      {employee.fields['Email']}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="card">
          <div className="card-header border-0 pt-6">
            <h3 className="card-title">
              <span className="card-label fw-bold fs-3 mb-1">Attendance Records</span>
            </h3>
            <div className="card-toolbar">
              <button className="btn btn-sm btn-primary">
                <i className="ki-duotone ki-plus fs-2"></i>
                Mark Attendance
              </button>
            </div>
          </div>
          <div className="card-body py-4">
            {loading ? (
              <div className="text-center py-10">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : attendance.length === 0 ? (
              <div className="text-center py-10">
                <i className="ki-duotone ki-calendar fs-5x text-muted mb-5">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <h3 className="text-gray-900 fw-bold mb-3">No Attendance Records</h3>
                <p className="text-muted fs-5">Start tracking employee attendance here.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                      <th className="min-w-125px">Date</th>
                      <th className="min-w-125px">Employee</th>
                      <th className="min-w-100px">Clock In</th>
                      <th className="min-w-100px">Clock Out</th>
                      <th className="min-w-100px">Status</th>
                      <th className="min-w-100px">Hours</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                    {attendance.map((record) => (
                      <tr key={record.id}>
                        <td>{record.fields['Date']}</td>
                        <td>{record.fields['Employee']}</td>
                        <td>{record.fields['Clock In']}</td>
                        <td>{record.fields['Clock Out'] || '-'}</td>
                        <td>
                          <span className={`badge badge-light-${
                            record.fields['Status'] === 'Present' ? 'success' :
                            record.fields['Status'] === 'Late' ? 'warning' : 'danger'
                          }`}>
                            {record.fields['Status']}
                          </span>
                        </td>
                        <td>{record.fields['Hours Worked'] || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === 'leaves' && (
        <div className="card">
          <div className="card-header border-0 pt-6">
            <h3 className="card-title">
              <span className="card-label fw-bold fs-3 mb-1">Leave Requests</span>
            </h3>
          </div>
          <div className="card-body py-4">
            {loading ? (
              <div className="text-center py-10">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : leaveRequests.length === 0 ? (
              <div className="text-center py-10">
                <i className="ki-duotone ki-time fs-5x text-muted mb-5">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <h3 className="text-gray-900 fw-bold mb-3">No Leave Requests</h3>
                <p className="text-muted fs-5">Leave requests will appear here.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                      <th className="min-w-125px">Employee</th>
                      <th className="min-w-100px">Leave Type</th>
                      <th className="min-w-100px">Start Date</th>
                      <th className="min-w-100px">End Date</th>
                      <th className="min-w-80px">Days</th>
                      <th className="min-w-100px">Status</th>
                      <th className="text-end min-w-100px">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                    {leaveRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.fields['Employee']}</td>
                        <td>{request.fields['Leave Type']}</td>
                        <td>{request.fields['Start Date']}</td>
                        <td>{request.fields['End Date']}</td>
                        <td>{request.fields['Days Requested']}</td>
                        <td>
                          <span className={`badge badge-light-${
                            request.fields['Status'] === 'Approved' ? 'success' :
                            request.fields['Status'] === 'Rejected' ? 'danger' : 'warning'
                          }`}>
                            {request.fields['Status']}
                          </span>
                        </td>
                        <td className="text-end">
                          {request.fields['Status'] === 'Pending' && (
                            <>
                              <button
                                className="btn btn-sm btn-icon btn-light-success me-2"
                                onClick={() => handleApproveLeave(request.id)}
                              >
                                <i className="ki-duotone ki-check fs-5">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </button>
                              <button
                                className="btn btn-sm btn-icon btn-light-danger"
                                onClick={() => handleRejectLeave(request.id)}
                              >
                                <i className="ki-duotone ki-cross fs-5">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default EmployeeManagement;
