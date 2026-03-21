import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Mail, Phone, Pen, FileText, Briefcase, ExternalLink } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModel from "./EditProfileModel";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAllAppliedJob";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];
  const skillColors = ["#22d3ee", "#a3e635", "#f472b6", "#fb923c", "#818cf8"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <Navbar />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: 32, marginBottom: 20,
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#22d3ee,#a3e635,transparent)" }} />

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid rgba(34,211,238,0.4)", padding: 2, overflow: "hidden" }}>
                  <Avatar style={{ width: "100%", height: "100%" }}>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                </div>
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: "50%", background: "#a3e635", border: "2px solid #0a0a0f" }} />
              </div>

              {/* Name + bio */}
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#f1f5f9", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
                  {user?.fullname}
                </h1>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0, maxWidth: 320, lineHeight: 1.5 }}>
                  {user?.profile?.bio || "No bio added yet"}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.4)", color: "#22d3ee" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <Pen size={14} /> Edit Profile
            </motion.button>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 22 }} />

          {/* Contact info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
            {[
              { icon: <Mail size={14} />, label: user?.email, href: `https://mail.google.com/mail/?view=cm&to=${user?.email}`, target: "_blank" },
              { icon: <Phone size={14} />, label: user?.phoneNumber, href: `tel:${user?.phoneNumber}`, target: "_self" },
            ].filter(i => i.label).map(({ icon, label, href, target }) => (
              <a
                key={label} href={href} target={target}
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "7px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#64748b", fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <span style={{ color: "#22d3ee" }}>{icon}</span>{label}
              </a>
            ))}
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#475569", letterSpacing: "0.5px", marginBottom: 10 }}>SKILLS</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {skills.length ? skills.map((skill, i) => {
                const c = skillColors[i % skillColors.length];
                return (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      padding: "4px 14px", borderRadius: 100,
                      background: c + "14", border: `1px solid ${c}30`,
                      color: c, fontSize: 12, fontWeight: 600,
                    }}
                  >
                    {skill}
                  </motion.span>
                );
              }) : (
                <span style={{ fontSize: 13, color: "#334155" }}>No skills added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#475569", letterSpacing: "0.5px", marginBottom: 10 }}>RESUME</p>
            {user?.profile?.resume ? (
              <motion.a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.4)" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 18px", borderRadius: 12, textDecoration: "none",
                  background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
                  color: "#22d3ee", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                }}
              >
                <FileText size={14} />
                {user.profile.resumeOriginalName || "Download Resume"}
                <ExternalLink size={12} />
              </motion.a>
            ) : (
              <span style={{ fontSize: 13, color: "#334155" }}>No resume uploaded</span>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24, padding: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(163,230,53,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Briefcase size={15} color="#a3e635" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#f1f5f9", margin: 0, letterSpacing: "-0.3px" }}>
              Applied Jobs
            </h2>
          </div>
          <AppliedJob />
        </motion.div>

      </div>

      <EditProfileModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;