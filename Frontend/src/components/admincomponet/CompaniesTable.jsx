import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector((s) => s.company);
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    setFilterCompany(
      companies.filter((c) =>
        !searchCompanyByText || c?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      )
    );
  }, [companies, searchCompanyByText]);

  const thStyle = {
    padding: "12px 16px", fontSize: 11, fontWeight: 600,
    color: "#475569", letterSpacing: "0.5px", textAlign: "left",
  };
  const tdStyle = {
    padding: "14px 16px", fontSize: 14, color: "#94a3b8",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18, overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <th style={thStyle}>LOGO</th>
            <th style={thStyle}>COMPANY NAME</th>
            <th style={thStyle}>REGISTERED ON</th>
            <th style={{ ...thStyle, textAlign: "right" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: "60px 0", textAlign: "center", color: "#334155", fontSize: 14 }}>
                <Building2 size={32} color="#1e293b" style={{ margin: "0 auto 12px", display: "block" }} />
                No companies found
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {filterCompany.map((company, i) => (
                <motion.tr
                  key={company._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ transition: "background 0.15s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={tdStyle}>
                    <div
                      style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)",
                        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {company.logo
                        ? <Avatar style={{ width: "100%", height: "100%" }}><AvatarImage src={company.logo} /></Avatar>
                        : <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "#22d3ee" }}>{company.name?.charAt(0)}</span>
                      }
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: "#f1f5f9", fontWeight: 600 }}>{company.name}</td>
                  <td style={tdStyle}>{company.createdAt?.split("T")[0]}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <motion.button
                          whileHover={{ background: "rgba(255,255,255,0.08)" }}
                          style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                          <MoreHorizontal size={15} color="#64748b" />
                        </motion.button>
                      </PopoverTrigger>
                      <PopoverContent
                        style={{
                          width: 160, background: "#12121a",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 12, padding: 8,
                          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                        }}
                      >
                        <motion.div
                          whileHover={{ background: "rgba(34,211,238,0.08)", x: 3 }}
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                            color: "#94a3b8", fontSize: 13, fontWeight: 500,
                          }}
                        >
                          <Edit2 size={13} color="#22d3ee" /> Edit Company
                        </motion.div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
      {filterCompany.length > 0 && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "#334155" }}>
          {filterCompany.length} {filterCompany.length === 1 ? "company" : "companies"} registered
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;