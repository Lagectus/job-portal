import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminJobTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((s) => s.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    setFilterJobs(
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        const q = searchJobByText.toLowerCase();
        return job.title?.toLowerCase().includes(q) || job?.company?.name?.toLowerCase().includes(q);
      })
    );
  }, [allAdminJobs, searchJobByText]);

  const thStyle = {
    padding: "12px 16px", fontSize: 11, fontWeight: 600,
    color: "#475569", letterSpacing: "0.5px", textAlign: "left",
  };
  const tdStyle = {
    padding: "14px 16px", fontSize: 14, color: "#94a3b8",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  const colors = ["#22d3ee", "#a3e635", "#f472b6", "#fb923c", "#818cf8"];

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <th style={thStyle}>COMPANY</th>
            <th style={thStyle}>ROLE</th>
            <th style={thStyle}>POSTED</th>
            <th style={{ ...thStyle, textAlign: "right" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: "60px 0", textAlign: "center", color: "#334155", fontSize: 14 }}>
                <Briefcase size={32} color="#1e293b" style={{ margin: "0 auto 12px", display: "block" }} />
                No jobs posted yet
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {filterJobs.map((job, i) => {
                const accent = colors[Math.abs((job?.company?.name?.charCodeAt(0) || 0)) % colors.length];
                return (
                  <motion.tr
                    key={job._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                    style={{ transition: "background 0.15s" }}
                  >
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: accent + "18", border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: accent, flexShrink: 0 }}>
                          {job?.company?.name?.charAt(0) || "?"}
                        </div>
                        <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{job?.company?.name}</span>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ padding: "3px 12px", borderRadius: 100, background: accent + "12", border: `1px solid ${accent}25`, color: accent, fontSize: 12, fontWeight: 600 }}>
                        {job.title}
                      </span>
                    </td>
                    <td style={tdStyle}>{job.createdAt?.split("T")[0]}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{ background: "rgba(255,255,255,0.08)" }}
                            style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                          >
                            <MoreHorizontal size={15} color="#64748b" />
                          </motion.button>
                        </PopoverTrigger>
                        <PopoverContent style={{ width: 170, background: "#12121a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 8, boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}>
                          <motion.div whileHover={{ background: "rgba(34,211,238,0.08)", x: 3 }} onClick={() => navigate(`/admin/companies/${job._id}`)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", color: "#94a3b8", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                            <Edit2 size={13} color="#22d3ee" /> Edit Job
                          </motion.div>
                          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                          <motion.div whileHover={{ background: "rgba(163,230,53,0.08)", x: 3 }} onClick={() => navigate(`/admin/Jobs/${job._id}/applicants`)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>
                            <Eye size={13} color="#a3e635" /> View Applicants
                          </motion.div>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          )}
        </tbody>
      </table>
      {filterJobs.length > 0 && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "#334155" }}>
          {filterJobs.length} {filterJobs.length === 1 ? "job" : "jobs"} posted
        </div>
      )}
    </div>
  );
};

export default AdminJobTable;