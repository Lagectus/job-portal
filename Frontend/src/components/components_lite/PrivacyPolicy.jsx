import React from "react";
import Navbar from "../components_lite/Navbar";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const sections = [
  {
    n: "1", title: "Introduction",
    content: "This Privacy Policy outlines how we collect, use, and protect your information when you visit our job portal website.",
  },
  {
    n: "2", title: "Information We Collect",
    items: [
      { label: "Personal Information", sub: ["Name", "Email address", "Phone number", "Resume/CV"] },
      { label: "Usage Data", sub: ["IP address", "Browser type", "Pages visited", "Time spent on pages"] },
    ],
  },
  {
    n: "3", title: "How We Use Your Information",
    list: [
      "To provide and maintain our services",
      "To notify you about changes to our services",
      "To allow participation in interactive features",
      "To provide customer support",
      "To improve our services",
      "To monitor usage",
      "To detect and prevent technical issues",
    ],
  },
  {
    n: "4", title: "Data Security",
    content: "We take the security of your personal information seriously and implement appropriate technical and organizational measures.",
  },
  {
    n: "5", title: "Sharing Your Information",
    content: "We do not sell or rent your personal information to third parties. We may share information with:",
    list: ["Service providers assisting website operations", "Law enforcement agencies if required by law"],
  },
  {
    n: "6", title: "Your Rights",
    list: ["Access your personal information", "Request correction of your information", "Request deletion of your information"],
  },
  {
    n: "7", title: "Changes to This Privacy Policy",
    content: "We may update this Privacy Policy from time to time. Updates will be posted on this page.",
  },
  {
    n: "8", title: "Contact Us",
    contact: true,
  },
];

const PrivacyPolicy = () => (
  <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
    <Navbar />
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <Shield size={22} color="#22d3ee" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,5vw,42px)", color: "#f1f5f9", letterSpacing: "-1.5px", margin: "0 0 12px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>Last updated: March 2025</p>
      </motion.div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sections.map(({ n, title, content, items, list, contact }, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18, padding: "22px 24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: content || items || list || contact ? 12 : 0 }}>
              <span style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {n}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#f1f5f9", margin: 0, letterSpacing: "-0.3px" }}>{title}</h2>
            </div>

            <div style={{ paddingLeft: 40 }}>
              {content && <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, margin: 0 }}>{content}</p>}

              {items && items.map(({ label, sub }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", margin: "0 0 6px" }}>{label}</p>
                  <div style={{ paddingLeft: 12, borderLeft: "2px solid rgba(34,211,238,0.15)", display: "flex", flexDirection: "column", gap: 4 }}>
                    {sub.map((s) => <p key={s} style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{s}</p>)}
                  </div>
                </div>
              ))}

              {list && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {list.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22d3ee", marginTop: 7, flexShrink: 0 }} />
                      <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {contact && (
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, margin: 0 }}>
                  If you have any questions, please contact us at{" "}
                  <a href="mailto:your-email@example.com" style={{ color: "#22d3ee", fontWeight: 600, textDecoration: "none" }}>
                    your-email@example.com
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;