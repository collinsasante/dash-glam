import Layout from '../../components/Layout';

function EmployeeManagement() {
  return (
    <Layout>
      <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-10">
        <h1 className="page-heading d-flex text-gray-900 fw-bolder fs-2x flex-column justify-content-center my-0">
          Employee Management
        </h1>
        <div className="d-flex align-items-center text-gray-500 fw-semibold fs-5 mt-2">
          Manage employee records, attendance, and performance reviews
        </div>
      </div>

      <div className="row g-6 g-xl-9">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-10">
              <div className="text-center">
                <i className="ki-duotone ki-badge fs-5x text-primary mb-5">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                </i>
                <h3 className="text-gray-900 fw-bold mb-3">Employee Management</h3>
                <p className="text-muted fs-5">
                  Employee records and HR management features will be implemented here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeManagement;
