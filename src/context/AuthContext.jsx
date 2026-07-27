import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  authenticateAccount,
  getCurrentAccount,
  logout as logoutAccount,
} from "../services/authService";
import { SYSTEM_ROLES } from "../data/permissionOptions";
import { initializeMockData } from "../services/storageService";
import {
  canAccessBlock,
  canAccessBuilding,
  canAccessClient,
  canAccessFloor,
  canAccessSystem,
  hasPermission as accountHasPermission,
} from "../utils/accessControl";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const refreshSession = useCallback(() => {
    initializeMockData();
    const account = getCurrentAccount();
    setCurrentUser(account);
    return account;
  }, []);

  useEffect(() => {
    refreshSession();
    setIsInitializing(false);
  }, [refreshSession]);

  const login = useCallback(
    (email, password) => {
      const result = authenticateAccount(email, password);

      if (result.success) {
        refreshSession();
      }

      return result;
    },
    [refreshSession]
  );

  const logout = useCallback(() => {
    logoutAccount();
    setCurrentUser(null);
  }, []);

  const hasRole = useCallback(
    (roleOrRoles) => {
      if (!currentUser) {
        return false;
      }

      const roles = Array.isArray(roleOrRoles)
        ? roleOrRoles
        : [roleOrRoles];

      return roles.includes(currentUser.systemRole);
    },
    [currentUser]
  );

  const hasPermission = useCallback(
    (permission) => {
      if (!currentUser) {
        return false;
      }

      return accountHasPermission(currentUser, permission);
    },
    [currentUser]
  );

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isInitializing,
      login,
      logout,
      refreshSession,
      hasRole,
      hasPermission,
      canAccessClient: (clientId) =>
        canAccessClient(currentUser, clientId),
      canAccessBuilding: (buildingId) =>
        canAccessBuilding(currentUser, buildingId),
      canAccessBlock: (blockId) =>
        canAccessBlock(currentUser, blockId),
      canAccessFloor: (floorId) =>
        canAccessFloor(currentUser, floorId),
      canAccessSystem: (systemId) =>
        canAccessSystem(currentUser, systemId),
    }),
    [
      currentUser,
      hasPermission,
      hasRole,
      isInitializing,
      login,
      logout,
      refreshSession,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
};
