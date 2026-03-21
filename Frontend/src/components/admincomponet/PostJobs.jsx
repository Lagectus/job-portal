import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector } from "react-redux";
import { JOB_API_ENDPOINT } from "../../utils/data";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const PostJobs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "", description: "", salary: "", location: "",
    companyId: "", position: 0, requirements: "", experience: "", jobType: "",
  });
  const { companies } = useSelector((s) => s.company);

  const set = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));

  const selectCompany = (e) => {
    const selected = companies.find((c) => c.name.toLowerCase() === e.target.value);
    if (selected) setInput((p) => ({ ...p, companyId: selected._id }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" }, withCredentials: true,
      });
      if (res.data.success) { toast.success(res.data.message); navigate("/admin/Jobs"); }
      else { toast.error(res.data.message); navigate("/admin/Jobs"); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const fields = [
    { name: "title",        type: "text",   label: "Job Title",       placeholder: "e.g. Frontend Developer" },
    { name: "description",  type: "text",   label: "Description",     placeholder: "Brief job description" },
    { name: "location",     type: "text",   label: "Location",        placeholder: "e.g. Delhi, Remote" },
    { name: "salary",       type: "number", label: "Salary (LPA)",    placeholder: "e.g. 12" },
    { name: "position",     type: "number", label: "Openings",        placeholder: "Number of positions" },
    { name: "requirements", type: "text",   label: "Requirements",    placeholder: "React, Node.js, MongoDB" },
    { name: "experience",   type: "number", label: "Experience (yrs)",placeholder: "e.g. 2" },
    { name: "jobType",      type: "text",   label: "Job Type",        placeholder: "Full-time / Part-time" },
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
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
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
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#a3e635,#22d3ee,transparent)", borderRadius: "24px 24px 0 0" }} />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/Jobs")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                borderRadius: 10, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8",
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              <ArrowLeft size={14} /> Back
            </motion.button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={18} color="#a3e635" />
              </div>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: 0, letterSpacing: "-0.5px" }}>
                  Post a New Job
                </h1>
                <p style={{ fontSize: 13, color: "#475569", margin: "2px 0 0" }}>Fill in the details to create a listing</p>
              </div>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
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
            </div>

            {/* Company select */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 7, letterSpacing: "0.5px" }}>
                SELECT COMPANY
              </label>
              {companies.length > 0 ? (
                <select
                  onChange={selectCompany}
                  defaultValue=""
                  onFocus={onFocus} onBlur={onBlur}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="" disabled style={{ background: "#12121a", color: "#64748b" }}>
                    Choose a company...
                  </option>
                  {companies.map((c) => (
                    <option key={c._id} value={c.name.toLowerCase()} style={{ background: "#12121a", color: "#f1f5f9" }}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ padding: "12px 16px", borderRadius: 11, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: 13, fontWeight: 500 }}>
                  ⚠ Please register a company first before posting a job.
                </div>
              )}
            </div>

            <motion.button
              type="submit" disabled={loading || companies.length === 0}
              whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 24px rgba(163,230,53,0.35)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{
                width: "100%", padding: "13px", borderRadius: 12,
                background: "linear-gradient(135deg,#a3e635,#65a30d)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15,
                cursor: loading || companies.length === 0 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: loading || companies.length === 0 ? 0.6 : 1,
              }}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Posting...</> : "Post Job →"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJobs;