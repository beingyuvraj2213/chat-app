import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthComponent from "../components/AuthComponent";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <>
    <Navbar/>
    <div className="h-screen overflow-hidden grid lg:grid-cols-2 bg-[#0a0a12] pt-[60px]">

      {/* left side */}
      <div className="relative flex flex-col justify-center items-center overflow-hidden px-6 py-8 sm:px-12">
        {/* Orbs — contained by relative+overflow-hidden on parent */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-50 animate-pulse pointer-events-none" />
        <div className="absolute -bottom-16 -right-10 w-52 h-52 bg-violet-600 rounded-full blur-[80px] opacity-45 animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-2/3 w-36 h-36 bg-cyan-500 rounded-full blur-[70px] opacity-35 animate-pulse pointer-events-none" style={{ animationDelay: "4s" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Frosted glass card */}
        <div className="relative z-10 w-full max-w-md rounded-2xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
              <MessageSquare className="size-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Create Account</h1>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Get started with your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>FULL NAME</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User className="size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input type="text" placeholder="John Doe"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>EMAIL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input type="email" placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>PASSWORD</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <EyeOff className="size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                    : <Eye className="size-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSigningUp}
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60 cursor-pointer"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}>
              {isSigningUp ? <><Loader2 className="size-4 animate-spin" />Loading...</> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-medium" style={{ color: "#818cf8" }}>Sign in</Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <AuthComponent />
    </div>
    </>
  );
};

export default SignUpPage;