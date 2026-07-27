import {
  ADMIN_PERMISSIONS,
  SYSTEM_ROLES,
  USER_PERMISSION_OPTIONS,
  USER_PERMISSIONS,
} from "../data/permissionOptions";
import {
  createId,
  getAdmins,
  getSuperAdmin,
  getUsers,
  saveUsers,
} from "./storageService";
import {
  getAllBlocks,
  getAllBuildings,
  getAllClients,
  getAllFloors,
  getAllZones,
  getScopeLabels,
  normalizeUserHierarchySelection,
  normalizeId,
} from "../utils/bmsHierarchy";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Grant mapping: an Admin may grant a User feature only when the Admin has
// the corresponding management/view permission. LOGIN is grantable when the
// Admin can create Users or enable/disable Users.
const grantPermissionMap = {
  [USER_PERMISSIONS.LOGIN]: [
    ADMIN_PERMISSIONS.USER_CREATE,
    ADMIN_PERMISSIONS.USER_ENABLE_DISABLE,
  ],
  [USER_PERMISSIONS.DASHBOARD_VIEW]: [
    ADMIN_PERMISSIONS.DASHBOARD_VIEW,
  ],
  [USER_PERMISSIONS.LIVE_MONITORING_VIEW]: [
    ADMIN_PERMISSIONS.LIVE_MONITORING_VIEW,
  ],
  [USER_PERMISSIONS.ANALYTICS_VIEW]: [
    ADMIN_PERMISSIONS.ANALYTICS_VIEW,
  ],
  [USER_PERMISSIONS.CONSUMPTION_VIEW]: [
    ADMIN_PERMISSIONS.CONSUMPTION_VIEW,
  ],
  [USER_PERMISSIONS.CHARGES_VIEW]: [
    ADMIN_PERMISSIONS.CHARGES_VIEW,
  ],
  [USER_PERMISSIONS.DATA_DOWNLOAD]: [
    ADMIN_PERMISSIONS.DATA_DOWNLOAD,
  ],
  [USER_PERMISSIONS.ALERTS_VIEW]: [
    ADMIN_PERMISSIONS.ALERTS_VIEW,
  ],
  [USER_PERMISSIONS.DEVICE_CONTROL]: [
    ADMIN_PERMISSIONS.DEVICE_CONTROL,
  ],
};

const normalizeEmail = (email = "") =>
  String(email).trim().toLowerCase();

const normalizeString = (value = "") => String(value).trim();

const uniqueValues = (values) => [
  ...new Set(
    (Array.isArray(values) ? values : [])
      .map((value) => String(value).trim())
      .filter(Boolean)
  ),
];

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

  const { password, temporaryPassword, ...safeAccount } = account;
  return safeAccount;
};

const normalizeUserRecord = (user) => ({
  ...user,
  role: SYSTEM_ROLES.USER,
  systemRole: SYSTEM_ROLES.USER,
  createdBy: user.createdBy || user.adminId,
  adminId: user.adminId || user.createdBy,
  isActive:
    typeof user.isActive === "boolean"
      ? user.isActive
      : String(user.status || "ACTIVE").toUpperCase() === "ACTIVE",
});

const ownsUser = (currentAdmin, user) =>
  Boolean(
    currentAdmin?.id &&
      user &&
      String(normalizeUserRecord(user).createdBy) ===
        String(currentAdmin.id)
  );

const hasAdminPermission = (currentAdmin, permission) =>
  currentAdmin?.permissions?.includes(permission);

const findEmailOwner = (email, excludedUserId = null) => {
  const normalizedEmail = normalizeEmail(email);
  const superAdmin = getSuperAdmin();
  const accounts = [
    ...(superAdmin ? [superAdmin] : []),
    ...getAdmins(),
    ...getUsers(),
  ];

  return accounts.find((account) => {
    if (String(account.id) === String(excludedUserId)) {
      return false;
    }

    return (
      normalizeEmail(account.email || account.adminEmail) ===
      normalizedEmail
    );
  });
};

export const getGrantableUserPermissions = (currentAdmin) => {
  const adminPermissions = new Set(currentAdmin?.permissions || []);

  return USER_PERMISSION_OPTIONS.filter((permission) => {
    const requiredAdminPermissions =
      grantPermissionMap[permission.id] || [];

    return requiredAdminPermissions.some((adminPermission) =>
      adminPermissions.has(adminPermission)
    );
  });
};

const getGrantableIds = (currentAdmin) =>
  new Set(
    getGrantableUserPermissions(currentAdmin).map(
      (permission) => permission.id
    )
  );

const hasOption = (options, id) =>
  options.some((option) => normalizeId(option.id) === normalizeId(id));

const getAllowedScopeOptions = (_currentAdmin, scope = {}) => {
  const clients = getAllClients();
  const buildings = getAllBuildings();
  const blocks = getAllBlocks();
  const floors = getAllFloors();
  const zones = getAllZones();
  const normalizedScope = normalizeUserHierarchySelection({
    assignedClientIds: scope.assignedClientIds,
    assignedBuildingIds: scope.assignedBuildingIds,
    assignedBlockIds: scope.assignedBlockIds,
    assignedFloorIds: scope.assignedFloorIds,
    assignedZoneIds: scope.assignedZoneIds,
  });
  const assignedClientIds = normalizedScope.assignedClientIds.filter((id) =>
    hasOption(clients, id)
  );
  const assignedBuildingIds = normalizedScope.assignedBuildingIds.filter((id) =>
    hasOption(buildings, id)
  );
  const assignedBlockIds = normalizedScope.assignedBlockIds.filter((id) =>
    hasOption(blocks, id)
  );
  const assignedFloorIds = normalizedScope.assignedFloorIds.filter((id) =>
    hasOption(floors, id)
  );
  const assignedZoneIds = normalizedScope.assignedZoneIds.filter((id) =>
    hasOption(zones, id)
  );

  return {
    clients,
    buildings,
    blocks,
    floors,
    zones,
    scope: {
      assignedClientIds,
      assignedBuildingIds,
      assignedBlockIds,
      assignedFloorIds,
      assignedZoneIds,
    },
  };
};

const validateScopeForAdmin = (currentAdmin, payload) => {
  const requestedScope = {
    assignedClientIds: payload.assignedClientIds,
    assignedBuildingIds: payload.assignedBuildingIds,
    assignedBlockIds: payload.assignedBlockIds,
    assignedFloorIds: payload.assignedFloorIds,
    assignedZoneIds: payload.assignedZoneIds,
  };
  const options = getAllowedScopeOptions(currentAdmin, requestedScope);
  const errors = {};

  [
    ["assignedClientIds", "Select at least one client."],
    ["assignedBuildingIds", "Select at least one building."],
    ["assignedBlockIds", "Select at least one block."],
    ["assignedFloorIds", "Select at least one floor."],
    ["assignedZoneIds", "Select at least one zone."],
  ].forEach(([field, message]) => {
    if (options.scope[field].length === 0) {
      errors[field] = message;
    }

    if (
      uniqueValues(requestedScope[field]).length >
        options.scope[field].length &&
      !errors[field]
    ) {
      errors[field] =
        "One or more selected IDs are outside the project hierarchy.";
    }
  });

  return {
    scope: options.scope,
    errors,
  };
};

const validateUserPayload = (
  currentAdmin,
  payload,
  { mode, userId = null } = {}
) => {
  const errors = {};
  const name = normalizeString(payload.name);
  const email = normalizeEmail(payload.email);
  const password = String(
    payload.temporaryPassword || payload.password || ""
  );

  if (!currentAdmin?.id) {
    errors.currentAdmin = "An active Admin session is required.";
  }

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (findEmailOwner(email, userId)) {
    errors.email = "An account already exists with this email.";
  }

  if (mode === "create") {
    if (!password) {
      errors.temporaryPassword = "Temporary password is required.";
    } else if (password.length < 8) {
      errors.temporaryPassword =
        "Use at least 8 characters for the temporary password.";
    }
  } else if (password && password.length < 8) {
    errors.temporaryPassword =
      "Use at least 8 characters for the temporary password.";
  }

  if (
    payload.role &&
    payload.role !== SYSTEM_ROLES.USER &&
    payload.role !== "USER"
  ) {
    errors.role = "Role must be USER.";
  }

  const grantableIds = getGrantableIds(currentAdmin);
  const permissions = uniqueValues(payload.permissions);
  const invalidPermissions = permissions.filter(
    (permission) =>
      !grantableIds.has(permission) ||
      !USER_PERMISSION_OPTIONS.some((option) => option.id === permission)
  );

  if (invalidPermissions.length > 0) {
    errors.permissions =
      `You cannot grant these permissions: ${invalidPermissions.join(", ")}.`;
  }

  if (permissions.length === 0) {
    errors.permissions = "Select at least one User permission.";
  }

  const scopeResult = validateScopeForAdmin(currentAdmin, payload);

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
      temporaryPassword: password,
      permissions,
      scope: scopeResult.scope,
    },
  };
};

const calculateUserTotals = (user) => {
  const floorCount = uniqueValues(user?.assignedFloorIds).length;
  const zoneCount = uniqueValues(user?.assignedZoneIds).length;
  const clientCount = uniqueValues(user?.assignedClientIds).length;
  const consumption =
    zoneCount * 145 + floorCount * 110 + clientCount * 35;

  return {
    consumption,
    charges: consumption * 8.5,
  };
};

const enrichUser = (user) => {
  const normalizedUser = normalizeUserRecord(user);
  const totals = calculateUserTotals(normalizedUser);

  return {
    ...withoutPassword(normalizedUser),
    consumption: Number(normalizedUser.consumption || totals.consumption),
    charges: Number(normalizedUser.charges || totals.charges),
    scopeLabels: getScopeLabels(normalizedUser),
  };
};

const saveUserList = (users) => {
  saveUsers(users.map(normalizeUserRecord));
  return getUsers();
};

export const getUsersForAdmin = (
  adminId,
  { includeDeleted = true } = {}
) =>
  getUsers()
    .map(normalizeUserRecord)
    .filter(
      (user) =>
        String(user.createdBy) === String(adminId) &&
        (includeDeleted || !isDeleted(user))
    )
    .map(enrichUser);

export const getUserByIdForAdmin = (adminId, userId) => {
  const user =
    getUsers()
      .map(normalizeUserRecord)
      .find(
        (item) =>
          String(item.id) === String(userId) &&
          String(item.createdBy) === String(adminId)
      ) || null;

  return user ? enrichUser(user) : null;
};

export const createUser = (currentAdmin, payload) => {
  if (!hasAdminPermission(currentAdmin, ADMIN_PERMISSIONS.USER_CREATE)) {
    return {
      success: false,
      message: "This Admin cannot create Users.",
      errors: {},
    };
  }

  const validation = validateUserPayload(currentAdmin, payload, {
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
  const totals = calculateUserTotals(validation.normalized.scope);
  const user = {
    id: createId("user"),
    name: validation.normalized.name,
    email: validation.normalized.email,
    password: validation.normalized.temporaryPassword,
    temporaryPassword: validation.normalized.temporaryPassword,
    role: SYSTEM_ROLES.USER,
    systemRole: SYSTEM_ROLES.USER,
    adminId: currentAdmin.id,
    createdBy: currentAdmin.id,
    addedBy: currentAdmin.email || currentAdmin.adminEmail,
    companyName: currentAdmin.companyName || "",
    buildingName: currentAdmin.buildingName || "",
    designation: payload.designation || "VIEWER",
    accessType: payload.accessType || "BUILDING",
    accessName: payload.accessName || "",
    isActive: payload.isActive !== false,
    status: payload.isActive === false ? "INACTIVE" : "ACTIVE",
    disabledAt: payload.isActive === false ? createdAt : null,
    isDeleted: false,
    deletedAt: null,
    mustChangePassword: Boolean(payload.mustChangePassword),
    permissions: validation.normalized.permissions,
    ...validation.normalized.scope,
    consumption: totals.consumption,
    charges: totals.charges,
    createdAt,
    updatedAt: createdAt,
    lastLoginAt: null,
  };

  saveUserList([...getUsers(), user]);

  return {
    success: true,
    user: enrichUser(user),
  };
};

export const updateUser = (currentAdmin, userId, payload) => {
  if (!hasAdminPermission(currentAdmin, ADMIN_PERMISSIONS.USER_EDIT)) {
    return {
      success: false,
      message: "This Admin cannot edit Users.",
      errors: {},
    };
  }

  const existing = getUsers()
    .map(normalizeUserRecord)
    .find((user) => String(user.id) === String(userId));

  if (!ownsUser(currentAdmin, existing)) {
    return {
      success: false,
      message: "You do not have access to this User.",
      errors: {},
    };
  }

  const validation = validateUserPayload(currentAdmin, payload, {
    mode: "update",
    userId,
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please correct the highlighted fields.",
    };
  }

  let updatedUser = null;
  const updatedAt = new Date().toISOString();

  const users = getUsers().map((user) => {
    const normalizedUser = normalizeUserRecord(user);

    if (String(normalizedUser.id) !== String(userId)) {
      return normalizedUser;
    }

    const totals = calculateUserTotals(validation.normalized.scope);

    updatedUser = {
      ...normalizedUser,
      name: validation.normalized.name,
      email: validation.normalized.email,
      isActive: payload.isActive !== false,
      status: payload.isActive === false ? "INACTIVE" : "ACTIVE",
      disabledAt:
        payload.isActive === false
          ? normalizedUser.disabledAt || updatedAt
          : null,
      mustChangePassword: Boolean(payload.mustChangePassword),
      permissions: validation.normalized.permissions,
      ...validation.normalized.scope,
      consumption: totals.consumption,
      charges: totals.charges,
      updatedAt,
    };

    if (validation.normalized.temporaryPassword) {
      updatedUser.password = validation.normalized.temporaryPassword;
      updatedUser.temporaryPassword =
        validation.normalized.temporaryPassword;
      updatedUser.passwordResetAt = updatedAt;
    }

    return updatedUser;
  });

  saveUserList(users);

  return {
    success: true,
    user: enrichUser(updatedUser),
  };
};

export const setUserStatus = (currentAdmin, userId, shouldBeActive) => {
  if (
    !hasAdminPermission(
      currentAdmin,
      ADMIN_PERMISSIONS.USER_ENABLE_DISABLE
    )
  ) {
    return {
      success: false,
      message: "This Admin cannot enable or disable Users.",
    };
  }

  let updatedUser = null;
  const updatedAt = new Date().toISOString();

  const users = getUsers().map((user) => {
    const normalizedUser = normalizeUserRecord(user);

    if (String(normalizedUser.id) !== String(userId)) {
      return normalizedUser;
    }

    if (!ownsUser(currentAdmin, normalizedUser)) {
      return normalizedUser;
    }

    if (isDeleted(normalizedUser) && shouldBeActive) {
      updatedUser = normalizedUser;
      return normalizedUser;
    }

    updatedUser = {
      ...normalizedUser,
      isActive: Boolean(shouldBeActive),
      status: shouldBeActive ? "ACTIVE" : "INACTIVE",
      disabledAt: shouldBeActive ? null : updatedAt,
      updatedAt,
    };

    return updatedUser;
  });

  saveUserList(users);

  if (updatedUser && isDeleted(updatedUser) && shouldBeActive) {
    return {
      success: false,
      message: "Restore the User before enabling the account.",
    };
  }

  return {
    success: Boolean(updatedUser),
    user: updatedUser ? enrichUser(updatedUser) : null,
  };
};

export const softDeleteUser = (currentAdmin, userId) => {
  if (!hasAdminPermission(currentAdmin, ADMIN_PERMISSIONS.USER_DELETE)) {
    return {
      success: false,
      message: "This Admin cannot delete Users.",
    };
  }

  let updatedUser = null;
  const updatedAt = new Date().toISOString();

  const users = getUsers().map((user) => {
    const normalizedUser = normalizeUserRecord(user);

    if (
      String(normalizedUser.id) !== String(userId) ||
      !ownsUser(currentAdmin, normalizedUser)
    ) {
      return normalizedUser;
    }

    updatedUser = {
      ...normalizedUser,
      isActive: false,
      status: "DELETED",
      isDeleted: true,
      disabledAt: normalizedUser.disabledAt || updatedAt,
      deletedAt: updatedAt,
      updatedAt,
    };

    return updatedUser;
  });

  saveUserList(users);

  return {
    success: Boolean(updatedUser),
    user: updatedUser ? enrichUser(updatedUser) : null,
  };
};

export const restoreUser = (currentAdmin, userId) => {
  if (!hasAdminPermission(currentAdmin, ADMIN_PERMISSIONS.USER_DELETE)) {
    return {
      success: false,
      message: "This Admin cannot restore Users.",
    };
  }

  let updatedUser = null;
  const updatedAt = new Date().toISOString();

  const users = getUsers().map((user) => {
    const normalizedUser = normalizeUserRecord(user);

    if (
      String(normalizedUser.id) !== String(userId) ||
      !ownsUser(currentAdmin, normalizedUser)
    ) {
      return normalizedUser;
    }

    updatedUser = {
      ...normalizedUser,
      isDeleted: false,
      deletedAt: null,
      isActive: false,
      status: "INACTIVE",
      disabledAt: normalizedUser.disabledAt || updatedAt,
      updatedAt,
    };

    return updatedUser;
  });

  saveUserList(users);

  return {
    success: Boolean(updatedUser),
    user: updatedUser ? enrichUser(updatedUser) : null,
  };
};

const generateTemporaryPassword = () => {
  const randomPart =
    globalThis.crypto?.randomUUID?.().slice(0, 8) ||
    Math.random().toString(36).slice(2, 10);

  return `User@${randomPart}`;
};

export const resetUserPassword = (currentAdmin, userId) => {
  if (
    !hasAdminPermission(
      currentAdmin,
      ADMIN_PERMISSIONS.USER_PASSWORD_RESET
    )
  ) {
    return {
      success: false,
      message: "This Admin cannot reset User passwords.",
    };
  }

  let updatedUser = null;
  const temporaryPassword = generateTemporaryPassword();
  const updatedAt = new Date().toISOString();

  const users = getUsers().map((user) => {
    const normalizedUser = normalizeUserRecord(user);

    if (
      String(normalizedUser.id) !== String(userId) ||
      !ownsUser(currentAdmin, normalizedUser)
    ) {
      return normalizedUser;
    }

    updatedUser = {
      ...normalizedUser,
      password: temporaryPassword,
      temporaryPassword,
      mustChangePassword: true,
      passwordResetAt: updatedAt,
      updatedAt,
    };

    return updatedUser;
  });

  saveUserList(users);

  return {
    success: Boolean(updatedUser),
    user: updatedUser ? enrichUser(updatedUser) : null,
    temporaryPassword,
  };
};

export const getUserSummary = (currentAdmin, userId) => {
  const user = getUserByIdForAdmin(currentAdmin?.id, userId);

  if (!user) {
    return null;
  }

  return {
    consumption: user.consumption,
    charges: user.charges,
  };
};

export const getAdminDashboardSummary = (currentAdmin) => {
  const users = getUsersForAdmin(currentAdmin?.id, {
    includeDeleted: true,
  });
  const activeUsers = users.filter(isActive);
  const deletedUsers = users.filter(isDeleted);
  const disabledUsers = users.filter(
    (user) => !isActive(user) && !isDeleted(user)
  );

  return {
    totalUsers: users.length,
    activeUsers: activeUsers.length,
    disabledUsers: disabledUsers.length,
    deletedUsers: deletedUsers.length,
    assignedClients: uniqueValues(currentAdmin?.assignedClientIds).length,
    assignedBlocks: uniqueValues(currentAdmin?.assignedBlockIds).length,
    assignedFloors: uniqueValues(currentAdmin?.assignedFloorIds).length,
    scopedConsumption: users.reduce(
      (sum, user) => sum + Number(user.consumption || 0),
      0
    ),
    scopedCharges: users.reduce(
      (sum, user) => sum + Number(user.charges || 0),
      0
    ),
  };
};

export const getUserFormOptions = (currentAdmin, scope = {}) =>
  getAllowedScopeOptions(currentAdmin, scope);

export { isActive, isDeleted };
