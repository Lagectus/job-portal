import React, { useState, useEffect } from "react";
import { LogOut, Menu, User2, X, Zap } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/data";
import { setUser } from "../../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`);
      if (res.data.message) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Logout failed");
    }
  };

  const links =
    user?.role === "Recruiter"
      ? [{ to: "/admin/companies", label: "Companies" }, { to: "/admin/jobs", label: "Jobs" }]
      : [{ to: "/", label: "Home" }, { to: "/Browser", label: "Browse" }, { to: "/Jobs", label: "Jobs" }];

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.4s ease",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div whileHover={{ scale: 1.04 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30, height: 30, borderRadius: 8,
                background: "linear-gradient(135deg, #22d3ee, #a3e635)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Zap size={16} color="#0a0a0f" strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: 20, color: "#f1f5f9", letterSpacing: "-0.5px",
              }}
            >
              Job<span style={{ color: "#22d3ee" }}>Portal</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", gap: 28 }}>
            {links.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} style={{ textDecoration: "none", position: "relative" }}>
                  <motion.span
                    whileHover={{ color: "#22d3ee" }}
                    style={{
                      fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
                      color: active ? "#22d3ee" : "#94a3b8",
                      transition: "color 0.2s", letterSpacing: "0.2px",
                    }}
                  >
                    {label}
                  </motion.span>
                  {active && (
                    <motion.div
                      layoutId="nav-dot"
                      style={{
                        position: "absolute", bottom: -4, left: "50%",
                        transform: "translateX(-50%)",
                        width: 4, height: 4, borderRadius: "50%", background: "#22d3ee",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {!user ? (
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "8px 20px", borderRadius: 10, background: "transparent",
                    border: "1px solid rgba(255,255,255,0.14)", color: "#f1f5f9",
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, cursor: "pointer",
                  }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(34,211,238,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "8px 20px", borderRadius: 10,
                    background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
                    border: "none", color: "#0a0a0f",
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Register
                </motion.button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      width: 38, height: 38, borderRadius: "50%",
                      border: "2px solid rgba(34,211,238,0.5)", padding: 2, overflow: "hidden",
                    }}
                  >
                    <Avatar style={{ width: "100%", height: "100%" }}>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </div>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent
                style={{
                  width: 240,
                  background: "#12121a", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16, padding: 16,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                }}
              >
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <div
                    style={{
                      display: "flex", gap: 12, alignItems: "center",
                      marginBottom: 14, paddingBottom: 12,
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(34,211,238,0.4)" }}>
                      <Avatar><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 13, margin: 0 }}>{user?.fullname}</p>
                      <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {user?.role === "Student" && (
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <motion.div
                          whileHover={{ background: "rgba(34,211,238,0.08)", x: 4 }}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 10px", borderRadius: 8, color: "#94a3b8",
                            fontSize: 13, cursor: "pointer",
                          }}
                        >
                          <User2 size={14} /> Profile
                        </motion.div>
                      </Link>
                    )}
                    <motion.button
                      onClick={logoutHandler}
                      whileHover={{ background: "rgba(239,68,68,0.1)", x: 4 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 10px", borderRadius: 8, color: "#f87171",
                        fontSize: 13, border: "none", background: "transparent",
                        cursor: "pointer", fontFamily: "var(--font-body)",
                        width: "100%", textAlign: "left",
                      }}
                    >
                      <LogOut size={14} /> Logout
                    </motion.button>
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, padding: "6px 8px", cursor: "pointer", color: "#f1f5f9",
            display: "none",
          }}
          className="mobile-menu-btn"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "x" : "m"}
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            style={{
              background: "rgba(10,10,15,0.96)", backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={to}
                    style={{
                      textDecoration: "none", display: "block",
                      padding: "10px 12px", borderRadius: 10,
                      color: location.pathname === to ? "#22d3ee" : "#94a3b8",
                      fontWeight: 500, fontSize: 15,
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
                {!user ? (
                  <>
                    <Link to="/login" style={{ flex: 1, textDecoration: "none" }}>
                      <button style={{ width: "100%", padding: 10, borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.14)", color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer" }}>Login</button>
                    </Link>
                    <Link to="/register" style={{ flex: 1, textDecoration: "none" }}>
                      <button style={{ width: "100%", padding: 10, borderRadius: 10, background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", border: "none", color: "#0a0a0f", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Register</button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={logoutHandler}
                    style={{ width: "100%", padding: 10, borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer" }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;