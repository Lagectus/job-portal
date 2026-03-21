import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/comapnySlice";
import axios from "axios";
import { motion } from "framer-motion";
import { Building2, ArrowRight, X } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) { toast.error("Please enter a company name"); return; }
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "80px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: 36,
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#22d3ee,#a3e635,transparent)", borderRadius: "24px 24px 0 0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={20} color="#22d3ee" />
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: 0, letterSpacing: "-0.5px" }}>
                Register Company
              </h1>
              <p style={{ fontSize: 13, color: "#475569", margin: "3px 0 0" }}>Add your company to start posting jobs</p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 8, letterSpacing: "0.5px" }}>
              COMPANY NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Technologies Pvt Ltd"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: `1.5px solid ${focused ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)"}`,
                boxShadow: focused ? "0 0 0 3px rgba(34,211,238,0.08)" : "none",
                color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14,
                outline: "none", transition: "all 0.2s", boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/admin/companies")}
              style={{
                flex: 1, padding: "12px", borderRadius: 12,
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 14,
                fontWeight: 600, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              <X size={14} /> Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(34,211,238,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={registerNewCompany}
              style={{
                flex: 2, padding: "12px", borderRadius: 12,
                background: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              Continue <ArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyCreate;