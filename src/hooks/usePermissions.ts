import { useAuth } from '../contexts/AuthContext';
import { getAccessibleApps, hasAccess, canAccessRoute, type Department } from '../config/permissions';

export function usePermissions() {
  const { userData } = useAuth();
  const userDepartment = userData?.department as Department | undefined;

  return {
    userDepartment,
    accessibleApps: getAccessibleApps(userDepartment),
    hasAccess: (allowedDepartments: Department[]) => hasAccess(userDepartment, allowedDepartments),
    canAccessRoute: (route: string) => canAccessRoute(userDepartment, route)
  };
}
