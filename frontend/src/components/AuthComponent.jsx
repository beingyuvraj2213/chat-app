import React from "react";

const AuthComponent = () => {
  return (
    <div className="hidden lg:flex relative overflow-hidden bg-[#0a0a12] pt-[60px]">
      {/* Gradient orbs */}
      <div className="absolute -top-20 -right-16 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-50 animate-pulse" />
      <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[80px] opacity-45 animate-pulse"
        style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-violet-500 rounded-full blur-[70px] opacity-40 animate-pulse"
        style={{ animationDelay: "3s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Content — fills full height, flex column so mt-auto works */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-12 py-10 text-center">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Live &amp; Encrypted
        </div>

        <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Chat that{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            feels alive
          </span>
        </h2>

        <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-10">
          Connect instantly with friends and teams. Real-time messages, delivered privately and beautifully.
        </p>

        {/* Chat bubbles */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-10">
          {[
            { side: "left",  avatar: "A", color: "from-indigo-500 to-violet-500", text: "Hey! Did you see the new update? 🚀" },
            { side: "right", avatar: "B", color: "from-cyan-500 to-blue-500",     text: "Just checked it out — it's so smooth now!" },
            { side: "left",  avatar: "A", color: "from-indigo-500 to-violet-500", text: "Right?! The real-time sync is flawless ✨" },
            { side: "right", avatar: "B", color: "from-cyan-500 to-blue-500",     text: "Loving every second of it 💬" },
          ].map((m, i) => (
            <div key={i} className={`flex items-end gap-2 ${m.side === "right" ? "flex-row-reverse self-end" : ""}`}>
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                {m.avatar}
              </div>
              <div className={`px-3.5 py-2 rounded-2xl text-sm max-w-[200px] leading-snug ${
                m.side === "left"
                  ? "bg-white/10 text-white/85 rounded-bl-sm"
                  : "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-br-sm"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer features — mt-auto pushes it down naturally, no absolute */}
        <div className="mt-auto flex gap-7 text-white/40 text-xs pt-4 border-t border-white/5 w-full justify-center">
          {["End-to-end encrypted", "Real-time delivery", "100k+ users"].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-400/60" />
              {f}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AuthComponent;