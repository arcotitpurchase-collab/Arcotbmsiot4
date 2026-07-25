// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainOverview from "./pages/MainOverview";
// import BuildingOverview from "./pages/BuildingOverview";
// import FloorOverview from "./pages/FloorOverview";
// import ClientOverview from "./pages/ClientOverview";
// import OverviewPage from "./pages/OverviewPage";

// export default function App() {
//   return (
//     <BrowserRouter >
//       <Routes>
//         <Route path="/" element={<MainOverview />} />
//         <Route path="/building/:buildingId" element={<BuildingOverview />} />
//         <Route path="/building/:buildingId/floor/:floorId" element={<FloorOverview />} />
//         <Route path="/building/:buildingId/floor/:floorId/client/:clientId" element={<ClientOverview />} />

//         <Route path="/overview" element={<OverviewPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";

// import MainOverview from "./pages/MainOverview";
// import BuildingOverview from "./pages/BuildingOverview";
// import FloorOverview from "./pages/FloorOverview";
// import ClientOverview from "./pages/ClientOverview";
// import OverviewPage from "./pages/OverviewPage";
// import AuthPage from "./pages/AuthPage";
// import SuperAdmin from "./SuperAdmin";
// import ClientAdmin from "./AdminDashboard";
// import AdminLogin from "./AdminLogin";
// import AdminDashboard from "./AdminDashboard";

// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem("bmsLoggedIn") === "true";
//   return isLoggedIn ? children : <Navigate to="/auth" replace />;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/auth" element={<AuthPage />} />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <MainOverview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/building/:buildingId"
//           element={
//             <ProtectedRoute>
//               <BuildingOverview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/building/:buildingId/floor/:floorId"
//           element={
//             <ProtectedRoute>
//               <FloorOverview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/building/:buildingId/floor/:floorId/client/:clientId"
//           element={
//             <ProtectedRoute>
//               <ClientOverview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/overview"
//           element={
//             <ProtectedRoute>
//               <OverviewPage />
//             </ProtectedRoute>
//           }
//         />

 
// <Route path="/admin/superadmin" element={<SuperAdmin />} />
// <Route path="/admin/login" element={<AdminLogin />} />
// <Route path="/admin/dashboard" element={<AdminDashboard />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }






import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import MainOverview from "./pages/MainOverview";
import BuildingOverview from "./pages/BuildingOverview";
import FloorOverview from "./pages/FloorOverview";
import ClientOverview from "./pages/ClientOverview";
import OverviewPage from "./pages/OverviewPage";
import AuthPage from "./pages/AuthPage";

import SuperAdmin from "./SuperAdmin";
import AdminDashboard from "./AdminDashboard";

import {
  SYSTEM_ROLES,
  tempApi,
} from "./tempAdminApi";

function RoleProtectedRoute({
  allowedRoles,
  children,
}) {
  const location = useLocation();

  const session = tempApi.getSession();
  const currentAccount = tempApi.getCurrentAccount();

  if (!session || !currentAccount) {
    tempApi.logout();

    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (
    !allowedRoles.includes(currentAccount.systemRole)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    String(currentAccount.status).toUpperCase() !==
    "ACTIVE"
  ) {
    tempApi.logout();

    return (
      <Navigate
        to="/auth"
        replace
        state={{
          accountDisabled: true,
        }}
      />
    );
  }

  return children;
}

function UserPermissionRoute({
  permission,
  children,
}) {
  const location = useLocation();

  const currentUser = tempApi.getCurrentUser();

  if (!currentUser) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  const hasPermission =
    currentUser.permissions?.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function DefaultRoute() {
  const currentAccount = tempApi.getCurrentAccount();

  if (!currentAccount) {
    return <Navigate to="/auth" replace />;
  }

  const roleRoutes = {
    [SYSTEM_ROLES.SUPER_ADMIN]: "/super-admin",
    [SYSTEM_ROLES.ADMIN]: "/admin/dashboard",
    [SYSTEM_ROLES.USER]: "/dashboard",
  };

  const targetRoute =
    roleRoutes[currentAccount.systemRole];

  return (
    <Navigate
      to={targetRoute || "/unauthorized"}
      replace
    />
  );
}

function UnauthorizedPage() {
  const currentAccount = tempApi.getCurrentAccount();

  const handleGoBack = () => {
    if (!currentAccount) {
      window.location.href = "/auth";
      return;
    }

    const roleRoutes = {
      [SYSTEM_ROLES.SUPER_ADMIN]: "/super-admin",
      [SYSTEM_ROLES.ADMIN]: "/admin/dashboard",
      [SYSTEM_ROLES.USER]: "/dashboard",
    };

    window.location.href =
      roleRoutes[currentAccount.systemRole] ||
      "/auth";
  };

  const handleLogout = () => {
    tempApi.logout();
    window.location.href = "/auth";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020B24] p-6 text-white">
      <section className="w-full max-w-lg border border-white/10 bg-white/[0.06] p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-red-300">
          Access restricted
        </p>

        <h1 className="mt-3 text-2xl font-semibold">
          You do not have permission to open this page
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          This page is not available for your current
          account role or assigned permissions.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleGoBack}
            className="border border-cyan-400 bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#020B24]"
          >
            Go to Dashboard
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020B24] p-6 text-white">
      <section className="w-full max-w-lg border border-white/10 bg-white/[0.06] p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">
          404 error
        </p>

        <h1 className="mt-3 text-2xl font-semibold">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          The requested application page does not exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-block border border-cyan-400 bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#020B24]"
        >
          Return to Application
        </a>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/"
          element={<DefaultRoute />}
        />

        <Route
          path="/super-admin"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.SUPER_ADMIN,
              ]}
            >
              <SuperAdmin />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.ADMIN,
              ]}
            >
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.USER,
              ]}
            >
              <MainOverview />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.USER,
              ]}
            >
              <UserPermissionRoute permission="view_dashboard">
                <BuildingOverview />
              </UserPermissionRoute>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId/floor/:floorId"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.USER,
              ]}
            >
              <UserPermissionRoute permission="view_dashboard">
                <FloorOverview />
              </UserPermissionRoute>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId/floor/:floorId/client/:clientId"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.USER,
              ]}
            >
              <UserPermissionRoute permission="view_dashboard">
                <ClientOverview />
              </UserPermissionRoute>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/overview"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                SYSTEM_ROLES.USER,
              ]}
            >
              <UserPermissionRoute permission="view_reports">
                <OverviewPage />
              </UserPermissionRoute>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}