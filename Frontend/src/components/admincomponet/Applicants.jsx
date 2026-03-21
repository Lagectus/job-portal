// ─── Applicants.jsx ──────────────────────────────────────────────────────────
import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "../../redux/applications";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (err) { console.error(err); }
    })();
  }, [params.id, dispatch]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={20} color="#f472b6" />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", color: "#f472b6", marginBottom: 4 }}>ADMIN PANEL</p>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "#f1f5f9", letterSpacing: "-1px", margin: 0 }}>
                Applicants
              </h1>
            </div>
          </div>
          <ApplicantsTable />
        </motion.div>
      </div>
    </div>
  );
};

export default Applicants;