// ─── AdminJobs.jsx ───────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "../../redux/jobslice";
import AdminJobTable from "./AdminJobTable";
import useGetAlladminjob from "../../hooks/useGetAlladminjob";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

export const AdminJobs = () => {
  useGetAlladminjob();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => { dispatch(setSearchJobByText(input)); }, [input, dispatch]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", color: "#22d3ee", marginBottom: 6 }}>ADMIN PANEL</p>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "#f1f5f9", letterSpacing: "-1px", margin: 0 }}>
                Posted Jobs
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(163,230,53,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/admin/jobs/create")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 12,
                background: "linear-gradient(135deg,#a3e635,#65a30d)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}
            >
              <Plus size={16} /> Post New Job
            </motion.button>
          </div>

          <div
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${focused ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.09)"}`,
              borderRadius: 12, padding: "10px 16px", maxWidth: 380,
              marginBottom: 24, transition: "all 0.2s",
              boxShadow: focused ? "0 0 0 3px rgba(34,211,238,0.08)" : "none",
            }}
          >
            <Search size={16} color={focused ? "#22d3ee" : "#475569"} style={{ flexShrink: 0 }} />
            <input
              placeholder="Filter by name or role..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ background: "transparent", border: "none", outline: "none", color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14, width: "100%" }}
            />
          </div>

          <AdminJobTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminJobs;