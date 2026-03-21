import React, { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobslice";
import { motion } from "framer-motion";

const QUICK = ["React Developer", "Node.js", "Full Stack", "Remote", "Python"];
const STATS = [
  { n: "50K+", l: "Jobs Posted" },
  { n: "12K+", l: "Companies" },
  { n: "2M+", l: "Job Seekers" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const go = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/Browser");
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const up = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      style={{
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute", top: "15%", left: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "10%", right: "8%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ maxWidth: 760, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Badge */}
        <motion.div
          variants={up}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 16px", borderRadius: 100,
            background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
            color: "#22d3ee", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px",
            marginBottom: 28, fontFamily: "var(--font-body)",
          }}
        >
          <Sparkles size={12} /> INDIA'S #1 JOB PLATFORM
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={up}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(38px, 7vw, 76px)", lineHeight: 1.05,
            color: "#f1f5f9", letterSpacing: "-2px", marginBottom: 20,
          }}
        >
          Find Work That{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22d3ee, #a3e635)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Matters
          </span>
          <br />to You
        </motion.h1>

        <motion.p
          variants={up}
          style={{
            fontFamily: "var(--font-body)", fontSize: 17, color: "#64748b",
            lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px", fontWeight: 300,
          }}
        >
          Connect with top companies, discover roles built for your skills, and take
          the next big leap in your career.
        </motion.p>

        {/* Search */}
        <motion.div variants={up} style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${focused ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 16, padding: "6px 6px 6px 20px",
              alignItems: "center", gap: 12,
              transition: "all 0.3s ease",
              boxShadow: focused ? "0 0 0 4px rgba(34,211,238,0.08)" : "none",
              maxWidth: 600, margin: "0 auto",
            }}
          >
            <Search size={18} color={focused ? "#22d3ee" : "#475569"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
            <input
              type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Job title, company, or keyword..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 400,
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={go}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 12,
                background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              Search <ArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* Quick pills */}
        <motion.div
          variants={up}
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}
        >
          {QUICK.map((q) => (
            <motion.button
              key={q}
              whileHover={{ scale: 1.06, background: "rgba(34,211,238,0.12)", borderColor: "rgba(34,211,238,0.4)", color: "#22d3ee" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { dispatch(setSearchedQuery(q)); navigate("/Browser"); }}
              style={{
                padding: "5px 14px", borderRadius: 100,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {q}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={up}
          style={{
            display: "flex", justifyContent: "center",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "20px 0", maxWidth: 480, margin: "0 auto",
          }}
        >
          {STATS.map(({ n, l }, i) => (
            <div
              key={l}
              style={{
                flex: 1, textAlign: "center", padding: "0 20px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "#22d3ee", margin: "0 0 2px", letterSpacing: "-0.5px" }}>{n}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#475569", margin: 0, fontWeight: 500, letterSpacing: "0.3px" }}>
                {l.toUpperCase()}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Header;