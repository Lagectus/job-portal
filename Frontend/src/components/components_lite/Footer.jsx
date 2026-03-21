import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer
    style={{
      background: "rgba(255,255,255,0.02)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "40px 24px",
      fontFamily: "var(--font-body)",
    }}
  >
    <div
      style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", flexWrap: "wrap", gap: 20,
        justifyContent: "space-between", alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <div
          style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg,#22d3ee,#a3e635)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Zap size={14} color="#0a0a0f" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>
          Job<span style={{ color: "#22d3ee" }}>Portal</span>
        </span>
      </motion.div>

      <div style={{ display: "flex", gap: 24 }}>
        {[
          { to: "/PrivacyPolicy", l: "Privacy Policy" },
          { to: "/TermsofService", l: "Terms of Service" },
        ].map(({ to, l }) => (
          <Link
            key={to} to={to}
            style={{ textDecoration: "none", color: "#475569", fontSize: 13, fontWeight: 500 }}
            onMouseOver={(e) => (e.target.style.color = "#22d3ee")}
            onMouseOut={(e) => (e.target.style.color = "#475569")}
          >
            {l}
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "#334155" }}>
        © 2025{" "}
        <a
          href="https://github.com/lagectus"
          target="_blank" rel="noopener noreferrer"
          style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 600 }}
        >
          Sagar Vashist
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;