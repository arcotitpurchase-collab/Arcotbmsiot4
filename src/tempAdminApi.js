const STORAGE_KEY = "arcot_bms_temp_admin_system";

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

const defaultData = {
  admins: [],
  users: [],
};

export const tempApi = {
  getData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  },

  saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  resetData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("currentAdminId");
    return defaultData;
  },

  createAdmin(adminData) {
    const db = this.getData();

    const newAdmin = {
      id: Date.now(),
      companyName: adminData.companyName,
      buildingName: adminData.buildingName,
      adminName: adminData.adminName,
      adminEmail: adminData.adminEmail,
      password: adminData.password,
      phone: adminData.phone,
      status: "Active",
      addons: [],
      cloudUsage: {
        storageGB: 20,
        apiCalls: 12000,
        devices: 5,
        dataTransferGB: 10,
      },
      createdAt: new Date().toISOString(),
    };

    db.admins.push(newAdmin);
    this.saveData(db);
    return db;
  },

  loginAdmin(email, password) {
    const db = this.getData();

    const admin = db.admins.find(
      (item) =>
        item.adminEmail === email.trim() &&
        item.password === password.trim()
    );

    if (!admin) {
      return { success: false, message: "wrong" };
    }

    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("currentAdminId", String(admin.id));

    return { success: true, admin };
  },

  logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("currentAdminId");
  },

  getCurrentAdmin() {
    const db = this.getData();
    const currentAdminId = Number(localStorage.getItem("currentAdminId"));
    return db.admins.find((admin) => admin.id === currentAdminId) || null;
  },

  createUser(adminId, userData) {
    const db = this.getData();

    const newUser = {
      id: Date.now(),
      adminId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      accessType: userData.accessType,
      accessName: userData.accessName,
      permissions: userData.permissions || ["view_dashboard"],
      addedBy: userData.addedBy,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    this.saveData(db);
    return db;
  },

  updateAdmin(adminId, updater) {
    const db = this.getData();

    db.admins = db.admins.map((admin) =>
      admin.id === adminId ? updater(admin) : admin
    );

    this.saveData(db);
    return db;
  },

  deleteAdmin(adminId) {
    const db = this.getData();

    db.admins = db.admins.filter((admin) => admin.id !== adminId);
    db.users = db.users.filter((user) => user.adminId !== adminId);

    this.saveData(db);
    return db;
  },
};

export const calculateAdminBill = (admin, users) => {
  const storageCharge = admin.cloudUsage.storageGB * CLOUD_RATES.storageGB;

  const apiCharge =
    Math.ceil(admin.cloudUsage.apiCalls / 1000) * CLOUD_RATES.api1000;

  const deviceCharge = admin.cloudUsage.devices * CLOUD_RATES.device;

  const transferCharge =
    admin.cloudUsage.dataTransferGB * CLOUD_RATES.dataTransferGB;

  const addonCharge = admin.addons.reduce((sum, addonKey) => {
    const addon = ADDONS.find((item) => item.key === addonKey);
    return sum + (addon?.price || 0);
  }, 0);

  return {
    userCount: users.filter((user) => user.adminId === admin.id).length,
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