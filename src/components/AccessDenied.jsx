import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLandingRoute } from "../services/authService";

export default function AccessDenied() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(
      currentUser ? getLandingRoute(currentUser) : "/auth",
      { replace: true }
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
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
          This page is not available for your current account role or assigned permissions.
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
