import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((s) => s.job);

  const STATUS = {
    accepted: { color: "#a3e635", bg: "rgba(163,230,53,0.1)",  border: "rgba(163,230,53,0.25)",  Icon: CheckCircle },
    rejected: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", Icon: XCircle },
    pending:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)",  Icon: Clock },
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {allAppliedJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#334155" }}>
          <p style={{ fontSize: 15, fontWeight: 500 }}>No applications yet</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {allAppliedJobs.map((job, i) => {
            const cfg = STATUS[job?.status] || STATUS.pending;
            const { Icon } = cfg;
            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: "16px 20px",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", flexWrap: "wrap", gap: 12,
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 14, margin: "0 0 3px" }}>
                    {job.job?.title}
                  </p>
                  <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
                    {job.job?.company?.name} · {job?.createdAt?.split("T")[0]}
                  </p>
                </div>
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 14px", borderRadius: 100,
                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                    color: cfg.color, fontSize: 12, fontWeight: 700, textTransform: "capitalize",
                  }}
                >
                  <Icon size={12} /> {job?.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedJob;