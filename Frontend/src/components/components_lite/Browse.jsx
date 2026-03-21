import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { setSearchedQuery } from "../../redux/jobslice";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((s) => s.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => { dispatch(setSearchedQuery("")); };
  }, [dispatch]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: 30, color: "#f1f5f9", letterSpacing: "-1px", marginBottom: 28,
          }}
        >
          All Jobs{" "}
          <span style={{ color: "#475569", fontSize: 18, fontWeight: 500 }}>
            ({allJobs.length})
          </span>
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
          {allJobs.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;