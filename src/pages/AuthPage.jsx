// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import loginBg from "../assets/login-bg.png";
// import prestigeLogo from "../assets/ser-removebg.png";

// export default function AuthPage() {
//   const navigate = useNavigate();

//   const [isRegister, setIsRegister] = useState(true);
//   const [form, setForm] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const resetForm = () => {
//     setForm({ email: "", username: "", password: "" });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (!form.email.includes("@")) {
//       setError("Email must contain @");
//       return;
//     }

//     if (!form.username.trim() || !form.password.trim()) {
//       setError("Username and password are required");
//       return;
//     }

//     localStorage.setItem(
//       "bmsUser",
//       JSON.stringify({
//         email: form.email.trim(),
//         username: form.username.trim(),
//         password: form.password.trim(),
//       })
//     );

//     localStorage.setItem("bmsRegistered", "true");

//     setSuccess("Registered successfully. Please login.");
//     setIsRegister(false);
//     resetForm();
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const savedUser = JSON.parse(localStorage.getItem("bmsUser"));

//     if (!savedUser) {
//       setError("Please register first");
//       return;
//     }

//     if (
//       form.username.trim() !== savedUser.username ||
//       form.password.trim() !== savedUser.password
//     ) {
//       setError("Invalid username or password");
//       return;
//     }

//     localStorage.setItem("bmsLoggedIn", "true");
//     navigate("/");
//   };

//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${loginBg})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-[#081F5C]/80 via-black/65 to-[#004AAD]/45" />

//       <div className="relative z-10 w-full max-w-[560px] bg-[#081F5C]/90 border-2 border-[#004AAD] text-white shadow-2xl px-8 py-9 backdrop-blur-md">
//         {/* LOGOS */}
//         <div className="mb-8 flex items-center justify-center">
//           {/* ARCOT */}
//           <div className="pr-5">
//             <h1 className="text-[24px] font-500 tracking-[0.14em] uppercase leading-none">
//               ARCOT
//               <span className="text-[#67E8F9] ml-2">IIoT</span>
//             </h1>

//             <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-blue-300 font-medium">
//               Industrial Internet of Things
//             </p>
//           </div>

//           {/* LINE */}
//           <div className="h-[64px] w-px bg-[#004AAD]" />

//           {/* PRESTIGE */}
//           <div className="pl-5 flex items-center justify-center">
//             <img
//               src={prestigeLogo}
//               alt="Prestige Group"
//               className="h-[70px] w-auto object-contain"
//             />
//           </div>
//         </div>

//         <h2 className="text-center text-[25px] font-500 uppercase tracking-wide">
//           {isRegister ? "Register" : "Login"}
//         </h2>

//         <p className="mt-2 text-center text-sm text-blue-200">
//           {isRegister
//             ? "Create your dashboard access"
//             : "Login with your registered credentials"}
//         </p>

//         <form
//           onSubmit={isRegister ? handleRegister : handleLogin}
//           className="mt-6 space-y-4"
//         >
//           {isRegister && (
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               autoComplete="off"
//               className="h-11 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
//             />
//           )}

//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             autoComplete="off"
//             className="h-11 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
//           />

//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             autoComplete="new-password"
//             className="h-11 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
//           />

//           {error && <p className="text-sm font-bold text-red-400">{error}</p>}

//           {success && (
//             <p className="text-sm font-400 text-emerald-400">{success}</p>
//           )}

//           <button
//             type="submit"
//             className="h-11 w-full bg-[#004AAD] border border-cyan-400 text-white font-600 uppercase tracking-[0.1em] hover:bg-[#0058d6]"
//           >
//             {isRegister ? "Register" : "Login"}
//           </button>
//         </form>

//         <button
//           type="button"
//           onClick={() => {
//             setIsRegister(!isRegister);
//             setError("");
//             setSuccess("");
//             resetForm();
//           }}
//           className="mt-5 block w-full text-center text-sm font-500 text-cyan-300 hover:text-white"
//         >
//           {isRegister ? "Already registered? Login" : "Need account? Register"}
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login-bg3.png";
import prestigeLogo from "../assets/ser-removebg.png";

export default function AuthPage() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setForm({ email: "", username: "", password: "" });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Email must contain @");
      return;
    }

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required");
      return;
    }

    localStorage.setItem(
      "bmsUser",
      JSON.stringify({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password.trim(),
      })
    );

    localStorage.setItem("bmsRegistered", "true");

    setSuccess("Registered successfully. Please login.");
    setIsRegister(false);
    resetForm();
  };

 const handleLogin = (e) => {
  e.preventDefault();

  const username = form.username.trim();
  const password = form.password.trim();

  // ============================
  // SUPER ADMIN LOGIN
  // Username: vijay
  // Password: 1234
  // ============================
  if (username === "vijay" && password === "1234") {
    localStorage.setItem("bmsLoggedIn", "true");
    localStorage.setItem("bmsRole", "superadmin");

    navigate("/admin/superadmin");
    return;
  }

  // ============================
  // NORMAL USER LOGIN
  // ============================
  const savedUser = JSON.parse(localStorage.getItem("bmsUser"));

  if (!savedUser) {
    setError("Please register first");
    return;
  }

  if (
    username !== savedUser.username ||
    password !== savedUser.password
  ) {
    setError("Invalid username or password");
    return;
  }

  localStorage.setItem("bmsLoggedIn", "true");
  localStorage.setItem("bmsRole", "admin");

  navigate("/");
};

  return (
  <div
  className="relative min-h-screen flex items-center justify-end pr-6 pl-6 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${loginBg})` }}
>
  <div className="relative z-10 w-full max-w-[470px] bg-[#081F5C]/75 border border-cyan-400 text-white shadow-[0_0_30px_rgba(0,74,173,0.6)] px-7 py-7">
    <div className="mb-6 flex items-center justify-center">
      <div>
        <h1 className="text-[26px] font-bold tracking-[0.13em] uppercase leading-none">
          ARCOT
          <span className="text-[#67E8F9] ml-2">IIoT</span>
        </h1>

        <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-blue-300">
          Industrial Internet of Things
        </p>
      </div>

      <div className="mx-4 h-[52px] w-px bg-[#004AAD]" />

      <img
        src={prestigeLogo}
        alt="Prestige Group"
        className="h-[60px] w-auto object-contain"
      />
    </div>

    <h2 className="text-center text-[22px] font-semibold uppercase tracking-wide">
      {isRegister ? "Register" : "Login"}
    </h2>

    <p className="mt-1 text-center text-xs text-blue-200">
      {isRegister
        ? "Create your dashboard access"
        : "Login with your registered credentials"}
    </p>

    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="mt-5 space-y-3"
    >
      {isRegister && (
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="off"
          className="h-10 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
        />
      )}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        autoComplete="off"
        className="h-10 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="new-password"
        className="h-10 w-full border border-[#004AAD] bg-[#05143C] px-4 text-sm font-semibold text-white outline-none placeholder:text-blue-300 focus:border-cyan-400"
      />

      {error && <p className="text-sm font-bold text-red-400">{error}</p>}

      {success && (
        <p className="text-sm font-normal text-emerald-400">{success}</p>
      )}

      <button
        type="submit"
        className="h-10 w-full bg-[#004AAD] border border-cyan-400 text-white font-semibold uppercase tracking-[0.1em] hover:bg-[#0058d6]"
      >
        {isRegister ? "Register" : "Login"}
      </button>
    </form>

    <button
      type="button"
      onClick={() => {
        setIsRegister(!isRegister);
        setError("");
        setSuccess("");
        resetForm();
      }}
      className="mt-4 block w-full text-center text-sm font-medium text-cyan-300 hover:text-white"
    >
      {isRegister ? "Already registered? Login" : "Need account? Register"}
    </button>
  </div>
</div>
  );
}