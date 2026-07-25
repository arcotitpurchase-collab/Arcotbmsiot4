// import React from "react";
// import { tempApi, calculateAdminBill } from "./tempAdminApi";

// const Card = ({ title, value }) => (
//   <div className="border border-white/10 bg-white/[0.06] p-5">
//     <p className="text-[11px] text-slate-400 font-medium">{title}</p>
//     <h3 className="mt-2 text-[24px] font-semibold text-white">{value}</h3>
//   </div>
// );

// const SuperAdmin = () => {
//   const [data, setData] = React.useState(tempApi.getData);

//   const [form, setForm] = React.useState({
//     companyName: "",
//     buildingName: "",
//     adminName: "",
//     adminEmail: "",
//     password: "",
//     phone: "",
//   });

//   const createAdmin = () => {
//     if (!form.companyName || !form.adminEmail || !form.password) return;

//     const updated = tempApi.createAdmin(form);
//     setData(updated);

//     setForm({
//       companyName: "",
//       buildingName: "",
//       adminName: "",
//       adminEmail: "",
//       password: "",
//       phone: "",
//     });
//   };

//   const deleteAdmin = (adminId) => {
//     const updated = tempApi.deleteAdmin(adminId);
//     setData(updated);
//   };

//   const resetAll = () => {
//     const updated = tempApi.resetData();
//     setData(updated);
//   };

//   const getAdminUsers = (adminId) =>
//     data.users.filter((user) => user.adminId === adminId);

//   const totals = data.admins.reduce(
//     (acc, admin) => {
//       const bill = calculateAdminBill(admin, data.users);

//       acc.admins += 1;
//       acc.users += bill.userCount;
//       acc.storage += admin.cloudUsage.storageGB;
//       acc.apiCalls += admin.cloudUsage.apiCalls;
//       acc.devices += admin.cloudUsage.devices;
//       acc.transfer += admin.cloudUsage.dataTransferGB;
//       acc.revenue += bill.total;

//       return acc;
//     },
//     {
//       admins: 0,
//       users: 0,
//       storage: 0,
//       apiCalls: 0,
//       devices: 0,
//       transfer: 0,
//       revenue: 0,
//     }
//   );

//   return (
//     <div className="min-h-screen bg-[#020B24] text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="border border-white/10 bg-white/[0.06] p-5 mb-5 flex items-center justify-between">
//           <div>
//             <p className="text-[11px] text-cyan-300 tracking-[0.2em]">
//               ARCOT IIoT SUPER ADMIN
//             </p>
//             <h1 className="text-2xl font-semibold mt-1">
//               Admin Access, Users & Cloud Consumption
//             </h1>
//           </div>

//           <button
//             onClick={resetAll}
//             className="border border-red-400/40 text-red-300 px-4 py-2 text-sm"
//           >
//             Reset Demo Data
//           </button>
//         </div>

//         <div className="grid grid-cols-6 gap-4 mb-5">
//           <Card title="Total Admins" value={totals.admins} />
//           <Card title="Users Added" value={totals.users} />
//           <Card title="Storage" value={`${totals.storage} GB`} />
//           <Card title="Data Transfer" value={`${totals.transfer} GB`} />
//           <Card title="Devices" value={totals.devices} />
//           <Card title="Monthly Charge" value={`₹${totals.revenue}`} />
//         </div>

//         <div className="grid grid-cols-[360px_1fr] gap-5">
//           <div className="border border-white/10 bg-white/[0.06] p-5 h-fit">
//             <h2 className="text-[16px] font-semibold mb-4">
//               Create Admin Login Credentials
//             </h2>

//             <input
//               value={form.companyName}
//               onChange={(e) => setForm({ ...form, companyName: e.target.value })}
//               placeholder="Client / Company Name"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <input
//               value={form.buildingName}
//               onChange={(e) => setForm({ ...form, buildingName: e.target.value })}
//               placeholder="Building Name"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <input
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//               placeholder="Phone Number"
//               className="w-full mb-4 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <p className="text-[12px] text-cyan-300 mb-3">
//               Admin Login Credentials
//             </p>

//             <input
//               value={form.adminName}
//               onChange={(e) => setForm({ ...form, adminName: e.target.value })}
//               placeholder="Admin Name"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <input
//               value={form.adminEmail}
//               onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
//               placeholder="Admin Login Email"
//               className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <input
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               placeholder="Admin Login Password"
//               className="w-full mb-4 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
//             />

//             <button
//               onClick={createAdmin}
//               className="w-full bg-cyan-400 text-[#020B24] py-2 text-sm font-semibold"
//             >
//               Create Admin Credentials
//             </button>
//           </div>

//           <div className="border border-white/10 bg-white/[0.06] p-5 overflow-x-auto">
//             <h2 className="text-[16px] font-semibold mb-4">
//               Admin-wise Monitoring
//             </h2>

//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-white/10 text-slate-400">
//                   {[
//                     "Company",
//                     "Admin",
//                     "Users",
//                     "Storage",
//                     "Data",
//                     "API",
//                     "Devices",
//                     "Charge",
//                     "Action",
//                   ].map((head) => (
//                     <th key={head} className="py-3 text-left font-medium">
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {data.admins.map((admin) => {
//                   const adminUsers = getAdminUsers(admin.id);
//                   const bill = calculateAdminBill(admin, data.users);

//                   return (
//                     <React.Fragment key={admin.id}>
//                       <tr className="border-b border-white/5">
//                         <td className="py-3">
//                           <div>{admin.companyName}</div>
//                           <div className="text-[11px] text-slate-400">
//                             {admin.buildingName || "-"}
//                           </div>
//                         </td>

//                         <td className="py-3 text-blue-200">
//                           <div>{admin.adminName || "-"}</div>
//                           <div className="text-[11px] text-slate-400">
//                             {admin.adminEmail}
//                           </div>
//                         </td>

//                         <td className="py-3 text-cyan-300 font-semibold">
//                           {adminUsers.length}
//                         </td>

//                         <td className="py-3">{admin.cloudUsage.storageGB} GB</td>
//                         <td className="py-3">{admin.cloudUsage.dataTransferGB} GB</td>
//                         <td className="py-3">{admin.cloudUsage.apiCalls}</td>
//                         <td className="py-3">{admin.cloudUsage.devices}</td>

//                         <td className="py-3 text-cyan-300 font-semibold">
//                           ₹{bill.total}
//                         </td>

//                         <td className="py-3">
//                           <button
//                             onClick={() => deleteAdmin(admin.id)}
//                             className="text-red-300 text-xs"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>

//                       <tr className="border-b border-white/10">
//                         <td colSpan="9" className="py-4 bg-[#06184A]/60">
//                           <div className="grid grid-cols-5 gap-3 mb-4 px-3">
//                             <Card title="Users Added" value={adminUsers.length} />
//                             <Card title="Storage Charge" value={`₹${bill.storageCharge}`} />
//                             <Card title="API Charge" value={`₹${bill.apiCharge}`} />
//                             <Card title="Device Charge" value={`₹${bill.deviceCharge}`} />
//                             <Card title="Total" value={`₹${bill.total}`} />
//                           </div>

//                           <div className="px-3">
//                             <p className="text-[12px] text-cyan-300 font-medium mb-2">
//                               Users added by this admin
//                             </p>

//                             {adminUsers.length === 0 ? (
//                               <p className="text-xs text-slate-400">
//                                 No users added by this admin yet.
//                               </p>
//                             ) : (
//                               <table className="w-full text-xs">
//                                 <thead>
//                                   <tr className="border-b border-white/10 text-slate-400">
//                                     {[
//                                       "Name",
//                                       "Email",
//                                       "Role",
//                                       "Access Type",
//                                       "Access Name",
//                                       "Permissions",
//                                     ].map((head) => (
//                                       <th key={head} className="py-2 text-left font-medium">
//                                         {head}
//                                       </th>
//                                     ))}
//                                   </tr>
//                                 </thead>

//                                 <tbody>
//                                   {adminUsers.map((user) => (
//                                     <tr key={user.id} className="border-b border-white/5">
//                                       <td className="py-2">{user.name}</td>
//                                       <td className="py-2 text-blue-200">{user.email}</td>
//                                       <td className="py-2">{user.role}</td>
//                                       <td className="py-2">{user.accessType || "-"}</td>
//                                       <td className="py-2">{user.accessName || "-"}</td>
//                                       <td className="py-2 text-slate-300">
//                                         {user.permissions?.join(", ")}
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     </React.Fragment>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {data.admins.length === 0 && (
//               <p className="text-sm text-slate-400 mt-4">
//                 No admins created yet.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdmin;














import React from "react";
import {
  calculateAdminBill,
  tempApi,
} from "./tempAdminApi";

const initialForm = {
  companyName: "",
  buildingName: "",
  adminName: "",
  adminEmail: "",
  password: "",
  phone: "",
  status: "ACTIVE",
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

export default function SuperAdmin() {
  const currentSuperAdmin =
    tempApi.getCurrentSuperAdmin();

  const [data, setData] = React.useState(() =>
    tempApi.getData()
  );

  const [form, setForm] =
    React.useState(initialForm);

  const [formError, setFormError] =
    React.useState("");

  const [formSuccess, setFormSuccess] =
    React.useState("");

  const [expandedAdminId, setExpandedAdminId] =
    React.useState(null);

  const [isCreating, setIsCreating] =
    React.useState(false);

  const refreshData = React.useCallback(() => {
    setData(tempApi.getData());
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (!currentSuperAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020B24] p-6 text-white">
        <section className="w-full max-w-lg border border-red-400/30 bg-red-400/[0.06] p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
            Invalid session
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Super Admin access is required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Please log in using an active Super Admin
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

  const getAdminUsers = (adminId) =>
    data.users.filter(
      (user) =>
        String(user.adminId) === String(adminId)
    );

  const totals = data.admins.reduce(
    (summary, admin) => {
      const bill = calculateAdminBill(
        admin,
        data.users
      );

      summary.admins += 1;
      summary.users += bill.userCount;
      summary.storage += Number(
        admin.cloudUsage?.storageGB || 0
      );
      summary.apiCalls += Number(
        admin.cloudUsage?.apiCalls || 0
      );
      summary.devices += Number(
        admin.cloudUsage?.devices || 0
      );
      summary.transfer += Number(
        admin.cloudUsage?.dataTransferGB || 0
      );
      summary.revenue += bill.total;

      if (
        String(admin.status).toUpperCase() ===
        "ACTIVE"
      ) {
        summary.activeAdmins += 1;
      }

      return summary;
    },
    {
      admins: 0,
      activeAdmins: 0,
      users: 0,
      storage: 0,
      apiCalls: 0,
      devices: 0,
      transfer: 0,
      revenue: 0,
    }
  );

  const companies = new Set(
    data.admins
      .map((admin) =>
        admin.companyName?.trim().toLowerCase()
      )
      .filter(Boolean)
  ).size;

  const buildings = new Set(
    data.admins
      .map((admin) =>
        admin.buildingName?.trim().toLowerCase()
      )
      .filter(Boolean)
  ).size;

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
    setFormSuccess("");
  };

  const handleCreateAdmin = (event) => {
    event.preventDefault();

    if (
      !form.companyName.trim() ||
      !form.adminName.trim() ||
      !form.adminEmail.trim() ||
      !form.password.trim()
    ) {
      setFormError(
        "Company name, admin name, email and password are required."
      );
      return;
    }

    setIsCreating(true);
    setFormError("");
    setFormSuccess("");

    try {
      const result = tempApi.createAdmin(form);

      if (!result.success) {
        setFormError(
          result.message ||
            "Unable to create Admin."
        );
        return;
      }

      if (form.status === "INACTIVE") {
        const statusResult =
          tempApi.setAdminStatus(
            result.admin.id,
            "INACTIVE"
          );

        setData(statusResult.data);
      } else {
        setData(result.data);
      }

      setForm(initialForm);
      setFormSuccess(
        "Admin account created successfully."
      );
    } catch (error) {
      console.error(
        "Admin creation failed:",
        error
      );

      setFormError(
        "Unable to create Admin. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleStatus = (admin) => {
    const nextStatus =
      String(admin.status).toUpperCase() ===
      "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    const result = tempApi.setAdminStatus(
      admin.id,
      nextStatus
    );

    if (result.success) {
      setData(result.data);
    }
  };

  const handleDeleteAdmin = (admin) => {
    const confirmed = window.confirm(
      `Delete ${admin.adminName || admin.email} and all Users created under this Admin?`
    );

    if (!confirmed) {
      return;
    }

    const result = tempApi.deleteAdmin(admin.id);

    if (result.success) {
      setData(result.data);

      if (
        String(expandedAdminId) ===
        String(admin.id)
      ) {
        setExpandedAdminId(null);
      }
    }
  };

  const handleResetData = () => {
    const confirmed = window.confirm(
      "Reset all temporary Admin and User data? The default Super Admin account will remain available."
    );

    if (!confirmed) {
      return;
    }

    const resetData = tempApi.resetData();
    setData(resetData);
    setExpandedAdminId(null);
    setForm(initialForm);
    setFormError("");
    setFormSuccess("");
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
                ARCOT IIoT · Super Admin
              </p>

              <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
                Administration and Cloud Control
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                Manage client Admin accounts, Users,
                usage and monthly charges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="border border-white/10 bg-[#06184A] px-4 py-2">
                <p className="text-[9px] uppercase tracking-[0.13em] text-slate-500">
                  Signed in as
                </p>

                <p className="mt-0.5 text-sm font-medium text-cyan-200">
                  {currentSuperAdmin.name}
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="
                  h-10 border border-red-400/30
                  px-4 text-xs font-semibold
                  text-red-300 transition
                  hover:bg-red-400/10
                "
              >
                Reset Demo Data
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  h-10 border border-cyan-400
                  bg-cyan-400 px-5 text-xs
                  font-semibold text-[#020B24]
                  transition hover:bg-cyan-300
                "
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <SummaryCard
            title="Companies"
            value={companies}
            description="Registered clients"
          />

          <SummaryCard
            title="Buildings"
            value={buildings}
            description="Assigned properties"
          />

          <SummaryCard
            title="Total Admins"
            value={totals.admins}
            description={`${totals.activeAdmins} active`}
          />

          <SummaryCard
            title="Total Users"
            value={totals.users}
            description="Created by Admins"
          />

          <SummaryCard
            title="Devices"
            value={formatNumber(totals.devices)}
            description="Configured devices"
          />

          <SummaryCard
            title="Monthly Charge"
            value={formatCurrency(totals.revenue)}
            description="Estimated total"
            accent
          />
        </section>

        <section className="grid items-start gap-5 xl:grid-cols-[370px_minmax(0,1fr)]">
          <form
            onSubmit={handleCreateAdmin}
            className="border border-white/10 bg-white/[0.05] p-5"
          >
            <div className="border-b border-white/10 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Account provisioning
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Create Admin
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Create the primary Admin account for a
                company and building.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <Field
                label="Company name"
                name="companyName"
                value={form.companyName}
                onChange={handleFormChange}
                placeholder="Client or company"
              />

              <Field
                label="Building name"
                name="buildingName"
                value={form.buildingName}
                onChange={handleFormChange}
                placeholder="Assigned building"
              />

              <Field
                label="Phone number"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Contact number"
                autoComplete="tel"
              />

              <div className="border-t border-white/10 pt-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  Login credentials
                </p>

                <div className="space-y-3">
                  <Field
                    label="Admin name"
                    name="adminName"
                    value={form.adminName}
                    onChange={handleFormChange}
                    placeholder="Full name"
                    autoComplete="name"
                  />

                  <Field
                    label="Admin email"
                    name="adminEmail"
                    value={form.adminEmail}
                    onChange={handleFormChange}
                    placeholder="admin@company.com"
                    type="email"
                    autoComplete="email"
                  />

                  <Field
                    label="Temporary password"
                    name="password"
                    value={form.password}
                    onChange={handleFormChange}
                    placeholder="Create password"
                    type="password"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                  Account status
                </span>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="
                    h-10 w-full border border-white/10
                    bg-[#06184A] px-3 text-sm text-white
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
                disabled={isCreating}
                className="
                  h-11 w-full border border-cyan-300
                  bg-cyan-400 text-sm font-semibold
                  text-[#020B24] transition
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isCreating
                  ? "Creating Admin..."
                  : "Create Admin Credentials"}
              </button>
            </div>
          </form>

          <section className="min-w-0 border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Client administration
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Admin Monitoring
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Review each Admin, assigned Users,
                  cloud consumption and charges.
                </p>
              </div>

              <div className="border border-white/10 bg-[#06184A] px-3 py-2 text-xs text-slate-300">
                {totals.admins} Admin account
                {totals.admins === 1 ? "" : "s"}
              </div>
            </div>

            {data.admins.length === 0 ? (
              <div className="flex min-h-[340px] items-center justify-center">
                <div className="max-w-sm text-center">
                  <p className="text-base font-medium text-white">
                    No Admin accounts created
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Use the form to create the first
                    company Admin account.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {data.admins.map((admin) => {
                  const adminUsers =
                    getAdminUsers(admin.id);

                  const bill = calculateAdminBill(
                    admin,
                    data.users
                  );

                  const isExpanded =
                    String(expandedAdminId) ===
                    String(admin.id);

                  const cloudUsage =
                    admin.cloudUsage || {};

                  return (
                    <article
                      key={admin.id}
                      className="border border-white/10 bg-[#041237]"
                    >
                      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(220px,1.4fr)_minmax(160px,1fr)_auto] lg:items-center">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-semibold text-white">
                              {admin.companyName}
                            </h3>

                            <StatusBadge
                              status={admin.status}
                            />
                          </div>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {admin.buildingName ||
                              "No building assigned"}
                          </p>

                          <p className="mt-2 truncate text-xs text-cyan-200">
                            {admin.adminName || "-"} ·{" "}
                            {admin.adminEmail ||
                              admin.email}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                              Users
                            </p>

                            <p className="mt-1 text-sm font-semibold text-white">
                              {adminUsers.length}
                            </p>
                          </div>

                          <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                              Devices
                            </p>

                            <p className="mt-1 text-sm font-semibold text-white">
                              {formatNumber(
                                cloudUsage.devices
                              )}
                            </p>
                          </div>

                          <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                              Bill
                            </p>

                            <p className="mt-1 text-sm font-semibold text-cyan-300">
                              {formatCurrency(
                                bill.total
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedAdminId(
                                isExpanded
                                  ? null
                                  : admin.id
                              )
                            }
                            className="
                              h-9 border border-cyan-400/40
                              px-3 text-xs font-semibold
                              text-cyan-300 transition
                              hover:bg-cyan-400/10
                            "
                          >
                            {isExpanded
                              ? "Hide Details"
                              : "View Details"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(admin)
                            }
                            className={`
                              h-9 border px-3 text-xs
                              font-semibold transition
                              ${
                                String(
                                  admin.status
                                ).toUpperCase() ===
                                "ACTIVE"
                                  ? "border-amber-400/40 text-amber-300 hover:bg-amber-400/10"
                                  : "border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10"
                              }
                            `}
                          >
                            {String(
                              admin.status
                            ).toUpperCase() ===
                            "ACTIVE"
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAdmin(admin)
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

                      {isExpanded && (
                        <div className="border-t border-white/10 bg-[#06184A]/50 p-4">
                          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                            <SummaryCard
                              title="Storage"
                              value={`${formatNumber(
                                cloudUsage.storageGB
                              )} GB`}
                            />

                            <SummaryCard
                              title="API Calls"
                              value={formatNumber(
                                cloudUsage.apiCalls
                              )}
                            />

                            <SummaryCard
                              title="Data Transfer"
                              value={`${formatNumber(
                                cloudUsage.dataTransferGB
                              )} GB`}
                            />

                            <SummaryCard
                              title="Devices"
                              value={formatNumber(
                                cloudUsage.devices
                              )}
                            />

                            <SummaryCard
                              title="Add-ons"
                              value={
                                admin.addons?.length || 0
                              }
                            />

                            <SummaryCard
                              title="Total Bill"
                              value={formatCurrency(
                                bill.total
                              )}
                              accent
                            />
                          </div>

                          <div className="mt-4 border border-white/10 bg-[#041237]">
                            <div className="flex flex-col gap-2 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="text-sm font-semibold text-white">
                                  Users created by this
                                  Admin
                                </h4>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  Account and permission
                                  assignments
                                </p>
                              </div>

                              <p className="text-[11px] text-slate-400">
                                Admin created:{" "}
                                {formatDate(
                                  admin.createdAt
                                )}
                              </p>
                            </div>

                            {adminUsers.length === 0 ? (
                              <p className="px-4 py-6 text-center text-xs text-slate-400">
                                This Admin has not created
                                any Users.
                              </p>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="min-w-[900px] w-full text-left text-xs">
                                  <thead className="bg-white/[0.03] text-slate-400">
                                    <tr>
                                      {[
                                        "User",
                                        "Designation",
                                        "Access",
                                        "Permissions",
                                        "Status",
                                        "Created",
                                      ].map((heading) => (
                                        <th
                                          key={heading}
                                          className="px-4 py-3 font-medium"
                                        >
                                          {heading}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {adminUsers.map(
                                      (user) => (
                                        <tr
                                          key={user.id}
                                          className="border-t border-white/5"
                                        >
                                          <td className="px-4 py-3">
                                            <p className="font-medium text-white">
                                              {user.name}
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-blue-200">
                                              {user.email}
                                            </p>
                                          </td>

                                          <td className="px-4 py-3 text-slate-300">
                                            {user.designation ||
                                              user.role ||
                                              "VIEWER"}
                                          </td>

                                          <td className="px-4 py-3">
                                            <p className="text-slate-300">
                                              {user.accessType ||
                                                "-"}
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-slate-500">
                                              {user.accessName ||
                                                "All assigned access"}
                                            </p>
                                          </td>

                                          <td className="max-w-[280px] px-4 py-3">
                                            <div className="flex flex-wrap gap-1">
                                              {user.permissions?.map(
                                                (
                                                  permission
                                                ) => (
                                                  <span
                                                    key={
                                                      permission
                                                    }
                                                    className="border border-white/10 bg-white/[0.04] px-1.5 py-1 text-[9px] text-slate-300"
                                                  >
                                                    {
                                                      permission
                                                    }
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </td>

                                          <td className="px-4 py-3">
                                            <StatusBadge
                                              status={
                                                user.status
                                              }
                                            />
                                          </td>

                                          <td className="px-4 py-3 text-slate-400">
                                            {formatDate(
                                              user.createdAt
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            <div className="border border-white/10 bg-[#041237] px-3 py-2.5">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Storage charge
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                {formatCurrency(
                                  bill.storageCharge
                                )}
                              </p>
                            </div>

                            <div className="border border-white/10 bg-[#041237] px-3 py-2.5">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                API charge
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                {formatCurrency(
                                  bill.apiCharge
                                )}
                              </p>
                            </div>

                            <div className="border border-white/10 bg-[#041237] px-3 py-2.5">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Device charge
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                {formatCurrency(
                                  bill.deviceCharge
                                )}
                              </p>
                            </div>

                            <div className="border border-white/10 bg-[#041237] px-3 py-2.5">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                Transfer charge
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                {formatCurrency(
                                  bill.transferCharge
                                )}
                              </p>
                            </div>

                            <div className="border border-cyan-400/30 bg-cyan-400/[0.07] px-3 py-2.5">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-cyan-300/70">
                                Add-on charge
                              </p>

                              <p className="mt-1 text-sm font-semibold text-cyan-300">
                                {formatCurrency(
                                  bill.addonCharge
                                )}
                              </p>
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
        </section>
      </div>
    </main>
  );
}