import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowUpRight } from "lucide-react";

const JobCards = ({ job, index = 0 }) => {
  const navigate = useNavigate();
  const colors = ["#22d3ee", "#a3e635", "#f472b6", "#fb923c", "#818cf8"];
  const accent = colors[Math.abs((job?.company?.name?.charCodeAt(0) || 0)) % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, background: "rgba(255,255,255,0.07)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/description/${job._id}`)}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "22px 22px 18px",
        cursor: "pointer", transition: "all 0.25s ease",
        position: "relative", overflow: "hidden",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          borderRadius: "20px 20px 0 0",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div
          style={{
            width: 46, height: 46, borderRadius: 14,
            background: accent + "18", border: `1px solid ${accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: accent,
          }}
        >
          {job?.company?.name?.charAt(0) || "?"}
        </div>
        <motion.div whileHover={{ scale: 1.15, color: accent }} style={{ color: "#334155", transition: "color 0.2s" }}>
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      <p style={{ fontSize: 11, fontWeight: 600, color: "#475569", letterSpacing: "0.5px", marginBottom: 4 }}>
        {job?.company?.name?.toUpperCase()}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
          color: "#f1f5f9", marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.3px",
        }}
      >
        {job?.title}
      </h3>
      <p
        style={{
          fontSize: 12, color: "#475569", marginBottom: 16, lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}
      >
        {job?.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {[
          { icon: <MapPin size={11} />, label: job?.location },
          { icon: <Clock size={11} />, label: job?.jobType },
          { icon: <DollarSign size={11} />, label: `${job?.salary} LPA` },
        ].map(({ icon, label }) => (
          <span
            key={label}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 10px", borderRadius: 100,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#64748b", fontSize: 11, fontWeight: 500,
            }}
          >
            <span style={{ color: accent }}>{icon}</span>{label}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ fontSize: 11, color: "#334155", fontWeight: 600 }}>
          {job?.position} opening{job?.position > 1 ? "s" : ""}
        </span>
        <span
          style={{
            fontSize: 11, color: accent, fontWeight: 600,
            padding: "3px 12px", borderRadius: 100,
            background: accent + "15", border: `1px solid ${accent}25`,
          }}
        >
          Apply →
        </span>
      </div>
    </motion.div>
  );
};

export default JobCards;