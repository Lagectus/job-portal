import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [input, setInput] = useState({ fullname: "", email: "", password: "", role: "", phoneNumber: "", file: null });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((s) => s.auth);

  const set     = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setFile = (e) => setInput((p) => ({ ...p, file: e.target.files?.[0] }));

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.password || !input.role) { toast.error("Please fill all required fields"); return; }
    const fd = new FormData();
    Object.entries(input).forEach(([k, v]) => { if (k !== "file" && v) fd.append(k, v); });
    if (input.file) fd.append("file", input.file);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, fd, {
        headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
      });
      if (res.data.success) { toast.success(res.data.message); navigate("/login"); }
    } catch (e) { toast.error(e.response?.data?.message || "Registration failed"); }
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
  const LBL = ({ t }) => (
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, letterSpacing: "0.3px" }}>
      {t.toUpperCase()}
    </label>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%", maxWidth: 440,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 24, padding: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#22d3ee,#a3e635)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={16} color="#0a0a0f" strokeWidth={2.5} />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: 0, letterSpacing: "-0.5px" }}>
              Create Account
            </h1>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { n: "fullname",    t: "text",     p: "Full name",      l: "Full Name" },
              { n: "email",       t: "email",    p: "Email address",  l: "Email" },
              { n: "password",    t: "password", p: "Password",       l: "Password" },
              { n: "phoneNumber", t: "tel",      p: "Phone number",   l: "Phone (optional)" },
            ].map(({ n, t, p, l }) => (
              <div key={n}>
                <LBL t={l} />
                <input
                  name={n} type={t} value={input[n]}
                  onChange={set} placeholder={p}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputStyle}
                />
              </div>
            ))}

            <div>
              <LBL t="Register As" />
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

            <div>
              <LBL t="Profile Photo" />
              <input type="file" accept="image/*" onChange={setFile} onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, cursor: "pointer", color: "#64748b" }} />
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Create Account →"}
            </motion.button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#22d3ee", fontWeight: 600, textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;