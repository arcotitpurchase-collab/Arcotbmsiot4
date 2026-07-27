export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
};

export const ADMIN_PERMISSIONS = {
  USER_CREATE: "USER_CREATE",
  USER_VIEW: "USER_VIEW",
  USER_EDIT: "USER_EDIT",
  USER_ENABLE_DISABLE: "USER_ENABLE_DISABLE",
  USER_DELETE: "USER_DELETE",
  USER_PASSWORD_RESET: "USER_PASSWORD_RESET",
  DASHBOARD_VIEW: "DASHBOARD_VIEW",
  LIVE_MONITORING_VIEW: "LIVE_MONITORING_VIEW",
  ANALYTICS_VIEW: "ANALYTICS_VIEW",
  CONSUMPTION_VIEW: "CONSUMPTION_VIEW",
  CHARGES_VIEW: "CHARGES_VIEW",
  DATA_DOWNLOAD: "DATA_DOWNLOAD",
  ALERTS_VIEW: "ALERTS_VIEW",
  DEVICE_CONTROL: "DEVICE_CONTROL",
};

export const USER_PERMISSIONS = {
  LOGIN: "LOGIN",
  DASHBOARD_VIEW: "DASHBOARD_VIEW",
  LIVE_MONITORING_VIEW: "LIVE_MONITORING_VIEW",
  ANALYTICS_VIEW: "ANALYTICS_VIEW",
  CONSUMPTION_VIEW: "CONSUMPTION_VIEW",
  CHARGES_VIEW: "CHARGES_VIEW",
  DATA_DOWNLOAD: "DATA_DOWNLOAD",
  ALERTS_VIEW: "ALERTS_VIEW",
  DEVICE_CONTROL: "DEVICE_CONTROL",
};

export const ADMIN_PERMISSION_OPTIONS = [
  {
    id: ADMIN_PERMISSIONS.USER_CREATE,
    label: "Create Users",
  },
  { id: ADMIN_PERMISSIONS.USER_VIEW, label: "View Users" },
  { id: ADMIN_PERMISSIONS.USER_EDIT, label: "Edit Users" },
  {
    id: ADMIN_PERMISSIONS.USER_ENABLE_DISABLE,
    label: "Enable / Disable Users",
  },
  { id: ADMIN_PERMISSIONS.USER_DELETE, label: "Delete Users" },
  {
    id: ADMIN_PERMISSIONS.USER_PASSWORD_RESET,
    label: "Reset User Passwords",
  },
  {
    id: ADMIN_PERMISSIONS.DASHBOARD_VIEW,
    label: "Dashboard",
  },
  {
    id: ADMIN_PERMISSIONS.LIVE_MONITORING_VIEW,
    label: "Live Monitoring",
  },
  {
    id: ADMIN_PERMISSIONS.ANALYTICS_VIEW,
    label: "Analytics",
  },
  {
    id: ADMIN_PERMISSIONS.CONSUMPTION_VIEW,
    label: "Consumption",
  },
  { id: ADMIN_PERMISSIONS.CHARGES_VIEW, label: "Charges" },
  {
    id: ADMIN_PERMISSIONS.DATA_DOWNLOAD,
    label: "Data Download",
  },
  { id: ADMIN_PERMISSIONS.ALERTS_VIEW, label: "Alerts" },
  {
    id: ADMIN_PERMISSIONS.DEVICE_CONTROL,
    label: "Device Control",
  },
];

export const USER_PERMISSION_OPTIONS = [
  { id: USER_PERMISSIONS.LOGIN, label: "Login" },
  {
    id: USER_PERMISSIONS.DASHBOARD_VIEW,
    label: "Dashboard",
  },
  {
    id: USER_PERMISSIONS.LIVE_MONITORING_VIEW,
    label: "Live Monitoring",
  },
  {
    id: USER_PERMISSIONS.ANALYTICS_VIEW,
    label: "Analytics",
  },
  {
    id: USER_PERMISSIONS.CONSUMPTION_VIEW,
    label: "Consumption",
  },
  { id: USER_PERMISSIONS.CHARGES_VIEW, label: "Charges" },
  {
    id: USER_PERMISSIONS.DATA_DOWNLOAD,
    label: "Data Download",
  },
  { id: USER_PERMISSIONS.ALERTS_VIEW, label: "Alerts" },
  {
    id: USER_PERMISSIONS.DEVICE_CONTROL,
    label: "Device Control",
  },
];

export const ALL_FEATURE_PERMISSIONS = [
  ...new Set([
    ...ADMIN_PERMISSION_OPTIONS.map((item) => item.id),
    ...USER_PERMISSION_OPTIONS.map((item) => item.id),
  ]),
];
