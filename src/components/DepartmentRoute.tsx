import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import type { Department } from '../config/permissions';

interface DepartmentRouteProps {
  children: ReactNode;
  allowedDepartments: Department[];
}

function DepartmentRoute({ children, allowedDepartments }: DepartmentRouteProps) {
  const { hasAccess } = usePermissions();

  if (!hasAccess(allowedDepartments)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default DepartmentRoute;
