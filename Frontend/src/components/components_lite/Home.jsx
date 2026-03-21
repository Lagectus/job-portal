import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") navigate("/admin/companies");
  }, [user, navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />
      <Header />
      <Categories />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "2px solid rgba(34,211,238,0.2)",
              borderTopColor: "#22d3ee",
            }}
          />
        </div>
      ) : error ? (
        <p style={{ color: "#f87171", textAlign: "center", padding: 40 }}>{error}</p>
      ) : (
        <LatestJobs />
      )}
      <Footer />
    </div>
  );
};

export default Home;