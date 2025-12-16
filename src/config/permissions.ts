// Department-based permissions and app access configuration

export type Department =
  | 'Production'
  | 'Warehouse'
  | 'Logistics'
  | 'Sales'
  | 'Finance'
  | 'HR'
  | 'IT'
  | 'Management';

export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  departments: Department[];
}

export const APP_MODULES: AppModule[] = [
  {
    id: 'production-dashboard',
    name: 'Production Dashboard',
    description: 'Monitor production processes, quality control, and output metrics',
    icon: 'ki-chart-line',
    route: '/apps/production',
    color: 'primary',
    departments: ['Production', 'Management']
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management',
    description: 'Track stock levels, manage inventory, and monitor warehouse operations',
    icon: 'ki-package',
    route: '/apps/inventory',
    color: 'success',
    departments: ['Warehouse', 'Management']
  },
  {
    id: 'delivery-tracker',
    name: 'Delivery Tracker',
    description: 'Track deliveries, manage routes, and coordinate logistics',
    icon: 'ki-delivery',
    route: '/apps/delivery',
    color: 'info',
    departments: ['Logistics', 'Management']
  },
  {
    id: 'label-calculator',
    name: 'Label Price Calculator',
    description: 'Calculate label pricing based on materials, dimensions, and quantity',
    icon: 'ki-calculator',
    route: '/apps/label-calculator',
    color: 'warning',
    departments: ['Sales', 'Production', 'Management']
  },
  {
    id: 'crm',
    name: 'Customer Relations',
    description: 'Manage customer relationships, track leads, and monitor sales pipeline',
    icon: 'ki-people',
    route: '/apps/crm',
    color: 'danger',
    departments: ['Sales', 'Management']
  },
  {
    id: 'accounting',
    name: 'Accounting & Payroll',
    description: 'Manage financial records, process payroll, and generate reports',
    icon: 'ki-dollar',
    route: '/apps/accounting',
    color: 'success',
    departments: ['Finance', 'Management']
  },
  {
    id: 'employee-management',
    name: 'Employee Management',
    description: 'Manage employee records, attendance, and performance reviews',
    icon: 'ki-badge',
    route: '/apps/employees',
    color: 'primary',
    departments: ['HR', 'Management']
  },
  {
    id: 'system-admin',
    name: 'System Administration',
    description: 'Manage users, system settings, and technical configurations',
    icon: 'ki-setting-3',
    route: '/apps/admin',
    color: 'dark',
    departments: ['IT', 'Management']
  },
  {
    id: 'reports-analytics',
    name: 'Reports & Analytics',
    description: 'Generate comprehensive reports and analyze business metrics',
    icon: 'ki-chart-simple',
    route: '/apps/analytics',
    color: 'info',
    departments: ['Management', 'Finance', 'Sales']
  }
];

export const MENU_ITEMS = {
  dashboard: {
    departments: ['Production', 'Warehouse', 'Logistics', 'Sales', 'Finance', 'HR', 'IT', 'Management']
  },
  apps: {
    departments: ['Production', 'Warehouse', 'Logistics', 'Sales', 'Finance', 'HR', 'IT', 'Management']
  },
  resources: {
    departments: ['Production', 'Warehouse', 'Logistics', 'Sales', 'Finance', 'HR', 'IT', 'Management']
  },
  reports: {
    departments: ['Production', 'Warehouse', 'Logistics', 'Sales', 'Finance', 'HR', 'IT', 'Management']
  },
  profile: {
    departments: ['Production', 'Warehouse', 'Logistics', 'Sales', 'Finance', 'HR', 'IT', 'Management']
  }
};

export function hasAccess(userDepartment: Department | undefined, allowedDepartments: Department[]): boolean {
  if (!userDepartment) return false;
  return allowedDepartments.includes(userDepartment);
}

export function getAccessibleApps(userDepartment: Department | undefined): AppModule[] {
  if (!userDepartment) return [];
  return APP_MODULES.filter(app => hasAccess(userDepartment, app.departments));
}

export function canAccessRoute(userDepartment: Department | undefined, route: string): boolean {
  if (!userDepartment) return false;

  // Allow access to base routes
  if (['/dashboard', '/apps', '/resources', '/reports', '/profile'].includes(route)) {
    return true;
  }

  // Check app-specific routes
  const app = APP_MODULES.find(a => route.startsWith(a.route));
  if (app) {
    return hasAccess(userDepartment, app.departments);
  }

  return false;
}
