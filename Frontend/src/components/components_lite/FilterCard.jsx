import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobslice";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Kolhapur", "Pune", "Bangalore", "Hyderabad", "Chennai", "Remote"],
  },
  {
    filterType: "Technology",
    array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "frontend", "backend", "mobile", "desktop"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("Location");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const handleSelect = (item) => {
    setSelectedValue((prev) => (prev === item ? "" : item));
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#f1f5f9", margin: 0, letterSpacing: "-0.3px" }}>
          Filter Jobs
        </h2>
        {selectedValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSelectedValue("")}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "3px 10px", borderRadius: 100,
              background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)",
              color: "#22d3ee", fontSize: 11, fontWeight: 600, cursor: "pointer",
            }}
          >
            <X size={10} /> Clear
          </motion.button>
        )}
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

      {/* Active filter chip */}
      <AnimatePresence>
        {selectedValue && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ marginBottom: 14 }}
          >
            <p style={{ fontSize: 10, color: "#475569", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 6 }}>ACTIVE FILTER</p>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 100,
                background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)",
                color: "#22d3ee", fontSize: 12, fontWeight: 600,
              }}
            >
              {selectedValue}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filterData.map((data) => {
          const isOpen = activeFilter === data.filterType;
          return (
            <div key={data.filterType}>
              {/* Group header */}
              <button
                onClick={() => setActiveFilter(isOpen ? null : data.filterType)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "10px 12px", borderRadius: 10,
                  background: isOpen ? "rgba(34,211,238,0.06)" : "transparent",
                  border: isOpen ? "1px solid rgba(34,211,238,0.15)" : "1px solid transparent",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13,
                    color: isOpen ? "#22d3ee" : "#94a3b8",
                  }}
                >
                  {data.filterType}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} color={isOpen ? "#22d3ee" : "#475569"} />
                </motion.div>
              </button>

              {/* Options */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: "hidden", paddingLeft: 4 }}
                  >
                    <div style={{ padding: "6px 0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
                      {data.array.map((item) => {
                        const selected = selectedValue === item;
                        return (
                          <motion.button
                            key={item}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSelect(item)}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "7px 12px", borderRadius: 8, cursor: "pointer",
                              background: selected ? "rgba(34,211,238,0.1)" : "transparent",
                              border: selected ? "1px solid rgba(34,211,238,0.2)" : "1px solid transparent",
                              transition: "all 0.15s", textAlign: "left", width: "100%",
                            }}
                          >
                            {/* Custom radio dot */}
                            <div
                              style={{
                                width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                                border: `2px solid ${selected ? "#22d3ee" : "rgba(255,255,255,0.2)"}`,
                                background: selected ? "#22d3ee" : "transparent",
                                transition: "all 0.15s",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >
                              {selected && (
                                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0a0a0f" }} />
                              )}
                            </div>
                            <span
                              style={{
                                fontSize: 13, fontWeight: selected ? 600 : 400,
                                color: selected ? "#22d3ee" : "#64748b",
                                transition: "color 0.15s",
                              }}
                            >
                              {item}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCard;