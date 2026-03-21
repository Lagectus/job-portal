import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysAgo = (mongodbTime) => {
    const diff = new Date() - new Date(mongodbTime);
    const days = Math.floor(diff / (1000 * 24 * 60 * 60));
    return days === 0 ? "Today" : `${days}d ago`;
  };

  const colors = ["#22d3ee", "#a3e635", "#f472b6", "#fb923c", "#818cf8"];
  const accent = colors[Math.abs((job?.company?.name?.charCodeAt(0) || 0)) % colors.length];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "20px 20px 16px",
        fontFamily: "var(--font-body)",
        position: "relative", overflow: "hidden",
        transition: "background 0.25s, border-color 0.25s",
      }}
      onHoverStart={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.borderColor = accent + "30";
      }}
      onHoverEnd={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)`, borderRadius: "20px 20px 0 0" }} />

      {/* Row 1 — date + bookmark */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>{daysAgo(job?.createdAt)}</span>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: isBookmarked ? accent + "20" : "rgba(255,255,255,0.05)",
            border: `1px solid ${isBookmarked ? accent + "40" : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {isBookmarked
            ? <BookmarkCheck size={14} color={accent} />
            : <Bookmark size={14} color="#475569" />
          }
        </motion.button>
      </div>

      {/* Row 2 — company avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: accent + "18", border: `1px solid ${accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: accent,
          }}
        >
          {job?.company?.logo
            ? <img src={job.company.logo} alt="" style={{ width: "100%", height: "100%", borderRadius: 13, objectFit: "cover" }} />
            : job?.company?.name?.charAt(0) || "?"}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", margin: 0, lineHeight: 1.3 }}>{job?.company?.name}</p>
          <p style={{ fontSize: 11, color: "#475569", margin: "2px 0 0" }}>India</p>
        </div>
      </div>

      {/* Job title + desc */}
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.3px", lineHeight: 1.3 }}>
        {job?.title}
      </h3>
      <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, margin: "0 0 14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {job?.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
        {[
          { icon: <MapPin size={10} />, label: job?.location },
          { icon: <Clock size={10} />, label: job?.jobType },
          { icon: <DollarSign size={10} />, label: `${job?.salary} LPA` },
        ].map(({ icon, label }) => (
          <span
            key={label}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 9px", borderRadius: 100,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#64748b", fontSize: 11, fontWeight: 500,
            }}
          >
            <span style={{ color: accent }}>{icon}</span>{label}
          </span>
        ))}
        <span style={{ padding: "3px 9px", borderRadius: 100, background: accent + "12", border: `1px solid ${accent}25`, color: accent, fontSize: 11, fontWeight: 600 }}>
          {job?.position} open
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/description/${job?._id}`)}
          style={{
            flex: 1, padding: "9px 0", borderRadius: 10,
            background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
            color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#f1f5f9"; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#94a3b8"; }}
        >
          Details <ArrowUpRight size={12} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 0 16px ${accent}40` }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { e.stopPropagation(); setIsBookmarked(true); }}
          style={{
            flex: 1, padding: "9px 0", borderRadius: 10,
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            border: "none", color: "#0a0a0f",
            fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Save for Later
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Job;