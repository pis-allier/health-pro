import React from "react";

const BADGES = [
  { id: "steps5k", title: "5k Steps", desc: "Walk 5,000 steps in a day", color: "#34d399", icon: "👟" },
  { id: "hydration", title: "Hydration Hero", desc: "Drink 8 glasses of water", color: "#60a5fa", icon: "💧" },
  { id: "streak3", title: "3-Day Streak", desc: "Active 3 days in a row", color: "#f97316", icon: "🔥" },
  { id: "sleep8", title: "Sleep Champ", desc: "Sleep 8 hrs in one night", color: "#8b5cf6", icon: "😴" }
 
];

const Badges = ({ earned = ["steps5k", "hydration"] }) => {
  return (
    <div style={card}>
      <div style={cardHeader}>🎖️ Your Badges</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {BADGES.map((b) => {
          const unlocked = earned.includes(b.id);
          return (
            <div
              key={b.id}
              style={{
                flex: "1 1 120px",
                minWidth: "120px",
                padding: "14px",
                borderRadius: "10px",
                background: unlocked ? b.color : "#f3f4f6",
                color: unlocked ? "#fff" : "#111",
                boxShadow: unlocked ? "0 4px 10px rgba(0,0,0,0.15)" : "inset 0 1px 2px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{b.icon}</div>
              <div style={{ fontWeight: 700 }}>{b.title}</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>{b.desc}</div>
              {!unlocked && <div style={{ fontSize: "11px", marginTop: "6px", opacity: 0.6 }}>🔒 Locked</div>}
            </div>
          );
        })}
      </div>

      {/* Progress bar placeholder */}
      <div style={{ marginTop: "16px" }}>
        <div style={{ fontSize: "13px", marginBottom: "4px" }}>Progress to next badge</div>
        <div style={{ height: "8px", background: "#eee", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ width: "45%", height: "100%", background: "#34d399" }}></div>
        </div>
      </div>
    </div>
  );
};

const card = {
  background: "#fff",
  padding: 18,
  borderRadius: 12,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  margin: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "260px"
};

const cardHeader = { fontWeight: 700, marginBottom: 12 };

export default Badges;
