import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../../utils/data";
import { setSingleJob } from "../../redux/jobslice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  MapPin, Briefcase, DollarSign, Clock,
  Users, Calendar, CheckCircle, ArrowUpRight,
} from "lucide-react";

const Description = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((s) => s.job);
  const { user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        dispatch(setSingleJob({
          ...singleJob,
          applications: [...(singleJob?.applications || []), { applicant: user?._id }],
        }));
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications?.some((a) => a.applicant === user?._id));
        } else setError("Failed to fetch");
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [jobId, dispatch, user?._id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(34,211,238,0.2)", borderTopColor: "#22d3ee" }}
      />
    </div>
  );

  if (error) return <p style={{ color: "#f87171", textAlign: "center", padding: 40 }}>{error}</p>;
  if (!singleJob) return null;

  const details = [
    { Icon: Briefcase, label: "Positions",   val: singleJob.position },
    { Icon: MapPin,    label: "Location",    val: singleJob.location },
    { Icon: DollarSign,label: "Salary",      val: `${singleJob.salary} LPA` },
    { Icon: Clock,     label: "Experience",  val: `${singleJob.experienceLevel} yrs` },
    { Icon: Users,     label: "Applicants",  val: singleJob.applications?.length || 0 },
    { Icon: Briefcase, label: "Type",        val: singleJob.jobType },
    { Icon: Calendar,  label: "Posted",      val: singleJob.createdAt?.split("T")[0] },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: 32, marginBottom: 16,
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#22d3ee,#a3e635,transparent)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#475569", letterSpacing: "1px", marginBottom: 8 }}>
                  {singleJob.company?.name?.toUpperCase()}
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-display)", fontWeight: 800,
                    fontSize: "clamp(24px,4vw,36px)", color: "#f1f5f9",
                    letterSpacing: "-1px", margin: "0 0 16px",
                  }}
                >
                  {singleJob.title}
                </h1>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[singleJob.location, singleJob.jobType, `${singleJob.salary} LPA`].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 14px", borderRadius: 100,
                        background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)",
                        color: "#22d3ee", fontSize: 12, fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={!isApplied ? applyJobHandler : undefined}
                disabled={isApplied}
                whileHover={!isApplied ? { scale: 1.04, boxShadow: "0 0 28px rgba(34,211,238,0.4)" } : {}}
                whileTap={!isApplied ? { scale: 0.97 } : {}}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 14,
                  background: isApplied ? "rgba(163,230,53,0.1)" : "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                  border: isApplied ? "1px solid rgba(163,230,53,0.3)" : "none",
                  color: isApplied ? "#a3e635" : "#0a0a0f",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
                  cursor: isApplied ? "default" : "pointer", whiteSpace: "nowrap",
                }}
              >
                {isApplied ? (
                  <><CheckCircle size={16} /> Applied</>
                ) : (
                  <>Apply Now <ArrowUpRight size={15} /></>
                )}
              </motion.button>
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: 28, marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 18, color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.3px",
              }}
            >
              About this Role
            </h2>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 15, fontWeight: 300 }}>
              {singleJob.description}
            </p>
          </div>

          {/* Details grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {details.map(({ Icon, label, val }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16, padding: "16px 18px",
                  display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(34,211,238,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  <Icon size={16} color="#22d3ee" />
                </div>
                <div>
                  <p style={{ fontSize: 10, color: "#334155", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 2 }}>
                    {label.toUpperCase()}
                  </p>
                  <p style={{ fontSize: 14, color: "#f1f5f9", fontWeight: 600, margin: 0 }}>{val}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Description;