import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((s) => s.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery?.trim()) { setFilterJobs(allJobs); return; }
    const q = searchedQuery.toLowerCase();
    setFilterJobs(
      allJobs.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.description?.toLowerCase().includes(q) ||
          j.location?.toLowerCase().includes(q) ||
          j.salary?.toLowerCase().includes(q)
      )
    );
  }, [allJobs, searchedQuery]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 28 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: 32, color: "#f1f5f9", letterSpacing: "-1px", margin: 0,
            }}
          >
            {filterJobs.length} <span style={{ color: "#22d3ee" }}>Jobs</span> Found
          </h1>
        </motion.div>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* Filter Sidebar */}
          <div style={{ width: 256, flexShrink: 0, position: "sticky", top: 88 }}>
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          <div style={{ flex: 1 }}>
            {filterJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "80px 0" }}
              >
                <Search size={40} color="#334155" style={{ margin: "0 auto 16px", display: "block" }} />
                <p style={{ color: "#475569", fontSize: 16, fontWeight: 500 }}>No jobs match your search</p>
              </motion.div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
                <AnimatePresence>
                  {filterJobs.map((job, i) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;