import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage } from "lucide-react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById.jsx";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const param = useParams();
  useGetCompanyById(param.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });

  const set     = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setFile = (e) => setInput((p) => ({ ...p, file: e.target.files?.[0] }));

  useEffect(() => {
    setInput({
      name:        singleCompany.name        || "",
      description: singleCompany.description || "",
      website:     singleCompany.website     || "",
      location:    singleCompany.location    || "",
      file:        singleCompany.file        || null,
    });
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", input.name);
    fd.append("description", input.description);
    fd.append("website", input.website);
    fd.append("location", input.location);
    if (input.file) fd.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${param.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
      });
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else throw new Error("Unexpected API response.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name",        type: "text", label: "Company Name",        placeholder: "Acme Technologies",     icon: <Building2 size={14} /> },
    { name: "description", type: "text", label: "Description",         placeholder: "What does your company do?", icon: null },
    { name: "website",     type: "text", label: "Website",             placeholder: "https://company.com",   icon: <Globe size={14} /> },
    { name: "location",    type: "text", label: "Location",            placeholder: "Delhi, India",          icon: <MapPin size={14} /> },
  ];

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 11,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14,
    outline: "none", transition: "all 0.2s", boxSizing: "border-box",
  };
  const onFocus = (e) => { e.target.style.borderColor = "rgba(34,211,238,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)";  e.target.style.boxShadow = "none"; };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
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

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/companies")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={14} /> Back
            </motion.button>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: 0, letterSpacing: "-0.5px" }}>
                Company Setup
              </h1>
              <p style={{ fontSize: 13, color: "#475569", margin: "2px 0 0" }}>Update your company details</p>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {fields.map(({ name, type, label, placeholder }) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 7, letterSpacing: "0.5px" }}>
                    {label.toUpperCase()}
                  </label>
                  <input
                    type={type} name={name} value={input[name]}
                    onChange={set} placeholder={placeholder}
                    onFocus={onFocus} onBlur={onBlur}
                    style={inputStyle}
                  />
                </div>
              ))}

              {/* Logo upload */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 7, letterSpacing: "0.5px" }}>
                  COMPANY LOGO
                </label>
                <div
                  style={{
                    border: "1px dashed rgba(34,211,238,0.25)", borderRadius: 11,
                    padding: "16px", cursor: "pointer", position: "relative",
                    background: "rgba(34,211,238,0.03)", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)"; e.currentTarget.style.background = "rgba(34,211,238,0.06)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)"; e.currentTarget.style.background = "rgba(34,211,238,0.03)"; }}
                >
                  <input
                    type="file" name="file" accept="image/*" onChange={setFile}
                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
                  />
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,211,238,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileImage size={16} color="#22d3ee" />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: input.file ? "#22d3ee" : "#64748b", margin: 0, fontWeight: input.file ? 600 : 400 }}>
                      {input.file ? (typeof input.file === "string" ? "Current logo" : input.file.name) : "Click to upload company logo"}
                    </p>
                    <p style={{ fontSize: 11, color: "#334155", margin: "2px 0 0" }}>PNG, JPG, SVG recommended</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(34,211,238,0.35)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "13px", borderRadius: 12, marginTop: 8,
                background: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Save Changes →"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanySetup;