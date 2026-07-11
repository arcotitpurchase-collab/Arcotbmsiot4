import React from "react";
import { useNavigate } from "react-router-dom";
import { tempApi } from "./tempAdminApi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");

  const login = () => {
    const result = tempApi.loginAdmin(form.email, form.password);

    if (!result.success) {
      setError("wrong");
      return;
    }

    setError("");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#020B24] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-white/10 bg-white/[0.06] p-6">
        <p className="text-[11px] text-cyan-300 tracking-[0.2em]">
          ARCOT IIoT ADMIN LOGIN
        </p>

        <h1 className="text-2xl font-semibold mt-2 mb-6">Admin Login</h1>

        <input
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setError("");
          }}
          placeholder="Admin Email"
          className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setError("");
          }}
          placeholder="Password"
          className="w-full mb-3 bg-[#06184A] border border-white/10 px-3 py-2 text-sm outline-none"
        />

        {error && (
          <div className="mb-4 border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          onClick={login}
          className="w-full bg-cyan-400 text-[#020B24] py-2 text-sm font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;