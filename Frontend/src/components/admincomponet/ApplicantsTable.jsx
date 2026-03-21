import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, FileText, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { motion, AnimatePresence } from "framer-motion";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((s) => s.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status });
      if (res.data.success) toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const thStyle = {
    padding: "12px 16px", fontSize: 11, fontWeight: 600,
    color: "#475569", letterSpacing: "0.5px", textAlign: "left",
  };
  const tdStyle = {
    padding: "14px 16px", fontSize: 13, color: "#94a3b8",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  const apps = applicants?.applications || [];

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <th style={thStyle}>APPLICANT</th>
            <th style={thStyle}>EMAIL</th>
            <th style={thStyle}>PHONE</th>
            <th style={thStyle}>RESUME</th>
            <th style={thStyle}>APPLIED ON</th>
            <th style={{ ...thStyle, textAlign: "right" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {apps.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: "60px 0", textAlign: "center", color: "#334155", fontSize: 14 }}>
                No applicants yet
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {apps.map((item, i) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  style={{ transition: "background 0.15s" }}
                >
                  {/* Name */}
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(244,114,182,0.15)", border: "1px solid rgba(244,114,182,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, color: "#f472b6", flexShrink: 0 }}>
                        {item?.applicant?.fullname?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{item?.applicant?.fullname}</span>
                    </div>
                  </td>
                  {/* Email */}
                  <td style={tdStyle}>
                    <a href={`mailto:${item?.applicant?.email}`} style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 500 }}>
                      {item?.applicant?.email}
                    </a>
                  </td>
                  {/* Phone */}
                  <td style={tdStyle}>{item?.applicant?.phoneNumber || "—"}</td>
                  {/* Resume */}
                  <td style={tdStyle}>
                    {item.applicant?.profile?.resume ? (
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 100, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee", fontSize: 12, fontWeight: 600, textDecoration: "none" }}
                      >
                        <FileText size={11} /> Download
                      </a>
                    ) : (
                      <span style={{ color: "#334155" }}>N/A</span>
                    )}
                  </td>
                  {/* Date */}
                  <td style={tdStyle}>{item?.applicant?.createdAt?.split("T")[0]}</td>
                  {/* Action */}
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
                        {shortlistingStatus.map((status) => (
                          <motion.div
                            key={status}
                            whileHover={{ background: status === "Accepted" ? "rgba(163,230,53,0.08)" : "rgba(248,113,113,0.08)", x: 3 }}
                            onClick={() => statusHandler(status, item._id)}
                            style={{
                              display: "flex", alignItems: "center", gap: 8,
                              padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                              color: status === "Accepted" ? "#a3e635" : "#f87171",
                              fontSize: 13, fontWeight: 600, margin: "2px 0",
                            }}
                          >
                            {status === "Accepted" ? <CheckCircle size={13} /> : <XCircle size={13} />}
                            {status}
                          </motion.div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
      {apps.length > 0 && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "#334155" }}>
          {apps.length} total {apps.length === 1 ? "applicant" : "applicants"}
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;