import React from "react";
import Navbar from "../components_lite/Navbar";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

const sections = [
  {
    n: "1", title: "Introduction",
    content: 'Welcome to Job Portal. These Terms and Conditions govern your use of our website. By accessing or using our website, you agree to comply with these terms.',
  },
  {
    n: "2", title: "Acceptance of Terms",
    content: "By using our website, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our website.",
  },
  {
    n: "3", title: "Changes to Terms",
    content: "We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. Continued use of the website constitutes acceptance of the updated terms.",
  },
  {
    n: "4", title: "User Responsibilities",
    content: "You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the website.",
  },
  {
    n: "5", title: "Intellectual Property",
    content: "All content, trademarks, and intellectual property on this website are owned by or licensed to Job Portal. You may not reproduce, distribute, or create derivative works without prior written permission.",
  },
  {
    n: "6", title: "Limitation of Liability",
    content: "To the fullest extent permitted by law, Job Portal shall not be liable for any damages arising from your use of the website.",
  },
  {
    n: "7", title: "Governing Law",
    content: "These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes shall be subject to the exclusive jurisdiction of the relevant courts.",
  },
  {
    n: "8", title: "Contact Information",
    contact: true,
  },
];

const TermsofService = () => (
  <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
    <Navbar />
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <ScrollText size={22} color="#a3e635" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,5vw,42px)", color: "#f1f5f9", letterSpacing: "-1.5px", margin: "0 0 12px" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>Last updated: March 2025</p>
      </motion.div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sections.map(({ n, title, content, contact }, i) => (
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
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)", color: "#a3e635", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {n}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#f1f5f9", margin: 0, letterSpacing: "-0.3px" }}>{title}</h2>
            </div>
            <div style={{ paddingLeft: 40 }}>
              {content && <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, margin: 0 }}>{content}</p>}
              {contact && (
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, margin: 0 }}>
                  If you have any questions about these Terms and Conditions, please contact us at{" "}
                  <a href="mailto:your-email@example.com" style={{ color: "#a3e635", fontWeight: 600, textDecoration: "none" }}>
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

export default TermsofService;