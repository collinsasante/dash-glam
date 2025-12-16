import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { airtableService, type AirtableRecord } from '../../services/airtable';
import { useAuth } from '../../contexts/AuthContext';

function SystemAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'logs'>('users');
  const [employees, setEmployees] = useState<AirtableRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'users') {
        const data = await airtableService.getEmployees();
        setEmployees(data);
      } else if (activeTab === 'logs') {
        const logs = await airtableService.getAuditLogs();
        setAuditLogs(logs);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data. Please check Airtable configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmployeeStatus = async (recordId: string, newStatus: string) => {
    try {
      await airtableService.updateEmployee(recordId, { Status: newStatus });

      // Log the action
      await airtableService.createAuditLog({
        User: [currentUser?.uid],
        Action: 'Update',
        Module: 'Employee Management',
        'Record ID': recordId,
        Details: `Updated employee status to ${newStatus}`,
      });

      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to update employee status');
    }
  };

  return (
    <Layout>
      <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
        <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
          System Administration
        </h1>
        <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
          Manage users, permissions, and monitor system activity
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="card-header border-0 pt-6">
          <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x border-transparent fs-4 fw-semibold">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <i className="ki-duotone ki-user fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                User Management
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'permissions' ? 'active' : ''}`}
                onClick={() => setActiveTab('permissions')}
              >
                <i className="ki-duotone ki-shield-tick fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Permissions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => setActiveTab('logs')}
              >
                <i className="ki-duotone ki-document fs-2 me-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                Audit Logs
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

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="card-header border-0 pt-6">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Employee Accounts</span>
              <span className="text-muted mt-1 fw-semibold fs-7">{employees.length} total employees</span>
            </h3>
            <div className="card-toolbar">
              <button className="btn btn-sm btn-primary">
                <i className="ki-duotone ki-plus fs-2"></i>
                Add Employee
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
            ) : employees.length === 0 ? (
              <div className="text-center py-10">
                <i className="ki-duotone ki-information-5 fs-5x text-muted mb-5">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                </i>
                <h3 className="text-gray-900 fw-bold mb-3">No Employees Found</h3>
                <p className="text-muted fs-5">
                  Configure your Airtable base or add employees to get started.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                      <th className="min-w-125px">Employee</th>
                      <th className="min-w-125px">Email</th>
                      <th className="min-w-100px">Department</th>
                      <th className="min-w-100px">Position</th>
                      <th className="min-w-100px">Status</th>
                      <th className="text-end min-w-100px">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                              <div className="symbol-label bg-light-primary">
                                <span className="text-primary fw-bold">
                                  {employee.fields['Full Name']?.toString().charAt(0) || 'E'}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex flex-column">
                              <span className="text-gray-800 fw-bold">{employee.fields['Full Name']}</span>
                              <span className="text-muted fs-7">ID: {employee.fields['Employee ID']}</span>
                            </div>
                          </div>
                        </td>
                        <td>{employee.fields['Email']}</td>
                        <td>
                          <span className="badge badge-light-primary">{employee.fields['Department']}</span>
                        </td>
                        <td>{employee.fields['Position'] || '-'}</td>
                        <td>
                          <span className={`badge badge-light-${
                            employee.fields['Status'] === 'Active' ? 'success' :
                            employee.fields['Status'] === 'On Leave' ? 'warning' : 'danger'
                          }`}>
                            {employee.fields['Status']}
                          </span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-icon btn-light btn-active-light-primary me-2">
                            <i className="ki-duotone ki-pencil fs-5">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </button>
                          <button className="btn btn-sm btn-icon btn-light btn-active-light-primary">
                            <i className="ki-duotone ki-trash fs-5">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                              <span className="path5"></span>
                            </i>
                          </button>
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

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="card">
          <div className="card-body p-10">
            <div className="text-center">
              <i className="ki-duotone ki-shield-tick fs-5x text-primary mb-5">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              <h3 className="text-gray-900 fw-bold mb-3">Permission Management</h3>
              <p className="text-muted fs-5">
                Configure fine-grained access control and user permissions here.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'logs' && (
        <div className="card">
          <div className="card-header border-0 pt-6">
            <h3 className="card-title">
              <span className="card-label fw-bold fs-3 mb-1">System Audit Logs</span>
            </h3>
          </div>
          <div className="card-body py-4">
            {loading ? (
              <div className="text-center py-10">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="text-center py-10">
                <i className="ki-duotone ki-information-5 fs-5x text-muted mb-5">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                </i>
                <h3 className="text-gray-900 fw-bold mb-3">No Audit Logs</h3>
                <p className="text-muted fs-5">
                  System activity logs will appear here once configured.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                      <th className="min-w-150px">Timestamp</th>
                      <th className="min-w-125px">User</th>
                      <th className="min-w-100px">Action</th>
                      <th className="min-w-100px">Module</th>
                      <th className="min-w-200px">Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{new Date(log.createdTime).toLocaleString()}</td>
                        <td>{log.fields['User'] || 'System'}</td>
                        <td>
                          <span className="badge badge-light-info">{log.fields['Action']}</span>
                        </td>
                        <td>{log.fields['Module']}</td>
                        <td>{log.fields['Details']}</td>
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

export default SystemAdmin;
