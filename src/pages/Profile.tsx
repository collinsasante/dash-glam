import { useState } from "react";
import Layout from "../components/Layout";

function Profile() {
  const userEmail =
    localStorage.getItem("userEmail") || "employee@packglamour.com";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: userEmail,
    role: "Employee",
    department: "Operations",
  });

  const handleSave = () => {
    localStorage.setItem("userEmail", formData.email);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      email: userEmail,
      role: "Employee",
      department: "Operations",
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
        <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
          My Profile
        </h1>
        <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
          View and manage your profile settings
        </div>
      </div>

      <div className="row g-6 g-xl-9">
        {/* Profile Overview */}
        <div className="col-xl-4">
          <div className="card card-flush h-100">
            <div className="card-header">
              <h3 className="card-title fw-bold text-gray-900">
                Profile Overview
              </h3>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <div className="symbol symbol-circle symbol-100px mb-7">
                  <span className="symbol-label bg-light-primary">
                    <i className="ki-duotone ki-profile-circle fs-3x text-primary">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                    </i>
                  </span>
                </div>
                <h2 className="fw-bold text-gray-900 mb-2">
                  {userEmail.split("@")[0]}
                </h2>
                <span className="badge badge-light-primary mb-5">Employee</span>
                <p className="text-muted fs-6">
                  Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="col-xl-8">
          <div className="card card-flush h-100">
            <div className="card-header">
              <h3 className="card-title fw-bold text-gray-900">
                Account Information
              </h3>
              <div className="card-toolbar">
                {!isEditing ? (
                  <button
                    className="btn btn-sm btn-light-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="ki-duotone ki-pencil fs-3">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    Edit Profile
                  </button>
                ) : (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-light-danger"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">Email</label>
                <div className="col-lg-8">
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control form-control-solid"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    <span className="fw-bold fs-6 text-gray-900">
                      {formData.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">Role</label>
                <div className="col-lg-8">
                  {isEditing ? (
                    <select
                      className="form-select form-select-solid"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  ) : (
                    <span className="fw-bold fs-6 text-gray-900">
                      {formData.role}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  Department
                </label>
                <div className="col-lg-8">
                  {isEditing ? (
                    <select
                      className="form-select form-select-solid"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                    >
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                    </select>
                  ) : (
                    <span className="fw-bold fs-6 text-gray-900">
                      {formData.department}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  Status
                </label>
                <div className="col-lg-8">
                  <span className="badge badge-light-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
