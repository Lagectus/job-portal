import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((s) => s.auth);
  const [input, setInput] = useState({ email: "", password: "", role: "" });

  const set = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) { toast.error("Please fill all fields"); return; }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" }, withCredentials: true,
      });
      if (res.data.success) { dispatch(setUser(res.data.user)); toast.success(res.data.message); navigate("/"); }
    } catch (e) { toast.error(e?.response?.data?.message || "Login failed"); }
    finally { dispatch(setLoading(false)); }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14,
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
  };

  const onFocus = (e) => { e.target.style.borderColor = "rgba(34,211,238,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)";  e.target.style.boxShadow = "none"; };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 68px)", padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%", maxWidth: 420,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 24, padding: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#22d3ee,#a3e635)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={16} color="#0a0a0f" strokeWidth={2.5} />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: 0, letterSpacing: "-0.5px" }}>
              Welcome Back
            </h1>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { name: "email",    type: "email",    placeholder: "your@email.com", label: "Email" },
              { name: "password", type: "password", placeholder: "Password",       label: "Password" },
            ].map(({ name, type, placeholder, label }) => (
              <div key={name}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, letterSpacing: "0.3px" }}>
                  {label.toUpperCase()}
                </label>
                <input
                  name={name} type={type} value={input[name]}
                  onChange={set} placeholder={placeholder}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputStyle}
                />
              </div>
            ))}

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 10, letterSpacing: "0.3px" }}>
                LOGIN AS
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Student", "Recruiter"].map((role) => (
                  <label
                    key={role}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 8, padding: 10, borderRadius: 12,
                      background: input.role === role ? "rgba(34,211,238,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${input.role === role ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.08)"}`,
                      cursor: "pointer", transition: "all 0.2s",
                      color: input.role === role ? "#22d3ee" : "#64748b",
                      fontSize: 13, fontWeight: 600,
                    }}
                  >
                    <input type="radio" name="role" value={role} checked={input.role === role} onChange={set} style={{ display: "none" }} />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(34,211,238,0.35)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: 6, padding: 13, borderRadius: 12,
                background: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Login →"}
            </motion.button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
            No account?{" "}
            <Link to="/register" style={{ color: "#22d3ee", fontWeight: 600, textDecoration: "none" }}>
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;