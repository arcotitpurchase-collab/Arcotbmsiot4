import {
  ADMIN_PERMISSIONS,
  SYSTEM_ROLES,
  USER_PERMISSIONS,
} from "./data/permissionOptions";
import {
  authenticateAccount,
  getCurrentAccount,
  logout as authLogout,
} from "./services/authService";
import {
  createId,
  getAdmins,
  getCurrentSession,
  getMockDatabase,
  getSuperAdmin,
  getUsers,
  initializeMockData,
  resetMockApplication,
  saveAdmins,
  saveMockDatabase,
  saveUsers,
} from "./services/storageService";

// FRONTEND DEMO ONLY: localStorage is not secure production authentication.
// Replace this compatibility facade with backend APIs before going live.

export { SYSTEM_ROLES };

export const USER_DESIGNATIONS = [
  "ENGINEER",
  "OPERATOR",
  "VIEWER",
];

export const ACCESS_TYPES = [
  "BUILDING",
  "FLOOR",
  "CLIENT",
  "EQUIPMENT",
];

export const ADDONS = [
  { key: "energy", name: "Energy Analytics", price: 250 },
  { key: "reports", name: "Reports", price: 300 },
  { key: "alarms", name: "Alarm Monitoring", price: 350 },
  { key: "billing", name: "Tenant Billing", price: 500 },
  { key: "ai", name: "AI Assistant", price: 750 },
];

export const PERMISSIONS = Object.values(USER_PERMISSIONS);

export const CLOUD_RATES = {
  storageGB: 8,
  api1000: 2,
  device: 50,
  dataTransferGB: 10,
};

const normalizeEmail = (email = "") =>
  String(email).trim().toLowerCase();

const normalizeStatus = (status = "ACTIVE") =>
  String(status).trim().toUpperCase();

const normalizeScope = (value) =>
  Array.isArray(value) ? value.map(String) : [];

const getPasswordSafeAccount = (account) => {
  if (!account) {
    return null;
  }

  const { password, ...safeAccount } = account;
  return safeAccount;
};

const isDeleted = (account) =>
  Boolean(account?.isDeleted || account?.deletedAt);

const emailExists = (email, excludedId = null) => {
  const normalizedEmail = normalizeEmail(email);
  const db = getMockDatabase();
  const accounts = [
    ...db.superAdmins,
    ...db.admins,
    ...db.users,
  ];

  return accounts.some(
    (account) =>
      !isDeleted(account) &&
      normalizeEmail(account.email || account.adminEmail) ===
        normalizedEmail &&
      String(account.id) !== String(excludedId)
  );
};

export const tempApi = {
  initialize() {
    return initializeMockData();
  },

  getData() {
    return getMockDatabase();
  },

  saveData(data) {
    return saveMockDatabase(data);
  },

  resetData() {
    return resetMockApplication();
  },

  getSession() {
    return getCurrentSession();
  },

  setSession(account) {
    const result = authenticateAccount(
      account.email || account.adminEmail,
      account.password || ""
    );

    return result.session || null;
  },

  clearSession() {
    authLogout();
  },

  login(email, password) {
    const result = authenticateAccount(email, password);

    return {
      success: result.success,
      message: result.message,
      account: result.account,
      landingRoute: result.landingRoute,
      session: result.session,
    };
  },

  loginAdmin(email, password) {
    const result = this.login(email, password);

    if (
      result.success &&
      result.account?.systemRole !== SYSTEM_ROLES.ADMIN
    ) {
      this.logout();
      return {
        success: false,
        message: "This login is only for Admin accounts.",
      };
    }

    return result;
  },

  loginAdmin(email, password) {
    const result = this.login(email, password);

    if (
      result.success &&
      result.account?.systemRole !== SYSTEM_ROLES.ADMIN
    ) {
      this.logout();
      return {
        success: false,
        message: "This login is only for Admin accounts.",
      };
    }

    return result;
  },

  loginAdmin(email, password) {
    const result = this.login(email, password);

    if (
      result.success &&
      result.account?.systemRole !== SYSTEM_ROLES.ADMIN
    ) {
      this.logout();
      return {
        success: false,
        message: "This login is only for Admin accounts.",
      };
    }

    return result;
  },

  logout() {
    authLogout();
  },

  logoutAdmin() {
    authLogout();
  },

  logoutAdmin() {
    authLogout();
  },

  logoutAdmin() {
    authLogout();
  },

  getCurrentAccount() {
    return getCurrentAccount();
  },

  getCurrentSuperAdmin() {
    const account = getCurrentAccount();
    return account?.systemRole === SYSTEM_ROLES.SUPER_ADMIN
      ? account
      : null;
  },

  getCurrentAdmin() {
    const account = getCurrentAccount();
    return account?.systemRole === SYSTEM_ROLES.ADMIN
      ? account
      : null;
  },

  getCurrentUser() {
    const account = getCurrentAccount();
    return account?.systemRole === SYSTEM_ROLES.USER
      ? account
      : null;
  },

  getCurrentUser() {
    const account = getCurrentAccount();
    return account?.systemRole === SYSTEM_ROLES.USER
      ? account
      : null;
  },

  getCurrentUser() {
    const account = getCurrentAccount();
    return account?.systemRole === SYSTEM_ROLES.USER
      ? account
      : null;
  },

  emailExists,

  createAdmin(adminData) {
    const requiredFields = [
      adminData.companyName,
      adminData.adminName,
      adminData.adminEmail,
      adminData.password,
    ];

    if (requiredFields.some((value) => !String(value || "").trim())) {
      return {
        success: false,
        message:
          "Company name, admin name, email and password are required.",
      };
    }

    if (emailExists(adminData.adminEmail)) {
      return {
        success: false,
        message: "An account already exists with this email.",
      };
    }

    const createdAt = new Date().toISOString();
    const admins = getAdmins();
    const newAdmin = {
      id: createId("admin"),
      systemRole: SYSTEM_ROLES.ADMIN,
      companyName: adminData.companyName.trim(),
      buildingName: adminData.buildingName?.trim() || "",
      name: adminData.adminName.trim(),
      adminName: adminData.adminName.trim(),
      email: normalizeEmail(adminData.adminEmail),
      adminEmail: normalizeEmail(adminData.adminEmail),
      password: adminData.password,
      phone: adminData.phone?.trim() || "",
      status: normalizeStatus(adminData.status || "ACTIVE"),
      isDeleted: false,
      permissions:
        Array.isArray(adminData.permissions) &&
        adminData.permissions.length > 0
          ? adminData.permissions
          : Object.values(ADMIN_PERMISSIONS),
      assignedClientIds: normalizeScope(
        adminData.assignedClientIds
      ),
      assignedBuildingIds: normalizeScope(
        adminData.assignedBuildingIds
      ),
      assignedBlockIds: normalizeScope(
        adminData.assignedBlockIds
      ),
      assignedFloorIds: normalizeScope(
        adminData.assignedFloorIds
      ),
      assignedSystemIds: normalizeScope(
        adminData.assignedSystemIds
      ),
      addons: [],
      cloudUsage: {
        storageGB: 20,
        apiCalls: 12000,
        devices: 5,
        dataTransferGB: 10,
      },
      createdAt,
      updatedAt: createdAt,
      lastLoginAt: null,
    };

    saveAdmins([...admins, newAdmin]);

    return {
      success: true,
      admin: getPasswordSafeAccount(newAdmin),
      data: this.getData(),
    };
  },

  updateAdmin(adminId, updater) {
    let updatedAdmin = null;

    const admins = getAdmins().map((admin) => {
      if (String(admin.id) !== String(adminId)) {
        return admin;
      }

      const updated =
        typeof updater === "function"
          ? updater(admin)
          : { ...admin, ...updater };

      updatedAdmin = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };

      return updatedAdmin;
    });

    saveAdmins(admins);

    return {
      success: Boolean(updatedAdmin),
      admin: getPasswordSafeAccount(updatedAdmin),
      data: this.getData(),
    };
  },

  setAdminStatus(adminId, status) {
    return this.updateAdmin(adminId, (admin) => ({
      ...admin,
      status: normalizeStatus(status),
    }));
  },

  deleteAdmin(adminId) {
    const deletedAt = new Date().toISOString();
    const result = this.updateAdmin(adminId, (admin) => ({
      ...admin,
      status: "DELETED",
      isDeleted: true,
      deletedAt,
    }));

    if (result.success) {
      saveUsers(
        getUsers().map((user) =>
          String(user.adminId) === String(adminId)
            ? {
                ...user,
                status: "DELETED",
                isDeleted: true,
                deletedAt,
                updatedAt: deletedAt,
              }
            : user
        )
      );
    }

    return {
      ...result,
      data: this.getData(),
    };
  },

  getAdminById(adminId) {
    return (
      getAdmins().find(
        (admin) => String(admin.id) === String(adminId)
      ) || null
    );
  },

  getUsersByAdmin(adminId) {
    return getUsers().filter(
      (user) => String(user.adminId) === String(adminId)
    );
  },

  createUser(adminId, userData) {
    const admin = this.getAdminById(adminId);

    if (!admin || isDeleted(admin)) {
      return {
        success: false,
        message: "Admin account was not found.",
      };
    }

    const requiredFields = [
      userData.name,
      userData.email,
      userData.password,
    ];

    if (requiredFields.some((value) => !String(value || "").trim())) {
      return {
        success: false,
        message: "User name, email and password are required.",
      };
    }

    if (emailExists(userData.email)) {
      return {
        success: false,
        message: "An account already exists with this email.",
      };
    }

    const createdAt = new Date().toISOString();
    const newUser = {
      id: createId("user"),
      systemRole: SYSTEM_ROLES.USER,
      role: SYSTEM_ROLES.USER,
      adminId: admin.id,
      createdBy: admin.id,
      companyName: admin.companyName,
      buildingName: admin.buildingName,
      name: userData.name.trim(),
      email: normalizeEmail(userData.email),
      password: userData.password,
      designation: userData.designation || "VIEWER",
      accessType: userData.accessType || "BUILDING",
      accessName: userData.accessName?.trim() || "",
      permissions: normalizeScope(userData.permissions),
      assignedClientIds: normalizeScope(userData.assignedClientIds),
      assignedBuildingIds: normalizeScope(userData.assignedBuildingIds),
      assignedBlockIds: normalizeScope(userData.assignedBlockIds),
      assignedFloorIds: normalizeScope(userData.assignedFloorIds),
      assignedZoneIds: normalizeScope(userData.assignedZoneIds),
      addedBy: userData.addedBy || admin.adminEmail || admin.email,
      status: normalizeStatus(userData.status || "ACTIVE"),
      isActive:
        normalizeStatus(userData.status || "ACTIVE") === "ACTIVE",
      isDeleted: false,
      createdAt,
      updatedAt: createdAt,
      lastLoginAt: null,
    };

    saveUsers([...getUsers(), newUser]);

    return {
      success: true,
      user: getPasswordSafeAccount(newUser),
      data: this.getData(),
    };
  },

  updateUser(userId, updater) {
    let updatedUser = null;

    const users = getUsers().map((user) => {
      if (String(user.id) !== String(userId)) {
        return user;
      }

      const updated =
        typeof updater === "function"
          ? updater(user)
          : { ...user, ...updater };

      updatedUser = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };

      return updatedUser;
    });

    saveUsers(users);

    return {
      success: Boolean(updatedUser),
      user: getPasswordSafeAccount(updatedUser),
      data: this.getData(),
    };
  },

  setUserStatus(userId, status) {
    return this.updateUser(userId, (user) => ({
      ...user,
      status: normalizeStatus(status),
    }));
  },

  deleteUser(userId) {
    const deletedAt = new Date().toISOString();

    return this.updateUser(userId, (user) => ({
      ...user,
      status: "DELETED",
      isDeleted: true,
      deletedAt,
    }));
  },

  hasPermission(permission) {
    const account = getCurrentAccount();

    if (!account) {
      return false;
    }

    if (account.systemRole === SYSTEM_ROLES.SUPER_ADMIN) {
      return true;
    }

    return account.permissions?.includes(permission);
  },
};

export const calculateAdminBill = (admin, users = []) => {
  const cloudUsage = admin?.cloudUsage || {
    storageGB: 0,
    apiCalls: 0,
    devices: 0,
    dataTransferGB: 0,
  };
  const addons = Array.isArray(admin?.addons) ? admin.addons : [];
  const storageCharge =
    Number(cloudUsage.storageGB || 0) * CLOUD_RATES.storageGB;
  const apiCharge =
    Math.ceil(Number(cloudUsage.apiCalls || 0) / 1000) *
    CLOUD_RATES.api1000;
  const deviceCharge =
    Number(cloudUsage.devices || 0) * CLOUD_RATES.device;
  const transferCharge =
    Number(cloudUsage.dataTransferGB || 0) *
    CLOUD_RATES.dataTransferGB;
  const addonCharge = addons.reduce((sum, addonKey) => {
    const addon = ADDONS.find((item) => item.key === addonKey);
    return sum + Number(addon?.price || 0);
  }, 0);

  return {
    userCount: users.filter(
      (user) =>
        !isDeleted(user) &&
        String(user.adminId) === String(admin?.id)
    ).length,
    storageCharge,
    apiCharge,
    deviceCharge,
    transferCharge,
    addonCharge,
    total:
      storageCharge +
      apiCharge +
      deviceCharge +
      transferCharge +
      addonCharge,
  };
};

tempApi.initialize();
