import {
  ADMIN_PERMISSION_OPTIONS,
  ADMIN_PERMISSIONS,
  SYSTEM_ROLES,
} from "../data/permissionOptions";
import {
  createId,
  getAdmins,
  getSuperAdmin,
  getUsers,
  saveAdmins,
} from "./storageService";
import {
  getScopeLabels,
  hierarchySnapshot,
  pruneScope,
} from "../utils/bmsHierarchy";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedAdminPermissions = new Set(
  ADMIN_PERMISSION_OPTIONS.map((permission) => permission.id)
);

const normalizeEmail = (email = "") =>
  String(email).trim().toLowerCase();

const normalizeString = (value = "") => String(value).trim();

const isDeleted = (account) =>
  Boolean(account?.isDeleted || account?.deletedAt);

const isActive = (account) =>
  account?.isActive !== false &&
  String(account?.status || "ACTIVE").toUpperCase() === "ACTIVE" &&
  !isDeleted(account);

const withoutPassword = (account) => {
  if (!account) {
    return null;
  }

  const { password, ...safeAccount } = account;
  return safeAccount;
};

const uniqueValues = (values) => [
  ...new Set(
    (Array.isArray(values) ? values : [])
      .map((value) => String(value).trim())
      .filter(Boolean)
  ),
];

const findEmailOwner = (email, excludedAdminId = null) => {
  const normalizedEmail = normalizeEmail(email);
  const superAdmin = getSuperAdmin();
  const accounts = [
    ...(superAdmin ? [superAdmin] : []),
    ...getAdmins(),
    ...getUsers(),
  ];

  return accounts.find((account) => {
    if (String(account.id) === String(excludedAdminId)) {
      return false;
    }

    return (
      normalizeEmail(account.email || account.adminEmail) ===
      normalizedEmail
    );
  });
};

const validateScope = (payload) => {
  const requestedScope = {
    assignedClientIds: payload.assignedClientIds,
    assignedBuildingIds: payload.assignedBuildingIds,
    assignedBlockIds: payload.assignedBlockIds,
    assignedFloorIds: payload.assignedFloorIds,
    assignedSystemIds: payload.assignedSystemIds,
  };

  const prunedScope = pruneScope(requestedScope);
  const errors = {};

  if (prunedScope.assignedClientIds.length === 0) {
    errors.assignedClientIds = "Select at least one client.";
  }

  if (prunedScope.assignedBuildingIds.length === 0) {
    errors.assignedBuildingIds = "Select at least one building.";
  }

  if (prunedScope.assignedBlockIds.length === 0) {
    errors.assignedBlockIds = "Select at least one block.";
  }

  if (prunedScope.assignedFloorIds.length === 0) {
    errors.assignedFloorIds = "Select at least one floor.";
  }

  if (prunedScope.assignedSystemIds.length === 0) {
    errors.assignedSystemIds = "Select at least one system.";
  }

  Object.entries(requestedScope).forEach(([key, values]) => {
    const submittedCount = uniqueValues(values).length;
    const validCount = prunedScope[key].length;

    if (submittedCount > validCount && !errors[key]) {
      errors[key] = "One or more selected IDs are outside the permitted hierarchy.";
    }
  });

  return {
    scope: prunedScope,
    errors,
  };
};

const validateAdminPayload = (
  payload,
  { mode, adminId = null } = {}
) => {
  const errors = {};
  const name = normalizeString(payload.name || payload.adminName);
  const email = normalizeEmail(payload.email || payload.adminEmail);
  const password = String(payload.password || "");

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (findEmailOwner(email, adminId)) {
    errors.email = "An account already exists with this email.";
  }

  if (mode === "create") {
    if (!password) {
      errors.password = "Temporary password is required.";
    } else if (password.length < 8) {
      errors.password = "Use at least 8 characters for the temporary password.";
    }
  } else if (password && password.length < 8) {
    errors.password = "Use at least 8 characters for the temporary password.";
  }

  if (
    payload.systemRole &&
    payload.systemRole !== SYSTEM_ROLES.ADMIN
  ) {
    errors.systemRole = "Role must be ADMIN.";
  }

  const permissions = uniqueValues(payload.permissions);
  const invalidPermissions = permissions.filter(
    (permission) => !allowedAdminPermissions.has(permission)
  );

  if (invalidPermissions.length > 0) {
    errors.permissions =
      "Permission values must come from centralized Admin permission definitions.";
  }

  if (permissions.length === 0) {
    errors.permissions = "Select at least one Admin permission.";
  }

  const scopeResult = validateScope(payload);

  return {
    isValid:
      Object.keys(errors).length === 0 &&
      Object.keys(scopeResult.errors).length === 0,
    errors: {
      ...errors,
      ...scopeResult.errors,
    },
    normalized: {
      name,
      email,
      password,
      permissions,
      scope: scopeResult.scope,
    },
  };
};

const enrichAdmin = (admin) => {
  const summary = getAdminSummary(admin.id);

  return {
    ...withoutPassword(admin),
    summary,
    scopeLabels: getScopeLabels(admin),
  };
};

const saveAdminList = (admins) => {
  saveAdmins(admins);
  return getAdmins();
};

export const getAllAdmins = ({ includeDeleted = true } = {}) => {
  const admins = getAdmins();

  return admins
    .filter((admin) => includeDeleted || !isDeleted(admin))
    .map(enrichAdmin);
};

export const getAdminById = (adminId) => {
  const admin =
    getAdmins().find(
      (item) => String(item.id) === String(adminId)
    ) || null;

  return admin ? enrichAdmin(admin) : null;
};

export const createAdmin = (payload) => {
  const validation = validateAdminPayload(payload, {
    mode: "create",
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please correct the highlighted fields.",
    };
  }

  const createdAt = new Date().toISOString();
  const admin = {
    id: createId("admin"),
    systemRole: SYSTEM_ROLES.ADMIN,
    companyName:
      payload.companyName?.trim() ||
      validation.normalized.scope.assignedClientIds[0],
    buildingName:
      payload.buildingName?.trim() ||
      validation.normalized.scope.assignedBuildingIds[0],
    name: validation.normalized.name,
    adminName: validation.normalized.name,
    email: validation.normalized.email,
    adminEmail: validation.normalized.email,
    password: validation.normalized.password,
    mustChangePassword: Boolean(payload.mustChangePassword),
    passwordResetAt: null,
    phone: payload.phone?.trim() || "",
    status: payload.isActive === false ? "INACTIVE" : "ACTIVE",
    isActive: payload.isActive !== false,
    disabledAt:
      payload.isActive === false ? createdAt : null,
    isDeleted: false,
    deletedAt: null,
    permissions: validation.normalized.permissions,
    ...validation.normalized.scope,
    addons: Array.isArray(payload.addons) ? payload.addons : [],
    cloudUsage: {
      storageGB: Number(payload.cloudUsage?.storageGB || 0),
      apiCalls: Number(payload.cloudUsage?.apiCalls || 0),
      devices: Number(payload.cloudUsage?.devices || 0),
      dataTransferGB: Number(
        payload.cloudUsage?.dataTransferGB || 0
      ),
    },
    createdBy: getSuperAdmin()?.email || "superadmin@arcot.com",
    createdAt,
    updatedAt: createdAt,
    lastLoginAt: null,
  };

  saveAdminList([...getAdmins(), admin]);

  return {
    success: true,
    admin: enrichAdmin(admin),
  };
};

export const updateAdmin = (adminId, payload) => {
  const existing = getAdmins().find(
    (admin) => String(admin.id) === String(adminId)
  );

  if (!existing) {
    return {
      success: false,
      message: "Admin account was not found.",
      errors: {},
    };
  }

  const validation = validateAdminPayload(payload, {
    mode: "update",
    adminId,
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please correct the highlighted fields.",
    };
  }

  let updatedAdmin = null;
  const updatedAt = new Date().toISOString();

  const admins = getAdmins().map((admin) => {
    if (String(admin.id) !== String(adminId)) {
      return admin;
    }

    updatedAdmin = {
      ...admin,
      companyName:
        payload.companyName?.trim() ||
        validation.normalized.scope.assignedClientIds[0],
      buildingName:
        payload.buildingName?.trim() ||
        validation.normalized.scope.assignedBuildingIds[0],
      name: validation.normalized.name,
      adminName: validation.normalized.name,
      email: validation.normalized.email,
      adminEmail: validation.normalized.email,
      phone: payload.phone?.trim() || "",
      isActive: payload.isActive !== false,
      status: payload.isActive === false ? "INACTIVE" : "ACTIVE",
      disabledAt:
        payload.isActive === false
          ? admin.disabledAt || updatedAt
          : null,
      permissions: validation.normalized.permissions,
      ...validation.normalized.scope,
      updatedAt,
    };

    if (validation.normalized.password) {
      updatedAdmin.password = validation.normalized.password;
      updatedAdmin.mustChangePassword = Boolean(
        payload.mustChangePassword
      );
      updatedAdmin.passwordResetAt = updatedAt;
    }

    return updatedAdmin;
  });

  saveAdminList(admins);

  return {
    success: true,
    admin: enrichAdmin(updatedAdmin),
  };
};

export const setAdminStatus = (adminId, shouldBeActive) => {
  let updatedAdmin = null;
  const updatedAt = new Date().toISOString();

  const admins = getAdmins().map((admin) => {
    if (String(admin.id) !== String(adminId)) {
      return admin;
    }

    if (isDeleted(admin) && shouldBeActive) {
      updatedAdmin = admin;
      return admin;
    }

    updatedAdmin = {
      ...admin,
      isActive: Boolean(shouldBeActive),
      status: shouldBeActive ? "ACTIVE" : "INACTIVE",
      disabledAt: shouldBeActive ? null : updatedAt,
      updatedAt,
    };

    return updatedAdmin;
  });

  saveAdminList(admins);

  if (updatedAdmin && isDeleted(updatedAdmin) && shouldBeActive) {
    return {
      success: false,
      message: "Restore the Admin before enabling the account.",
    };
  }

  return {
    success: Boolean(updatedAdmin),
    admin: updatedAdmin ? enrichAdmin(updatedAdmin) : null,
  };
};

export const softDeleteAdmin = (adminId) => {
  let updatedAdmin = null;
  const updatedAt = new Date().toISOString();

  const admins = getAdmins().map((admin) => {
    if (String(admin.id) !== String(adminId)) {
      return admin;
    }

    updatedAdmin = {
      ...admin,
      isActive: false,
      status: "DELETED",
      isDeleted: true,
      disabledAt: admin.disabledAt || updatedAt,
      deletedAt: updatedAt,
      updatedAt,
    };

    return updatedAdmin;
  });

  saveAdminList(admins);

  return {
    success: Boolean(updatedAdmin),
    admin: updatedAdmin ? enrichAdmin(updatedAdmin) : null,
  };
};

export const restoreAdmin = (adminId) => {
  let updatedAdmin = null;
  const updatedAt = new Date().toISOString();

  const admins = getAdmins().map((admin) => {
    if (String(admin.id) !== String(adminId)) {
      return admin;
    }

    updatedAdmin = {
      ...admin,
      isDeleted: false,
      deletedAt: null,
      isActive: false,
      status: "INACTIVE",
      disabledAt: admin.disabledAt || updatedAt,
      updatedAt,
    };

    return updatedAdmin;
  });

  saveAdminList(admins);

  return {
    success: Boolean(updatedAdmin),
    admin: updatedAdmin ? enrichAdmin(updatedAdmin) : null,
  };
};

const generateTemporaryPassword = () => {
  const randomPart =
    globalThis.crypto?.randomUUID?.().slice(0, 8) ||
    Math.random().toString(36).slice(2, 10);

  return `Admin@${randomPart}`;
};

export const resetAdminPassword = (adminId) => {
  let updatedAdmin = null;
  const temporaryPassword = generateTemporaryPassword();
  const updatedAt = new Date().toISOString();

  const admins = getAdmins().map((admin) => {
    if (String(admin.id) !== String(adminId)) {
      return admin;
    }

    updatedAdmin = {
      ...admin,
      password: temporaryPassword,
      mustChangePassword: true,
      passwordResetAt: updatedAt,
      updatedAt,
    };

    return updatedAdmin;
  });

  saveAdminList(admins);

  return {
    success: Boolean(updatedAdmin),
    admin: updatedAdmin ? enrichAdmin(updatedAdmin) : null,
    temporaryPassword,
  };
};

export const getUsersCreatedByAdmin = (adminId) =>
  getUsers()
    .filter(
      (user) =>
        String(user.createdBy || user.adminId) === String(adminId)
    )
    .map(withoutPassword);

export const getAdminSummary = (adminId) => {
  const admin = getAdmins().find(
    (item) => String(item.id) === String(adminId)
  );
  const users = getUsersCreatedByAdmin(adminId);
  const activeUsers = users.filter(isActive);
  const disabledUsers = users.filter(
    (user) => !isActive(user) && !isDeleted(user)
  );
  const deletedUsers = users.filter(isDeleted);
  const floorCount = uniqueValues(admin?.assignedFloorIds).length;
  const systemCount = uniqueValues(admin?.assignedSystemIds).length;
  const clientCount = uniqueValues(admin?.assignedClientIds).length;
  const scopedConsumption =
    floorCount * 1250 + systemCount * 180 + clientCount * 95;
  const scopedCharges = scopedConsumption * 8.5;

  return {
    userCount: users.length,
    activeUserCount: activeUsers.length,
    disabledUserCount: disabledUsers.length,
    deletedUserCount: deletedUsers.length,
    consumptionKwh: scopedConsumption,
    charges: scopedCharges,
  };
};

export const getSuperAdminDashboardSummary = () => {
  const admins = getAdmins();

  return admins.reduce(
    (summary, admin) => {
      const adminSummary = getAdminSummary(admin.id);

      summary.totalAdmins += 1;
      summary.totalUsers += adminSummary.userCount;
      summary.totalConsumption += adminSummary.consumptionKwh;
      summary.totalCharges += adminSummary.charges;

      if (isDeleted(admin)) {
        summary.deletedAdmins += 1;
      } else if (isActive(admin)) {
        summary.activeAdmins += 1;
      } else {
        summary.disabledAdmins += 1;
      }

      return summary;
    },
    {
      totalAdmins: 0,
      activeAdmins: 0,
      disabledAdmins: 0,
      deletedAdmins: 0,
      totalUsers: 0,
      totalConsumption: 0,
      totalCharges: 0,
    }
  );
};

export const getAdminFormOptions = (scope = {}) => {
  const prunedScope = pruneScope(scope);

  return {
    clients: hierarchySnapshot.clients,
    buildings: hierarchySnapshot.buildings.filter((building) =>
      prunedScope.assignedClientIds.some((clientId) =>
        building.clientIds.includes(clientId)
      )
    ),
    blocks: hierarchySnapshot.blocks.filter((block) =>
      prunedScope.assignedBuildingIds.includes(block.buildingId)
    ),
    floors: hierarchySnapshot.floors.filter((floor) =>
      prunedScope.assignedBlockIds.includes(floor.blockId)
    ),
    systems: hierarchySnapshot.systems.filter((system) =>
      prunedScope.assignedFloorIds.includes(system.floorId)
    ),
    scope: prunedScope,
  };
};

export { pruneScope, isActive, isDeleted };
