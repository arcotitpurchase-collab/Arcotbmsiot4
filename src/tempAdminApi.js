// const STORAGE_KEY = "arcot_bms_temp_admin_system";

// export const ADDONS = [
//   { key: "energy", name: "Energy Analytics", price: 250 },
//   { key: "reports", name: "Reports", price: 300 },
//   { key: "alarms", name: "Alarm Monitoring", price: 350 },
//   { key: "billing", name: "Tenant Billing", price: 500 },
//   { key: "ai", name: "AI Assistant", price: 750 },
// ];

// export const PERMISSIONS = [
//   "view_dashboard",
//   "view_source",
//   "view_feeder",
//   "view_transformer",
//   "view_reports",
//   "download_reports",
//   "acknowledge_alarms",
// ];

// export const CLOUD_RATES = {
//   storageGB: 8,
//   api1000: 2,
//   device: 50,
//   dataTransferGB: 10,
// };

// const defaultData = {
//   admins: [],
//   users: [],
// };

// export const tempApi = {
//   getData() {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : defaultData;
//   },

//   saveData(data) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   },

//   resetData() {
//     localStorage.removeItem(STORAGE_KEY);
//     localStorage.removeItem("adminLoggedIn");
//     localStorage.removeItem("currentAdminId");
//     return defaultData;
//   },

//   createAdmin(adminData) {
//     const db = this.getData();

//     const newAdmin = {
//       id: Date.now(),
//       companyName: adminData.companyName,
//       buildingName: adminData.buildingName,
//       adminName: adminData.adminName,
//       adminEmail: adminData.adminEmail,
//       password: adminData.password,
//       phone: adminData.phone,
//       status: "Active",
//       addons: [],
//       cloudUsage: {
//         storageGB: 20,
//         apiCalls: 12000,
//         devices: 5,
//         dataTransferGB: 10,
//       },
//       createdAt: new Date().toISOString(),
//     };

//     db.admins.push(newAdmin);
//     this.saveData(db);
//     return db;
//   },

//   loginAdmin(email, password) {
//     const db = this.getData();

//     const admin = db.admins.find(
//       (item) =>
//         item.adminEmail === email.trim() &&
//         item.password === password.trim()
//     );

//     if (!admin) {
//       return { success: false, message: "wrong" };
//     }

//     localStorage.setItem("adminLoggedIn", "true");
//     localStorage.setItem("currentAdminId", String(admin.id));

//     return { success: true, admin };
//   },

//   logoutAdmin() {
//     localStorage.removeItem("adminLoggedIn");
//     localStorage.removeItem("currentAdminId");
//   },

//   getCurrentAdmin() {
//     const db = this.getData();
//     const currentAdminId = Number(localStorage.getItem("currentAdminId"));
//     return db.admins.find((admin) => admin.id === currentAdminId) || null;
//   },

//   createUser(adminId, userData) {
//     const db = this.getData();

//     const newUser = {
//       id: Date.now(),
//       adminId,
//       name: userData.name,
//       email: userData.email,
//       role: userData.role,
//       accessType: userData.accessType,
//       accessName: userData.accessName,
//       permissions: userData.permissions || ["view_dashboard"],
//       addedBy: userData.addedBy,
//       status: "Active",
//       createdAt: new Date().toISOString(),
//     };

//     db.users.push(newUser);
//     this.saveData(db);
//     return db;
//   },

//   updateAdmin(adminId, updater) {
//     const db = this.getData();

//     db.admins = db.admins.map((admin) =>
//       admin.id === adminId ? updater(admin) : admin
//     );

//     this.saveData(db);
//     return db;
//   },

//   deleteAdmin(adminId) {
//     const db = this.getData();

//     db.admins = db.admins.filter((admin) => admin.id !== adminId);
//     db.users = db.users.filter((user) => user.adminId !== adminId);

//     this.saveData(db);
//     return db;
//   },
// };

// export const calculateAdminBill = (admin, users) => {
//   const storageCharge = admin.cloudUsage.storageGB * CLOUD_RATES.storageGB;

//   const apiCharge =
//     Math.ceil(admin.cloudUsage.apiCalls / 1000) * CLOUD_RATES.api1000;

//   const deviceCharge = admin.cloudUsage.devices * CLOUD_RATES.device;

//   const transferCharge =
//     admin.cloudUsage.dataTransferGB * CLOUD_RATES.dataTransferGB;

//   const addonCharge = admin.addons.reduce((sum, addonKey) => {
//     const addon = ADDONS.find((item) => item.key === addonKey);
//     return sum + (addon?.price || 0);
//   }, 0);

//   return {
//     userCount: users.filter((user) => user.adminId === admin.id).length,
//     storageCharge,
//     apiCharge,
//     deviceCharge,
//     transferCharge,
//     addonCharge,
//     total:
//       storageCharge +
//       apiCharge +
//       deviceCharge +
//       transferCharge +
//       addonCharge,
//   };
// };






// FRONTEND DEMO ONLY
// This file temporarily acts like a database and authentication service.
// Replace it with backend APIs before production.

const STORAGE_KEY = "arcot_bms_temp_admin_system";
const SESSION_KEY = "arcot_bms_current_session";

export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
};

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

export const PERMISSIONS = [
  "view_dashboard",
  "view_source",
  "view_feeder",
  "view_transformer",
  "view_reports",
  "download_reports",
  "acknowledge_alarms",
];

export const CLOUD_RATES = {
  storageGB: 8,
  api1000: 2,
  device: 50,
  dataTransferGB: 10,
};

const createDefaultData = () => ({
  superAdmins: [
    {
      id: "super-admin-1",
      name: "ARCOT Super Admin",
      email: "superadmin@arcot.com",
      password: "super123",
      systemRole: SYSTEM_ROLES.SUPER_ADMIN,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    },
  ],

  admins: [],

  users: [],
});

const normalizeEmail = (email = "") =>
  email.trim().toLowerCase();

const normalizeStatus = (status = "ACTIVE") =>
  status.toUpperCase();

const generateId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

const getSafeData = (data) => ({
  superAdmins: Array.isArray(data?.superAdmins)
    ? data.superAdmins
    : createDefaultData().superAdmins,

  admins: Array.isArray(data?.admins)
    ? data.admins
    : [],

  users: Array.isArray(data?.users)
    ? data.users
    : [],
});

export const tempApi = {
  initialize() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      const initialData = createDefaultData();
      this.saveData(initialData);
      return initialData;
    }

    try {
      const parsed = JSON.parse(saved);
      const normalized = getSafeData(parsed);

      this.saveData(normalized);

      return normalized;
    } catch (error) {
      console.error("Unable to read temporary data:", error);

      const initialData = createDefaultData();
      this.saveData(initialData);

      return initialData;
    }
  },

  getData() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return this.initialize();
    }

    try {
      return getSafeData(JSON.parse(saved));
    } catch (error) {
      console.error("Unable to parse temporary data:", error);
      return this.initialize();
    }
  },

  saveData(data) {
    const normalized = getSafeData(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalized)
    );

    return normalized;
  },

  resetData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);

    const initialData = createDefaultData();
    this.saveData(initialData);

    return initialData;
  },

  getSession() {
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedSession) {
      return null;
    }

    try {
      return JSON.parse(savedSession);
    } catch (error) {
      console.error("Unable to parse session:", error);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  setSession(account) {
    const session = {
      accountId: account.id,
      systemRole: account.systemRole,
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    return session;
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  login(email, password) {
    const db = this.getData();

    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = password.trim();

    const allAccounts = [
      ...db.superAdmins,
      ...db.admins,
      ...db.users,
    ];

    const account = allAccounts.find((item) => {
      const itemEmail = normalizeEmail(
        item.email || item.adminEmail
      );

      return (
        itemEmail === normalizedEmail &&
        item.password === normalizedPassword &&
        normalizeStatus(item.status) === "ACTIVE"
      );
    });

    if (!account) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    this.setSession(account);

    return {
      success: true,
      account,
    };
  },

  logout() {
    this.clearSession();
  },

  getCurrentAccount() {
    const session = this.getSession();

    if (!session) {
      return null;
    }

    const db = this.getData();

    const allAccounts = [
      ...db.superAdmins,
      ...db.admins,
      ...db.users,
    ];

    return (
      allAccounts.find(
        (account) =>
          String(account.id) ===
            String(session.accountId) &&
          account.systemRole === session.systemRole
      ) || null
    );
  },

  getCurrentSuperAdmin() {
    const account = this.getCurrentAccount();

    return account?.systemRole ===
      SYSTEM_ROLES.SUPER_ADMIN
      ? account
      : null;
  },

  getCurrentAdmin() {
    const account = this.getCurrentAccount();

    return account?.systemRole === SYSTEM_ROLES.ADMIN
      ? account
      : null;
  },

  getCurrentUser() {
    const account = this.getCurrentAccount();

    return account?.systemRole === SYSTEM_ROLES.USER
      ? account
      : null;
  },

  emailExists(email, excludedId = null) {
    const db = this.getData();
    const normalizedEmail = normalizeEmail(email);

    const allAccounts = [
      ...db.superAdmins,
      ...db.admins,
      ...db.users,
    ];

    return allAccounts.some(
      (account) =>
        normalizeEmail(account.email) ===
          normalizedEmail &&
        String(account.id) !== String(excludedId)
    );
  },

  createAdmin(adminData) {
    const db = this.getData();

    const requiredFields = [
      adminData.companyName,
      adminData.adminName,
      adminData.adminEmail,
      adminData.password,
    ];

    if (requiredFields.some((value) => !value?.trim())) {
      return {
        success: false,
        message:
          "Company name, admin name, email and password are required.",
      };
    }

    if (this.emailExists(adminData.adminEmail)) {
      return {
        success: false,
        message:
          "An account already exists with this email.",
      };
    }

    const newAdmin = {
      id: generateId("admin"),
      systemRole: SYSTEM_ROLES.ADMIN,

      companyName: adminData.companyName.trim(),
      buildingName:
        adminData.buildingName?.trim() || "",

      name: adminData.adminName.trim(),
      adminName: adminData.adminName.trim(),

      email: normalizeEmail(adminData.adminEmail),
      adminEmail: normalizeEmail(
        adminData.adminEmail
      ),

      password: adminData.password.trim(),
      phone: adminData.phone?.trim() || "",

      status: "ACTIVE",

      addons: [],

      cloudUsage: {
        storageGB: 20,
        apiCalls: 12000,
        devices: 5,
        dataTransferGB: 10,
      },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.admins.push(newAdmin);
    this.saveData(db);

    return {
      success: true,
      admin: newAdmin,
      data: db,
    };
  },

  updateAdmin(adminId, updater) {
    const db = this.getData();

    let updatedAdmin = null;

    db.admins = db.admins.map((admin) => {
      if (String(admin.id) !== String(adminId)) {
        return admin;
      }

      const updated =
        typeof updater === "function"
          ? updater(admin)
          : {
              ...admin,
              ...updater,
            };

      updatedAdmin = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };

      return updatedAdmin;
    });

    this.saveData(db);

    return {
      success: Boolean(updatedAdmin),
      admin: updatedAdmin,
      data: db,
    };
  },

  setAdminStatus(adminId, status) {
    return this.updateAdmin(adminId, (admin) => ({
      ...admin,
      status: normalizeStatus(status),
    }));
  },

  deleteAdmin(adminId) {
    const db = this.getData();

    const exists = db.admins.some(
      (admin) =>
        String(admin.id) === String(adminId)
    );

    if (!exists) {
      return {
        success: false,
        message: "Admin not found.",
        data: db,
      };
    }

    db.admins = db.admins.filter(
      (admin) =>
        String(admin.id) !== String(adminId)
    );

    db.users = db.users.filter(
      (user) =>
        String(user.adminId) !== String(adminId)
    );

    const session = this.getSession();

    if (
      session &&
      String(session.accountId) === String(adminId)
    ) {
      this.clearSession();
    }

    this.saveData(db);

    return {
      success: true,
      data: db,
    };
  },

  getAdminById(adminId) {
    const db = this.getData();

    return (
      db.admins.find(
        (admin) =>
          String(admin.id) === String(adminId)
      ) || null
    );
  },

  getUsersByAdmin(adminId) {
    const db = this.getData();

    return db.users.filter(
      (user) =>
        String(user.adminId) === String(adminId)
    );
  },

  createUser(adminId, userData) {
    const db = this.getData();

    const admin = db.admins.find(
      (item) =>
        String(item.id) === String(adminId)
    );

    if (!admin) {
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

    if (requiredFields.some((value) => !value?.trim())) {
      return {
        success: false,
        message:
          "User name, email and password are required.",
      };
    }

    if (this.emailExists(userData.email)) {
      return {
        success: false,
        message:
          "An account already exists with this email.",
      };
    }

    const newUser = {
      id: generateId("user"),
      systemRole: SYSTEM_ROLES.USER,
      adminId: admin.id,

      companyName: admin.companyName,
      buildingName: admin.buildingName,

      name: userData.name.trim(),
      email: normalizeEmail(userData.email),
      password: userData.password.trim(),

      designation:
        userData.designation || "VIEWER",

      accessType:
        userData.accessType || "BUILDING",

      accessName:
        userData.accessName?.trim() || "",

      permissions:
        Array.isArray(userData.permissions) &&
        userData.permissions.length > 0
          ? userData.permissions
          : ["view_dashboard"],

      addedBy:
        userData.addedBy ||
        admin.adminEmail ||
        admin.email,

      status: "ACTIVE",

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    this.saveData(db);

    return {
      success: true,
      user: newUser,
      data: db,
    };
  },

  updateUser(userId, updater) {
    const db = this.getData();

    let updatedUser = null;

    db.users = db.users.map((user) => {
      if (String(user.id) !== String(userId)) {
        return user;
      }

      const updated =
        typeof updater === "function"
          ? updater(user)
          : {
              ...user,
              ...updater,
            };

      updatedUser = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };

      return updatedUser;
    });

    this.saveData(db);

    return {
      success: Boolean(updatedUser),
      user: updatedUser,
      data: db,
    };
  },

  setUserStatus(userId, status) {
    return this.updateUser(userId, (user) => ({
      ...user,
      status: normalizeStatus(status),
    }));
  },

  deleteUser(userId) {
    const db = this.getData();

    const exists = db.users.some(
      (user) =>
        String(user.id) === String(userId)
    );

    if (!exists) {
      return {
        success: false,
        message: "User not found.",
        data: db,
      };
    }

    db.users = db.users.filter(
      (user) =>
        String(user.id) !== String(userId)
    );

    const session = this.getSession();

    if (
      session &&
      String(session.accountId) === String(userId)
    ) {
      this.clearSession();
    }

    this.saveData(db);

    return {
      success: true,
      data: db,
    };
  },

  hasPermission(permission) {
    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return user.permissions?.includes(permission);
  },
};

export const calculateAdminBill = (
  admin,
  users = []
) => {
  const cloudUsage = admin?.cloudUsage || {
    storageGB: 0,
    apiCalls: 0,
    devices: 0,
    dataTransferGB: 0,
  };

  const addons = Array.isArray(admin?.addons)
    ? admin.addons
    : [];

  const storageCharge =
    Number(cloudUsage.storageGB || 0) *
    CLOUD_RATES.storageGB;

  const apiCharge =
    Math.ceil(
      Number(cloudUsage.apiCalls || 0) / 1000
    ) * CLOUD_RATES.api1000;

  const deviceCharge =
    Number(cloudUsage.devices || 0) *
    CLOUD_RATES.device;

  const transferCharge =
    Number(cloudUsage.dataTransferGB || 0) *
    CLOUD_RATES.dataTransferGB;

  const addonCharge = addons.reduce(
    (sum, addonKey) => {
      const addon = ADDONS.find(
        (item) => item.key === addonKey
      );

      return sum + Number(addon?.price || 0);
    },
    0
  );

  return {
    userCount: users.filter(
      (user) =>
        String(user.adminId) ===
        String(admin?.id)
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