import React from "react";
import {
  tempApi,
  ADDONS,
  PERMISSIONS,
  calculateAdminBill,
} from "./tempAdminApi";

const AdminDashboard = () => {
  const [data, setData] = React.useState(tempApi.getData);
  const currentAdmin = tempApi.getCurrentAdmin();

  const [userForm, setUserForm] = React.useState({
    name: "",
    email: "",
    role: "Viewer",
    accessType: "Building",
    accessName: "",
    permissions: ["view_dashboard"],
  });

  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-[#020B24] text-white p-6">
        <div className="border border-white/10 bg-white/[0.06] p-8 text-center">
          Please login first.
        </div>
      </div>
    );
  }

  const adminUsers = data.users.filter(
    (user) => user.adminId === currentAdmin.id
  );

  const bill = calculateAdminBill(currentAdmin, data.users);

  const addUser = () => {
    if (!userForm.name || !userForm.email) return;

    const updated = tempApi.createUser(currentAdmin.id, {
      ...userForm,
      addedBy: currentAdmin.adminEmail,
    });

    setData(updated);

    setUserForm({
      name: "",
      email: "",
      role: "Viewer",
      accessType: "Building",
      accessName: "",
      permissions: ["view_dashboard"],
    });
  };

  const togglePermission = (permission) => {
    setUserForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const toggleAddon = (addonKey) => {
    const updated = tempApi.updateAdmin(currentAdmin.id, (admin) => ({
      ...admin,
      addons: admin.addons.includes(addonKey)
        ? admin.addons.filter((item) => item !== addonKey)
        : [...admin.addons, addonKey],
    }));

    setData(updated);
  };

  const updateCloud = (field, value) => {
    const updated = tempApi.updateAdmin(currentAdmin.id, (admin) => ({
      ...admin,
      cloudUsage: {
        ...admin.cloudUsage,
        [field]: Number(value),
      },
    }));

    setData(updated);
  };

  const logout = () => {
    tempApi.logoutAdmin();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#020B24] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="border border-white/10 bg-white/[0.06] p-5 mb-5 flex justify-between">
          <div>
            <p className="text-[11px] text-cyan-300 tracking-[0.2em]">
              ADMIN DASHBOARD
            </p>
            <h1 className="text-2xl font-semibold mt-1">
              User Access & Dashboard Permissions
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              {currentAdmin.companyName} · {currentAdmin.buildingName}
            </p>
          </div>

          <button
            onClick={logout}
            className="border border-red-400/40 text-red-300 px-4 py-2 text-sm h-fit"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="border border-white/10 bg-white/[0.06] p-5">
            <p className="text-[11px] text-slate-400">Company</p>
            <h3 className="text-[22px] font-semibold mt-2">
              {currentAdmin.companyName}
            </h3>
          </div>

          <div className="border border-white/10 bg-white/[0.06] p-5">
            <p className="text-[11px] text-slate-400">Users Added</p>
            <h3 className="text-[22px] font-semibold mt-2">
              {adminUsers.length}
            </h3>
          </div>

          <div className="border border-white/10 bg-white/[0.06] p-5">
            <p className="text-[11px] text-slate-400">Cloud Charge</p>
            <h3 className="text-[22px] font-semibold mt-2 text-cyan-300">
              ₹{bill.total}
            </h3>
          </div>

          <div className="border border-white/10 bg-white/[0.06] p-5">
            <p className="text-[11px] text-slate-400">Admin</p>
            <h3 className="text-[22px] font-semibold mt-2">
              {currentAdmin.adminName || "-"}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="border border-white/10 bg-white/[0.06] p-5">
            <h2 className="text-[16px] font-semibold mb-4">
              Add Dashboard User
            </h2>

            <input
              value={userForm.name}
              onChange={(e) =>
                setUserForm({ ...userForm, name: e.target.value })
              }
              placeholder="User Name"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <input
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              placeholder="User Email"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <div className="grid grid-cols-3 gap-3 mb-4">
              <select
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value })
                }
                className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
              >
                <option>Engineer</option>
                <option>Operator</option>
                <option>Viewer</option>
              </select>

              <select
                value={userForm.accessType}
                onChange={(e) =>
                  setUserForm({ ...userForm, accessType: e.target.value })
                }
                className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
              >
                <option>Building</option>
                <option>Floor</option>
                <option>Client</option>
                <option>Equipment</option>
              </select>

              <input
                value={userForm.accessName}
                onChange={(e) =>
                  setUserForm({ ...userForm, accessName: e.target.value })
                }
                placeholder="Ex: Floor 5 / Client A"
                className="bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {PERMISSIONS.map((permission) => (
                <button
                  type="button"
                  key={permission}
                  onClick={() => togglePermission(permission)}
                  className={`border px-3 py-2 text-xs text-left ${
                    userForm.permissions.includes(permission)
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                      : "border-white/10 bg-[#06184A] text-blue-100"
                  }`}
                >
                  {userForm.permissions.includes(permission) ? "✅ " : "⬜ "}
                  {permission}
                </button>
              ))}
            </div>

            <button
              onClick={addUser}
              className="w-full bg-cyan-400 text-[#020B24] py-2 text-sm font-semibold"
            >
              Add User
            </button>
          </div>

          <div className="border border-white/10 bg-white/[0.06] p-5">
            <h2 className="text-[16px] font-semibold mb-4">
              Add-ons & Cloud Usage
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {ADDONS.map((addon) => (
                <button
                  type="button"
                  key={addon.key}
                  onClick={() => toggleAddon(addon.key)}
                  className={`border px-3 py-2 text-sm text-left ${
                    currentAdmin.addons.includes(addon.key)
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                      : "border-white/10 bg-[#06184A] text-blue-100"
                  }`}
                >
                  {currentAdmin.addons.includes(addon.key) ? "✅ " : "⬜ "}
                  {addon.name} · ₹{addon.price}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                ["storageGB", "Storage GB"],
                ["apiCalls", "API Calls"],
                ["devices", "Devices"],
                ["dataTransferGB", "Data GB"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="text-[11px] text-slate-400">{label}</label>
                  <input
                    type="number"
                    value={currentAdmin.cloudUsage?.[field] || 0}
                    onChange={(e) => updateCloud(field, e.target.value)}
                    className="w-full mt-1 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-white/[0.06] p-5 mt-5 overflow-x-auto">
          <h2 className="text-[16px] font-semibold mb-4">
            Users Added by This Admin
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                {[
                  "Name",
                  "Email",
                  "Role",
                  "Access Type",
                  "Access Name",
                  "Added By",
                  "Permissions",
                ].map((head) => (
                  <th key={head} className="py-3 text-left font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3 text-blue-200">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">{user.accessType || "-"}</td>
                  <td className="py-3">{user.accessName || "-"}</td>
                  <td className="py-3 text-cyan-300">{user.addedBy}</td>
                  <td className="py-3 text-[11px] text-slate-300">
                    {user.permissions?.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {adminUsers.length === 0 && (
            <p className="text-sm text-slate-400 mt-4">No users added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;