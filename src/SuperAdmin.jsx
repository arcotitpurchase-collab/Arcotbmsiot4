import React from "react";
import { tempApi, calculateAdminBill } from "./tempAdminApi";

const Card = ({ title, value }) => (
  <div className="border border-white/10 bg-white/[0.06] p-5">
    <p className="text-[11px] text-slate-400 font-medium">{title}</p>
    <h3 className="mt-2 text-[24px] font-semibold text-white">{value}</h3>
  </div>
);

const SuperAdmin = () => {
  const [data, setData] = React.useState(tempApi.getData);

  const [form, setForm] = React.useState({
    companyName: "",
    buildingName: "",
    adminName: "",
    adminEmail: "",
    password: "",
    phone: "",
  });

  const createAdmin = () => {
    if (!form.companyName || !form.adminEmail || !form.password) return;

    const updated = tempApi.createAdmin(form);
    setData(updated);

    setForm({
      companyName: "",
      buildingName: "",
      adminName: "",
      adminEmail: "",
      password: "",
      phone: "",
    });
  };

  const deleteAdmin = (adminId) => {
    const updated = tempApi.deleteAdmin(adminId);
    setData(updated);
  };

  const resetAll = () => {
    const updated = tempApi.resetData();
    setData(updated);
  };

  const getAdminUsers = (adminId) =>
    data.users.filter((user) => user.adminId === adminId);

  const totals = data.admins.reduce(
    (acc, admin) => {
      const bill = calculateAdminBill(admin, data.users);

      acc.admins += 1;
      acc.users += bill.userCount;
      acc.storage += admin.cloudUsage.storageGB;
      acc.apiCalls += admin.cloudUsage.apiCalls;
      acc.devices += admin.cloudUsage.devices;
      acc.transfer += admin.cloudUsage.dataTransferGB;
      acc.revenue += bill.total;

      return acc;
    },
    {
      admins: 0,
      users: 0,
      storage: 0,
      apiCalls: 0,
      devices: 0,
      transfer: 0,
      revenue: 0,
    }
  );

  return (
    <div className="min-h-screen bg-[#020B24] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="border border-white/10 bg-white/[0.06] p-5 mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-cyan-300 tracking-[0.2em]">
              ARCOT IIoT SUPER ADMIN
            </p>
            <h1 className="text-2xl font-semibold mt-1">
              Admin Access, Users & Cloud Consumption
            </h1>
          </div>

          <button
            onClick={resetAll}
            className="border border-red-400/40 text-red-300 px-4 py-2 text-sm"
          >
            Reset Demo Data
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-5">
          <Card title="Total Admins" value={totals.admins} />
          <Card title="Users Added" value={totals.users} />
          <Card title="Storage" value={`${totals.storage} GB`} />
          <Card title="Data Transfer" value={`${totals.transfer} GB`} />
          <Card title="Devices" value={totals.devices} />
          <Card title="Monthly Charge" value={`₹${totals.revenue}`} />
        </div>

        <div className="grid grid-cols-[360px_1fr] gap-5">
          <div className="border border-white/10 bg-white/[0.06] p-5 h-fit">
            <h2 className="text-[16px] font-semibold mb-4">
              Create Admin Login Credentials
            </h2>

            <input
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              placeholder="Client / Company Name"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <input
              value={form.buildingName}
              onChange={(e) => setForm({ ...form, buildingName: e.target.value })}
              placeholder="Building Name"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone Number"
              className="w-full mb-4 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <p className="text-[12px] text-cyan-300 mb-3">
              Admin Login Credentials
            </p>

            <input
              value={form.adminName}
              onChange={(e) => setForm({ ...form, adminName: e.target.value })}
              placeholder="Admin Name"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <input
              value={form.adminEmail}
              onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
              placeholder="Admin Login Email"
              className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Admin Login Password"
              className="w-full mb-4 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={createAdmin}
              className="w-full bg-cyan-400 text-[#020B24] py-2 text-sm font-semibold"
            >
              Create Admin Credentials
            </button>
          </div>

          <div className="border border-white/10 bg-white/[0.06] p-5 overflow-x-auto">
            <h2 className="text-[16px] font-semibold mb-4">
              Admin-wise Monitoring
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  {[
                    "Company",
                    "Admin",
                    "Users",
                    "Storage",
                    "Data",
                    "API",
                    "Devices",
                    "Charge",
                    "Action",
                  ].map((head) => (
                    <th key={head} className="py-3 text-left font-medium">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.admins.map((admin) => {
                  const adminUsers = getAdminUsers(admin.id);
                  const bill = calculateAdminBill(admin, data.users);

                  return (
                    <React.Fragment key={admin.id}>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div>{admin.companyName}</div>
                          <div className="text-[11px] text-slate-400">
                            {admin.buildingName || "-"}
                          </div>
                        </td>

                        <td className="py-3 text-blue-200">
                          <div>{admin.adminName || "-"}</div>
                          <div className="text-[11px] text-slate-400">
                            {admin.adminEmail}
                          </div>
                        </td>

                        <td className="py-3 text-cyan-300 font-semibold">
                          {adminUsers.length}
                        </td>

                        <td className="py-3">{admin.cloudUsage.storageGB} GB</td>
                        <td className="py-3">{admin.cloudUsage.dataTransferGB} GB</td>
                        <td className="py-3">{admin.cloudUsage.apiCalls}</td>
                        <td className="py-3">{admin.cloudUsage.devices}</td>

                        <td className="py-3 text-cyan-300 font-semibold">
                          ₹{bill.total}
                        </td>

                        <td className="py-3">
                          <button
                            onClick={() => deleteAdmin(admin.id)}
                            className="text-red-300 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-white/10">
                        <td colSpan="9" className="py-4 bg-[#06184A]/60">
                          <div className="grid grid-cols-5 gap-3 mb-4 px-3">
                            <Card title="Users Added" value={adminUsers.length} />
                            <Card title="Storage Charge" value={`₹${bill.storageCharge}`} />
                            <Card title="API Charge" value={`₹${bill.apiCharge}`} />
                            <Card title="Device Charge" value={`₹${bill.deviceCharge}`} />
                            <Card title="Total" value={`₹${bill.total}`} />
                          </div>

                          <div className="px-3">
                            <p className="text-[12px] text-cyan-300 font-medium mb-2">
                              Users added by this admin
                            </p>

                            {adminUsers.length === 0 ? (
                              <p className="text-xs text-slate-400">
                                No users added by this admin yet.
                              </p>
                            ) : (
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b border-white/10 text-slate-400">
                                    {[
                                      "Name",
                                      "Email",
                                      "Role",
                                      "Access Type",
                                      "Access Name",
                                      "Permissions",
                                    ].map((head) => (
                                      <th key={head} className="py-2 text-left font-medium">
                                        {head}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>

                                <tbody>
                                  {adminUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-white/5">
                                      <td className="py-2">{user.name}</td>
                                      <td className="py-2 text-blue-200">{user.email}</td>
                                      <td className="py-2">{user.role}</td>
                                      <td className="py-2">{user.accessType || "-"}</td>
                                      <td className="py-2">{user.accessName || "-"}</td>
                                      <td className="py-2 text-slate-300">
                                        {user.permissions?.join(", ")}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {data.admins.length === 0 && (
              <p className="text-sm text-slate-400 mt-4">
                No admins created yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;