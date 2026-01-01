// Department-based permissions and app access configuration

export type Department =
  | 'Logistics'
  | 'Operations'
  | 'Customer Service'
  | 'Warehousing & Fulfilment'
  | 'Administration'
  | 'Management'
  | 'Finance'
  | 'Sales'
  | 'Marketing'
  | 'Production'
  | 'Engineering'
  | 'Creative Design'
  | 'Pakkmax';

export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  color: string;
  departments: Department[];
}

export const APP_MODULES: AppModule[] = [
  {
    id: 'glam-delivery-tracking',
    name: 'Glam Delivery Tracking',
    description: 'Track deliveries, rider status, shipment progress and delivery performance',
    icon: 'ki-delivery',
    url: 'https://glam-delivery-tracking.pages.dev/',
    color: 'info',
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment']
  },
  {
    id: 'packaging-glamour-dashboard',
    name: 'Packaging Glamour Dashboard',
    description: 'System access, business overview, analytics, and decision-making',
    icon: 'ki-chart-simple',
    url: 'https://dash.packglamour.com/packaging-glamour-signin',
    color: 'primary',
    departments: ['Administration', 'Management', 'Finance', 'Sales', 'Marketing']
  },
  {
    id: 'glam-manufacturing',
    name: 'Glam Manufacturing Platform',
    description: 'Manufacturing workflow, production status, and system processes',
    icon: 'ki-factory',
    url: 'https://glam-manufacturing.pages.dev/',
    color: 'success',
    departments: ['Production', 'Engineering', 'Operations', 'Management']
  },
  {
    id: 'gkam-internal',
    name: 'GKAM Internal System',
    description: 'Internal tools, staff management, and internal resources',
    icon: 'ki-setting-3',
    url: 'https://gkam-internal.pages.dev/',
    color: 'dark',
    departments: ['Administration', 'Management', 'Engineering', 'Creative Design', 'Pakkmax']
  }
];

export const MENU_ITEMS = {
  dashboard: {
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment', 'Administration', 'Management', 'Finance', 'Sales', 'Marketing', 'Production', 'Engineering', 'Creative Design', 'Pakkmax']
  },
  apps: {
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment', 'Administration', 'Management', 'Finance', 'Sales', 'Marketing', 'Production', 'Engineering', 'Creative Design', 'Pakkmax']
  },
  resources: {
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment', 'Administration', 'Management', 'Finance', 'Sales', 'Marketing', 'Production', 'Engineering', 'Creative Design', 'Pakkmax']
  },
  reports: {
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment', 'Administration', 'Management', 'Finance', 'Sales', 'Marketing', 'Production', 'Engineering', 'Creative Design', 'Pakkmax']
  },
  profile: {
    departments: ['Logistics', 'Operations', 'Customer Service', 'Warehousing & Fulfilment', 'Administration', 'Management', 'Finance', 'Sales', 'Marketing', 'Production', 'Engineering', 'Creative Design', 'Pakkmax']
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

  return false;
}
