import { Link } from "react-router-dom";
import { MessageCircle, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  const initials = authUser?.fullName
    ?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "ME";

  const btnBase = {
    border: "0.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
  };
  const btnHoverOn  = (e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; };
  const btnHoverOff = (e) => { e.currentTarget.style.background = btnBase.background; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6
      border-b border-indigo-500/20 backdrop-blur-xl"
      style={{ background: "rgba(15,12,30,0.85)" }}>

      {/* Tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg,rgba(79,70,229,0.08) 0%,transparent 50%,rgba(6,182,212,0.06) 100%)" }} />

      {/* Brand */}
      <Link to="/" className="relative flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 0 0 1px rgba(99,102,241,0.4)" }}>
          <MessageCircle className="size-[17px] text-white" />
        </div>
        <span className="text-[17px] font-medium tracking-tight"
          style={{ background: "linear-gradient(135deg,#e0e7ff 30%,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          My Chat
        </span>
      </Link>

      {/* Actions */}
      <div className="relative flex items-center gap-1.5">

        {/* Profile */}
        <Link to="/profile"
          className="flex items-center gap-2 px-3 py-1.5 rounded-[9px] transition-all duration-150 active:scale-[0.97]"
          style={btnBase}
          onMouseEnter={btnHoverOn} onMouseLeave={btnHoverOff}>
          <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4f46e5,#06b6d4)" }}>
            {initials}
          </div>
          <span className="text-[13px] text-white/70">Profile</span>
        </Link>

        {/* Settings */}
        <Link to="/settings"
          className="w-9 h-9 rounded-[9px] flex items-center justify-center transition-all duration-150 active:scale-[0.97]"
          style={btnBase}
          onMouseEnter={btnHoverOn} onMouseLeave={btnHoverOff}
          aria-label="Settings">
          <Settings className="size-[17px] text-white/45" />
        </Link>

        {/* Divider */}
        <div className="w-px h-[22px] mx-0.5" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Logout */}
        <button onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[9px] transition-all duration-150 active:scale-[0.97]"
          style={{ border: "0.5px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}>
          <LogOut className="size-4 text-red-300/60" />
          <span className="text-[13px] text-red-300/80">Logout</span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;