// import React from "react";
// import {
//   tempApi,
//   ADDONS,
//   PERMISSIONS,
//   calculateAdminBill,
// } from "./tempAdminApi";

// const AdminDashboard = () => {
//   const [data, setData] = React.useState(tempApi.getData);
//   const currentAdmin = tempApi.getCurrentAdmin();

//   const [userForm, setUserForm] = React.useState({
//     name: "",
//     email: "",
//     role: "Viewer",
//     accessType: "Building",
//     accessName: "",
//     permissions: ["view_dashboard"],
//   });

//   if (!currentAdmin) {
//     return (
//       <div className="min-h-screen bg-[#020B24] text-white p-6">
//         <div className="border border-white/10 bg-white/[0.06] p-8 text-center">
//           Please login first.
//         </div>
//       </div>
//     );
//   }

//   const adminUsers = data.users.filter(
//     (user) => user.adminId === currentAdmin.id
//   );

//   const bill = calculateAdminBill(currentAdmin, data.users);

//   const addUser = () => {
//     if (!userForm.name || !userForm.email) return;

//     const updated = tempApi.createUser(currentAdmin.id, {
//       ...userForm,
//       addedBy: currentAdmin.adminEmail,
//     });

//     setData(updated);

//     setUserForm({
//       name: "",
//       email: "",
//       role: "Viewer",
//       accessType: "Building",
//       accessName: "",
//       permissions: ["view_dashboard"],
//     });
//   };

//   const togglePermission = (permission) => {
//     setUserForm((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((item) => item !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

//   const toggleAddon = (addonKey) => {
//     const updated = tempApi.updateAdmin(currentAdmin.id, (admin) => ({
//       ...admin,
//       addons: admin.addons.includes(addonKey)
//         ? admin.addons.filter((item) => item !== addonKey)
//         : [...admin.addons, addonKey],
//     }));

//     setData(updated);
//   };

//   const updateCloud = (field, value) => {
//     const updated = tempApi.updateAdmin(currentAdmin.id, (admin) => ({
//       ...admin,
//       cloudUsage: {
//         ...admin.cloudUsage,
//         [field]: Number(value),
//       },
//     }));

//     setData(updated);
//   };

//   const logout = () => {
//     tempApi.logoutAdmin();
//     window.location.href = "/admin/login";
//   };

//   return (
//     <div className="min-h-screen bg-[#020B24] text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="border border-white/10 bg-white/[0.06] p-5 mb-5 flex justify-between">
//           <div>
//             <p className="text-[11px] text-cyan-300 tracking-[0.2em]">
//               ADMIN DASHBOARD
//             </p>
//             <h1 className="text-2xl font-semibold mt-1">
//               User Access & Dashboard Permissions
//             </h1>
//             <p className="text-sm text-blue-200 mt-1">
//               {currentAdmin.companyName} · {currentAdmin.buildingName}
//             </p>
//           </div>

//           <button
//             onClick={logout}
//             className="border border-red-400/40 text-red-300 px-4 py-2 text-sm h-fit"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid grid-cols-4 gap-4 mb-5">
//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <p className="text-[11px] text-slate-400">Company</p>
//             <h3 className="text-[22px] font-semibold mt-2">
//               {currentAdmin.companyName}
//             </h3>
//           </div>

//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <p className="text-[11px] text-slate-400">Users Added</p>
//             <h3 className="text-[22px] font-semibold mt-2">
//               {adminUsers.length}
//             </h3>
//           </div>

//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <p className="text-[11px] text-slate-400">Cloud Charge</p>
//             <h3 className="text-[22px] font-semibold mt-2 text-cyan-300">
//               ₹{bill.total}
//             </h3>
//           </div>

//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <p className="text-[11px] text-slate-400">Admin</p>
//             <h3 className="text-[22px] font-semibold mt-2">
//               {currentAdmin.adminName || "-"}
//             </h3>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-5">
//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <h2 className="text-[16px] font-semibold mb-4">
//               Add Dashboard User
//             </h2>

//             <input
//               value={userForm.name}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, name: e.target.value })
//               }
//               placeholder="User Name"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <input
//               value={userForm.email}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, email: e.target.value })
//               }
//               placeholder="User Email"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <div className="grid grid-cols-3 gap-3 mb-4">
//               <select
//                 value={userForm.role}
//                 onChange={(e) =>
//                   setUserForm({ ...userForm, role: e.target.value })
//                 }
//                 className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//               >
//                 <option>Engineer</option>
//                 <option>Operator</option>
//                 <option>Viewer</option>
//               </select>

//               <select
//                 value={userForm.accessType}
//                 onChange={(e) =>
//                   setUserForm({ ...userForm, accessType: e.target.value })
//                 }
//                 className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//               >
//                 <option>Building</option>
//                 <option>Floor</option>
//                 <option>Client</option>
//                 <option>Equipment</option>
//               </select>

//               <input
//                 value={userForm.accessName}
//                 onChange={(e) =>
//                   setUserForm({ ...userForm, accessName: e.target.value })
//                 }
//                 placeholder="Ex: Floor 5 / Client A"
//                 className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-2 mb-4">
//               {PERMISSIONS.map((permission) => (
//                 <button
//                   type="button"
//                   key={permission}
//                   onClick={() => togglePermission(permission)}
//                   className={`border px-3 py-2 text-xs text-left ${
//                     userForm.permissions.includes(permission)
//                       ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
//                       : "border-white/10 bg-[#06184A] text-blue-100"
//                   }`}
//                 >
//                   {userForm.permissions.includes(permission) ? "✅ " : "⬜ "}
//                   {permission}
//                 </button>
//               ))}
//             </div>

//             <button
//               onClick={addUser}
//               className="w-full bg-cyan-400 text-[#020B24] py-2 text-sm font-semibold"
//             >
//               Add User
//             </button>
//           </div>

//           <div className="border border-white/10 bg-white/[0.06] p-5">
//             <h2 className="text-[16px] font-semibold mb-4">
//               Add-ons & Cloud Usage
//             </h2>

//             <div className="grid grid-cols-2 gap-3 mb-5">
//               {ADDONS.map((addon) => (
//                 <button
//                   type="button"
//                   key={addon.key}
//                   onClick={() => toggleAddon(addon.key)}
//                   className={`border px-3 py-2 text-sm text-left ${
//                     currentAdmin.addons.includes(addon.key)
//                       ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
//                       : "border-white/10 bg-[#06184A] text-blue-100"
//                   }`}
//                 >
//                   {currentAdmin.addons.includes(addon.key) ? "✅ " : "⬜ "}
//                   {addon.name} · ₹{addon.price}
//                 </button>
//               ))}
//             </div>

//             <div className="grid grid-cols-4 gap-3">
//               {[
//                 ["storageGB", "Storage GB"],
//                 ["apiCalls", "API Calls"],
//                 ["devices", "Devices"],
//                 ["dataTransferGB", "Data GB"],
//               ].map(([field, label]) => (
//                 <div key={field}>
//                   <label className="text-[11px] text-slate-400">{label}</label>
//                   <input
//                     type="number"
//                     value={currentAdmin.cloudUsage?.[field] || 0}
//                     onChange={(e) => updateCloud(field, e.target.value)}
//                     className="w-full mt-1 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="border border-white/10 bg-white/[0.06] p-5 mt-5 overflow-x-auto">
//           <h2 className="text-[16px] font-semibold mb-4">
//             Users Added by This Admin
//           </h2>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-white/10 text-slate-400">
//                 {[
//                   "Name",
//                   "Email",
//                   "Role",
//                   "Access Type",
//                   "Access Name",
//                   "Added By",
//                   "Permissions",
//                 ].map((head) => (
//                   <th key={head} className="py-3 text-left font-medium">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {adminUsers.map((user) => (
//                 <tr key={user.id} className="border-b border-white/5">
//                   <td className="py-3">{user.name}</td>
//                   <td className="py-3 text-blue-200">{user.email}</td>
//                   <td className="py-3">{user.role}</td>
//                   <td className="py-3">{user.accessType || "-"}</td>
//                   <td className="py-3">{user.accessName || "-"}</td>
//                   <td className="py-3 text-cyan-300">{user.addedBy}</td>
//                   <td className="py-3 text-[11px] text-slate-300">
//                     {user.permissions?.join(", ")}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {adminUsers.length === 0 && (
//             <p className="text-sm text-slate-400 mt-4">No users added yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;













import React from "react";
import {
  ADDONS,
  PERMISSIONS,
  USER_DESIGNATIONS,
  ACCESS_TYPES,
  calculateAdminBill,
  tempApi,
} from "./tempAdminApi";

const initialUserForm = {
  name: "",
  email: "",
  password: "",
  designation: "VIEWER",
  accessType: "BUILDING",
  accessName: "",
  permissions: ["view_dashboard"],
  status: "ACTIVE",
};

const permissionLabels = {
  view_dashboard: "View Dashboard",
  view_source: "View Source",
  view_feeder: "View Feeder",
  view_transformer: "View Transformer",
  view_reports: "View Reports",
  download_reports: "Download Reports",
  acknowledge_alarms: "Acknowledge Alarms",
};

const accessTypeLabels = {
  BUILDING: "Building",
  FLOOR: "Floor",
  CLIENT: "Client",
  EQUIPMENT: "Equipment",
};

const designationLabels = {
  ENGINEER: "Engineer",
  OPERATOR: "Operator",
  VIEWER: "Viewer",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(
    Number(value || 0)
  );

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const SummaryCard = ({
  title,
  value,
  description,
  accent = false,
}) => (
  <article
    className={`
      min-w-0 border p-4
      ${
        accent
          ? "border-cyan-400/40 bg-cyan-400/[0.08]"
          : "border-white/10 bg-white/[0.05]"
      }
    `}
  >
    <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {title}
    </p>

    <p
      className={`
        mt-2 truncate text-[22px] font-semibold
        ${accent ? "text-cyan-300" : "text-white"}
      `}
    >
      {value}
    </p>

    {description && (
      <p className="mt-1 truncate text-[11px] text-slate-500">
        {description}
      </p>
    )}
  </article>
);

const StatusBadge = ({ status }) => {
  const isActive =
    String(status).toUpperCase() === "ACTIVE";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 border px-2 py-1
        text-[10px] font-semibold uppercase tracking-[0.1em]
        ${
          isActive
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-red-400/30 bg-red-400/10 text-red-300"
        }
      `}
    >
      <span
        className={`
          h-1.5 w-1.5 rounded-full
          ${isActive ? "bg-emerald-300" : "bg-red-300"}
        `}
      />

      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
      {label}
    </span>

    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="
        h-10 w-full border border-white/10
        bg-[#06184A] px-3 text-sm text-white
        outline-none transition
        placeholder:text-slate-500
        focus:border-cyan-400
        focus:ring-1 focus:ring-cyan-400/30
      "
    />
  </label>
);

export default function AdminDashboard() {
  const sessionAdmin = tempApi.getCurrentAdmin();

  const [data, setData] = React.useState(() =>
    tempApi.getData()
  );

  const [userForm, setUserForm] =
    React.useState(initialUserForm);

  const [formError, setFormError] =
    React.useState("");

  const [formSuccess, setFormSuccess] =
    React.useState("");

  const [isCreatingUser, setIsCreatingUser] =
    React.useState(false);

  const [selectedUserId, setSelectedUserId] =
    React.useState(null);

  const currentAdmin = React.useMemo(() => {
    if (!sessionAdmin) {
      return null;
    }

    return (
      data.admins.find(
        (admin) =>
          String(admin.id) ===
          String(sessionAdmin.id)
      ) || null
    );
  }, [data.admins, sessionAdmin]);

  if (!currentAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020B24] p-6 text-white">
        <section className="w-full max-w-lg border border-red-400/30 bg-red-400/[0.06] p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
            Invalid session
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Admin access is required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Please sign in using an active Admin
            account.
          </p>

          <button
            type="button"
            onClick={() => {
              tempApi.logout();
              window.location.href = "/auth";
            }}
            className="mt-6 border border-cyan-400 bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#020B24]"
          >
            Go to Login
          </button>
        </section>
      </main>
    );
  }

  const adminUsers = data.users.filter(
    (user) =>
      String(user.adminId) ===
      String(currentAdmin.id)
  );

  const activeUsers = adminUsers.filter(
    (user) =>
      String(user.status).toUpperCase() ===
      "ACTIVE"
  );

  const bill = calculateAdminBill(
    currentAdmin,
    data.users
  );

  const selectedUser =
    adminUsers.find(
      (user) =>
        String(user.id) ===
        String(selectedUserId)
    ) || null;

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;

    setUserForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
    setFormSuccess("");
  };

  const togglePermission = (permission) => {
    setUserForm((previous) => {
      const alreadySelected =
        previous.permissions.includes(permission);

      let nextPermissions = alreadySelected
        ? previous.permissions.filter(
            (item) => item !== permission
          )
        : [...previous.permissions, permission];

      if (
        permission === "view_dashboard" &&
        alreadySelected
      ) {
        nextPermissions = [
          "view_dashboard",
          ...nextPermissions.filter(
            (item) => item !== "view_dashboard"
          ),
        ];
      }

      return {
        ...previous,
        permissions: nextPermissions,
      };
    });

    setFormError("");
    setFormSuccess("");
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (
      !userForm.name.trim() ||
      !userForm.email.trim() ||
      !userForm.password.trim()
    ) {
      setFormError(
        "User name, email and password are required."
      );
      return;
    }

    if (userForm.permissions.length === 0) {
      setFormError(
        "Select at least one dashboard permission."
      );
      return;
    }

    setIsCreatingUser(true);
    setFormError("");
    setFormSuccess("");

    try {
      const result = tempApi.createUser(
        currentAdmin.id,
        {
          ...userForm,
          addedBy:
            currentAdmin.adminEmail ||
            currentAdmin.email,
        }
      );

      if (!result.success) {
        setFormError(
          result.message ||
            "Unable to create User."
        );
        return;
      }

      let updatedData = result.data;

      if (userForm.status === "INACTIVE") {
        const statusResult =
          tempApi.setUserStatus(
            result.user.id,
            "INACTIVE"
          );

        updatedData = statusResult.data;
      }

      setData(updatedData);
      setUserForm(initialUserForm);
      setFormSuccess(
        "User account created successfully."
      );
    } catch (error) {
      console.error(
        "User creation failed:",
        error
      );

      setFormError(
        "Unable to create User. Please try again."
      );
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleToggleAddon = (addonKey) => {
    const result = tempApi.updateAdmin(
      currentAdmin.id,
      (admin) => {
        const currentAddons = Array.isArray(
          admin.addons
        )
          ? admin.addons
          : [];

        return {
          ...admin,
          addons: currentAddons.includes(
            addonKey
          )
            ? currentAddons.filter(
                (item) => item !== addonKey
              )
            : [...currentAddons, addonKey],
        };
      }
    );

    if (result.success) {
      setData(result.data);
    }
  };

  const handleUpdateCloud = (
    field,
    rawValue
  ) => {
    const safeValue = Math.max(
      0,
      Number(rawValue || 0)
    );

    const result = tempApi.updateAdmin(
      currentAdmin.id,
      (admin) => ({
        ...admin,
        cloudUsage: {
          ...admin.cloudUsage,
          [field]: safeValue,
        },
      })
    );

    if (result.success) {
      setData(result.data);
    }
  };

  const handleToggleUserStatus = (user) => {
    const nextStatus =
      String(user.status).toUpperCase() ===
      "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    const result = tempApi.setUserStatus(
      user.id,
      nextStatus
    );

    if (result.success) {
      setData(result.data);
    }
  };

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm(
      `Delete the User account for ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    const result = tempApi.deleteUser(user.id);

    if (result.success) {
      setData(result.data);

      if (
        String(selectedUserId) ===
        String(user.id)
      ) {
        setSelectedUserId(null);
      }
    }
  };

  const handleLogout = () => {
    tempApi.logout();
    window.location.href = "/auth";
  };

  return (
    <main className="min-h-screen bg-[#020B24] p-4 text-white sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-5 border border-white/10 bg-white/[0.05] px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                ARCOT IIoT · Admin
              </p>

              <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
                User Access and Dashboard Control
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                {currentAdmin.companyName}
                {currentAdmin.buildingName
                  ? ` · ${currentAdmin.buildingName}`
                  : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="border border-white/10 bg-[#06184A] px-4 py-2">
                <p className="text-[9px] uppercase tracking-[0.13em] text-slate-500">
                  Signed in as
                </p>

                <p className="mt-0.5 text-sm font-medium text-cyan-200">
                  {currentAdmin.adminName ||
                    currentAdmin.name}
                </p>
              </div>

              <StatusBadge
                status={currentAdmin.status}
              />

              <button
                type="button"
                onClick={handleLogout}
                className="
                  h-10 border border-red-400/40
                  px-5 text-xs font-semibold
                  text-red-300 transition
                  hover:bg-red-400/10
                "
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <SummaryCard
            title="Company"
            value={currentAdmin.companyName}
            description="Assigned client"
          />

          <SummaryCard
            title="Building"
            value={
              currentAdmin.buildingName || "-"
            }
            description="Assigned property"
          />

          <SummaryCard
            title="Total Users"
            value={adminUsers.length}
            description={`${activeUsers.length} active`}
          />

          <SummaryCard
            title="Devices"
            value={formatNumber(
              currentAdmin.cloudUsage?.devices
            )}
            description="Configured devices"
          />

          <SummaryCard
            title="Active Add-ons"
            value={
              currentAdmin.addons?.length || 0
            }
            description="Enabled modules"
          />

          <SummaryCard
            title="Monthly Charge"
            value={formatCurrency(bill.total)}
            description="Estimated cloud bill"
            accent
          />
        </section>

        <section className="grid items-start gap-5 xl:grid-cols-[430px_minmax(0,1fr)]">
          <form
            onSubmit={handleCreateUser}
            className="border border-white/10 bg-white/[0.05] p-5"
          >
            <div className="border-b border-white/10 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                User provisioning
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Create Dashboard User
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Create a User account and assign the
                required operational access.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <Field
                label="User name"
                name="name"
                value={userForm.name}
                onChange={handleUserFormChange}
                placeholder="Full name"
                autoComplete="name"
              />

              <Field
                label="User email"
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                placeholder="user@company.com"
                type="email"
                autoComplete="email"
              />

              <Field
                label="Temporary password"
                name="password"
                value={userForm.password}
                onChange={handleUserFormChange}
                placeholder="Create password"
                type="password"
                autoComplete="new-password"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                    Designation
                  </span>

                  <select
                    name="designation"
                    value={userForm.designation}
                    onChange={handleUserFormChange}
                    className="
                      h-10 w-full border
                      border-white/10 bg-[#06184A]
                      px-3 text-sm text-white
                      outline-none focus:border-cyan-400
                    "
                  >
                    {USER_DESIGNATIONS.map(
                      (designation) => (
                        <option
                          key={designation}
                          value={designation}
                        >
                          {designationLabels[
                            designation
                          ] || designation}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                    Account status
                  </span>

                  <select
                    name="status"
                    value={userForm.status}
                    onChange={handleUserFormChange}
                    className="
                      h-10 w-full border
                      border-white/10 bg-[#06184A]
                      px-3 text-sm text-white
                      outline-none focus:border-cyan-400
                    "
                  >
                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="INACTIVE">
                      Inactive
                    </option>
                  </select>
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                    Access type
                  </span>

                  <select
                    name="accessType"
                    value={userForm.accessType}
                    onChange={handleUserFormChange}
                    className="
                      h-10 w-full border
                      border-white/10 bg-[#06184A]
                      px-3 text-sm text-white
                      outline-none focus:border-cyan-400
                    "
                  >
                    {ACCESS_TYPES.map(
                      (accessType) => (
                        <option
                          key={accessType}
                          value={accessType}
                        >
                          {accessTypeLabels[
                            accessType
                          ] || accessType}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <Field
                  label="Access name"
                  name="accessName"
                  value={userForm.accessName}
                  onChange={handleUserFormChange}
                  placeholder="Floor 5 / Client A"
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="mb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                    Dashboard permissions
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Select the pages and actions this
                    User can access.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {PERMISSIONS.map((permission) => {
                    const isSelected =
                      userForm.permissions.includes(
                        permission
                      );

                    return (
                      <button
                        type="button"
                        key={permission}
                        onClick={() =>
                          togglePermission(permission)
                        }
                        className={`
                          flex min-h-10 items-center
                          justify-between border px-3 py-2
                          text-left text-xs transition
                          ${
                            isSelected
                              ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                              : "border-white/10 bg-[#06184A] text-slate-300 hover:border-cyan-400/40"
                          }
                        `}
                      >
                        <span>
                          {permissionLabels[
                            permission
                          ] || permission}
                        </span>

                        <span
                          className={`
                            ml-2 flex h-4 w-4
                            shrink-0 items-center
                            justify-center border text-[9px]
                            ${
                              isSelected
                                ? "border-emerald-300 bg-emerald-300 text-[#020B24]"
                                : "border-slate-500"
                            }
                          `}
                        >
                          {isSelected ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="border border-red-400/30 bg-red-400/[0.08] px-3 py-2.5"
                >
                  <p className="text-xs font-medium text-red-300">
                    {formError}
                  </p>
                </div>
              )}

              {formSuccess && (
                <div
                  role="status"
                  className="border border-emerald-400/30 bg-emerald-400/[0.08] px-3 py-2.5"
                >
                  <p className="text-xs font-medium text-emerald-300">
                    {formSuccess}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isCreatingUser}
                className="
                  h-11 w-full border border-cyan-300
                  bg-cyan-400 text-sm font-semibold
                  text-[#020B24] transition
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isCreatingUser
                  ? "Creating User..."
                  : "Create User Credentials"}
              </button>
            </div>
          </form>

          <div className="space-y-5">
            <section className="border border-white/10 bg-white/[0.05] p-5">
              <div className="border-b border-white/10 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Service configuration
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Add-ons and Cloud Usage
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Configure enabled modules and temporary
                  frontend usage values.
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {ADDONS.map((addon) => {
                  const isEnabled =
                    currentAdmin.addons?.includes(
                      addon.key
                    );

                  return (
                    <button
                      type="button"
                      key={addon.key}
                      onClick={() =>
                        handleToggleAddon(addon.key)
                      }
                      className={`
                        border p-3 text-left transition
                        ${
                          isEnabled
                            ? "border-cyan-400/50 bg-cyan-400/10"
                            : "border-white/10 bg-[#06184A] hover:border-cyan-400/30"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p
                            className={`
                              text-sm font-medium
                              ${
                                isEnabled
                                  ? "text-cyan-200"
                                  : "text-white"
                              }
                            `}
                          >
                            {addon.name}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {formatCurrency(
                              addon.price
                            )}{" "}
                            per month
                          </p>
                        </div>

                        <span
                          className={`
                            flex h-5 w-5 items-center
                            justify-center border
                            text-[10px]
                            ${
                              isEnabled
                                ? "border-cyan-300 bg-cyan-300 text-[#020B24]"
                                : "border-slate-500 text-slate-500"
                            }
                          `}
                        >
                          {isEnabled ? "✓" : ""}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  [
                    "storageGB",
                    "Storage",
                    "GB",
                  ],
                  [
                    "apiCalls",
                    "API Calls",
                    "",
                  ],
                  [
                    "devices",
                    "Devices",
                    "",
                  ],
                  [
                    "dataTransferGB",
                    "Data Transfer",
                    "GB",
                  ],
                ].map(
                  ([field, label, suffix]) => (
                    <label
                      key={field}
                      className="block"
                    >
                      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {label}
                      </span>

                      <div className="flex h-10 border border-white/10 bg-[#06184A]">
                        <input
                          type="number"
                          min="0"
                          value={
                            currentAdmin
                              .cloudUsage?.[field] ??
                            0
                          }
                          onChange={(event) =>
                            handleUpdateCloud(
                              field,
                              event.target.value
                            )
                          }
                          className="
                            min-w-0 flex-1 bg-transparent
                            px-3 text-sm text-white
                            outline-none
                          "
                        />

                        {suffix && (
                          <span className="flex items-center border-l border-white/10 px-2 text-[10px] text-slate-500">
                            {suffix}
                          </span>
                        )}
                      </div>
                    </label>
                  )
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
                <SummaryCard
                  title="Storage"
                  value={formatCurrency(
                    bill.storageCharge
                  )}
                />

                <SummaryCard
                  title="API"
                  value={formatCurrency(
                    bill.apiCharge
                  )}
                />

                <SummaryCard
                  title="Devices"
                  value={formatCurrency(
                    bill.deviceCharge
                  )}
                />

                <SummaryCard
                  title="Transfer"
                  value={formatCurrency(
                    bill.transferCharge
                  )}
                />

                <SummaryCard
                  title="Add-ons"
                  value={formatCurrency(
                    bill.addonCharge
                  )}
                  accent
                />
              </div>
            </section>

            <section className="border border-white/10 bg-white/[0.05] p-5">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Account management
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    Dashboard Users
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Manage Users created under this
                    Admin account.
                  </p>
                </div>

                <div className="border border-white/10 bg-[#06184A] px-3 py-2 text-xs text-slate-300">
                  {adminUsers.length} User
                  {adminUsers.length === 1
                    ? ""
                    : "s"}
                </div>
              </div>

              {adminUsers.length === 0 ? (
                <div className="flex min-h-[220px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">
                      No Users created
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Create the first dashboard User
                      using the form.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {adminUsers.map((user) => {
                    const isSelected =
                      String(selectedUserId) ===
                      String(user.id);

                    return (
                      <article
                        key={user.id}
                        className="border border-white/10 bg-[#041237]"
                      >
                        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(220px,1.2fr)_minmax(220px,1fr)_auto] lg:items-center">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-sm font-semibold text-white">
                                {user.name}
                              </h3>

                              <StatusBadge
                                status={user.status}
                              />
                            </div>

                            <p className="mt-1 truncate text-xs text-blue-200">
                              {user.email}
                            </p>

                            <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-slate-500">
                              {designationLabels[
                                user.designation
                              ] ||
                                user.designation ||
                                "Viewer"}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Access
                              </p>

                              <p className="mt-1 truncate text-xs font-medium text-white">
                                {accessTypeLabels[
                                  user.accessType
                                ] ||
                                  user.accessType ||
                                  "-"}
                              </p>
                            </div>

                            <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Permissions
                              </p>

                              <p className="mt-1 text-xs font-medium text-cyan-300">
                                {user.permissions
                                  ?.length || 0}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 lg:justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedUserId(
                                  isSelected
                                    ? null
                                    : user.id
                                )
                              }
                              className="
                                h-9 border
                                border-cyan-400/40
                                px-3 text-xs font-semibold
                                text-cyan-300 transition
                                hover:bg-cyan-400/10
                              "
                            >
                              {isSelected
                                ? "Hide Details"
                                : "View Details"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleToggleUserStatus(
                                  user
                                )
                              }
                              className={`
                                h-9 border px-3 text-xs
                                font-semibold transition
                                ${
                                  String(
                                    user.status
                                  ).toUpperCase() ===
                                  "ACTIVE"
                                    ? "border-amber-400/40 text-amber-300 hover:bg-amber-400/10"
                                    : "border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10"
                                }
                              `}
                            >
                              {String(
                                user.status
                              ).toUpperCase() ===
                              "ACTIVE"
                                ? "Disable"
                                : "Enable"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteUser(user)
                              }
                              className="
                                h-9 border border-red-400/40
                                px-3 text-xs font-semibold
                                text-red-300 transition
                                hover:bg-red-400/10
                              "
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="border-t border-white/10 bg-[#06184A]/50 p-4">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              <div className="border border-white/10 bg-[#041237] p-3">
                                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                  Designation
                                </p>

                                <p className="mt-1 text-sm font-medium text-white">
                                  {designationLabels[
                                    user.designation
                                  ] ||
                                    user.designation ||
                                    "-"}
                                </p>
                              </div>

                              <div className="border border-white/10 bg-[#041237] p-3">
                                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                  Access type
                                </p>

                                <p className="mt-1 text-sm font-medium text-white">
                                  {accessTypeLabels[
                                    user.accessType
                                  ] ||
                                    user.accessType ||
                                    "-"}
                                </p>
                              </div>

                              <div className="border border-white/10 bg-[#041237] p-3">
                                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                  Access name
                                </p>

                                <p className="mt-1 text-sm font-medium text-white">
                                  {user.accessName ||
                                    "All assigned access"}
                                </p>
                              </div>

                              <div className="border border-white/10 bg-[#041237] p-3">
                                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                  Created
                                </p>

                                <p className="mt-1 text-sm font-medium text-white">
                                  {formatDate(
                                    user.createdAt
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 border border-white/10 bg-[#041237] p-3">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Assigned permissions
                              </p>

                              <div className="mt-2 flex flex-wrap gap-2">
                                {user.permissions?.map(
                                  (permission) => (
                                    <span
                                      key={permission}
                                      className="border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-1 text-[10px] text-cyan-200"
                                    >
                                      {permissionLabels[
                                        permission
                                      ] ||
                                        permission}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}