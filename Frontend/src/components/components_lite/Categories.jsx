import React from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Server, Layers, BarChart2, Shield,
  Cpu, Palette, Video, PackageOpen, BrainCircuit, Cloud, Megaphone,
} from "lucide-react";

const CATS = [
  { label: "Frontend Dev",    Icon: Code2,        color: "#22d3ee" },
  { label: "Backend Dev",     Icon: Server,       color: "#a3e635" },
  { label: "Full Stack",      Icon: Layers,       color: "#f472b6" },
  { label: "Data Scientist",  Icon: BarChart2,    color: "#fb923c" },
  { label: "DevOps",          Icon: Cloud,        color: "#818cf8" },
  { label: "Machine Learning",Icon: BrainCircuit, color: "#22d3ee" },
  { label: "Cybersecurity",   Icon: Shield,       color: "#a3e635" },
  { label: "UI/UX Design",    Icon: Palette,      color: "#f472b6" },
  { label: "AI Engineer",     Icon: Cpu,          color: "#fb923c" },
  { label: "Product Manager", Icon: PackageOpen,  color: "#818cf8" },
  { label: "Video Editor",    Icon: Video,        color: "#22d3ee" },
  { label: "Marketing",       Icon: Megaphone,    color: "#a3e635" },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const go = (q) => { dispatch(setSearchedQuery(q)); navigate("/Browser"); };

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "2px", color: "#22d3ee", marginBottom: 10 }}>
          EXPLORE ROLES
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "#f1f5f9", letterSpacing: "-1px", margin: 0 }}>
          Browse by Category
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
        {CATS.map(({ label, Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, background: "rgba(255,255,255,0.08)", borderColor: color + "50", scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => go(label)}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "20px 18px",
              cursor: "pointer", transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", gap: 12,
            }}
          >
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon size={18} color={color} strokeWidth={1.8} />
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#cbd5e1", lineHeight: 1.3 }}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;