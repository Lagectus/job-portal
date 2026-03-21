import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LatestJobs = () => {
  const { allJobs } = useSelector((s) => s.job);

  return (
    <section style={{ padding: "0 24px 100px", maxWidth: 1280, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "2px", color: "#22d3ee", marginBottom: 10 }}>
            FRESH OPPORTUNITIES
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "#f1f5f9", letterSpacing: "-1px", margin: 0 }}>
            Latest Openings
          </h2>
        </div>
        <Link to="/Browser" style={{ textDecoration: "none" }}>
          <motion.span
            whileHover={{ gap: 10 }}
            style={{ display: "flex", alignItems: "center", gap: 6, color: "#22d3ee", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", transition: "gap 0.2s" }}
          >
            View all <ArrowRight size={15} />
          </motion.span>
        </Link>
      </motion.div>

      {allJobs.length === 0 ? (
        <p style={{ color: "#334155", textAlign: "center", padding: "60px 0", fontFamily: "var(--font-body)" }}>
          No jobs available right now.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {allJobs.slice(0, 6).map((job, i) => (
            <JobCards key={job._id} job={job} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;