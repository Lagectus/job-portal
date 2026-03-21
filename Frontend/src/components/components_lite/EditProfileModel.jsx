import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/data";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";
import { Loader2, X } from "lucide-react";
import { motion } from "framer-motion";

const EditProfileModel = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname:    user?.fullname    || "",
    email:       user?.email       || "",
    phoneNumber: user?.phoneNumber || "",
    bio:         user?.profile?.bio || "",
    skills:      user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const set     = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setFile = (e) => setInput((p) => ({ ...p, file: e.target.files?.[0] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",    input.fullname);
    formData.append("email",       input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio",         input.bio);
    formData.append("skills",      input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "fullname",    type: "text",  label: "Full Name",    placeholder: "Your full name" },
    { name: "email",       type: "email", label: "Email",        placeholder: "your@email.com" },
    { name: "phoneNumber", type: "tel",   label: "Phone",        placeholder: "+91 XXXXX XXXXX" },
    { name: "bio",         type: "text",  label: "Bio",          placeholder: "Short bio..." },
    { name: "skills",      type: "text",  label: "Skills",       placeholder: "React, Node, MongoDB" },
  ];

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9", fontFamily: "var(--font-body)", fontSize: 14,
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
  };
  const onFocus = (e) => { e.target.style.borderColor = "rgba(34,211,238,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)";  e.target.style.boxShadow = "none"; };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        style={{
          background: "#12121a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24, padding: 0,
          maxWidth: 480, width: "95%",
          maxHeight: "90vh", overflow: "hidden",
          fontFamily: "var(--font-body)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            position: "relative",
          }}
        >
          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#22d3ee,#a3e635,transparent)", borderRadius: "24px 24px 0 0" }} />

          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#f1f5f9", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
              Edit Profile
            </h2>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
              Update your details and resume
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={15} color="#64748b" />
          </motion.button>
        </div>

        {/* Form */}
        <div style={{ padding: "20px 28px 28px", overflowY: "auto", maxHeight: "calc(90vh - 100px)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {fields.map(({ name, type, label, placeholder }) => (
              <div key={name}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 6, letterSpacing: "0.5px" }}>
                  {label.toUpperCase()}
                </label>
                <input
                  type={type} name={name}
                  value={input[name]} onChange={set}
                  placeholder={placeholder}
                  onFocus={onFocus} onBlur={onBlur}
                  style={inputStyle}
                />
              </div>
            ))}

            {/* Resume upload */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 6, letterSpacing: "0.5px" }}>
                RESUME (PDF)
              </label>
              <div
                style={{
                  border: "1px dashed rgba(34,211,238,0.25)", borderRadius: 10,
                  padding: "14px 16px", cursor: "pointer", position: "relative",
                  background: "rgba(34,211,238,0.03)", transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)"; e.currentTarget.style.background = "rgba(34,211,238,0.06)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)"; e.currentTarget.style.background = "rgba(34,211,238,0.03)"; }}
              >
                <input
                  type="file" accept="application/pdf" onChange={setFile}
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
                />
                <p style={{ fontSize: 13, color: input.file ? "#22d3ee" : "#475569", margin: 0, fontWeight: input.file ? 600 : 400, textAlign: "center" }}>
                  {input.file ? `✓ ${input.file.name}` : "Click to upload PDF resume"}
                </p>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(34,211,238,0.35)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: 6, padding: "13px", borderRadius: 12,
                background: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                border: "none", color: "#0a0a0f",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : (
                "Save Changes →"
              )}
            </motion.button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModel;