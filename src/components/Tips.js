import React, { useEffect, useState } from "react";

const Tips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/health?limit=5", {
      headers: { "X-Api-Key": "YOUR_API_KEY_HERE" }
    })
      .then((res) => res.json())
      .then((data) =>
        setTips(
          data.map((d, i) => ({
            title: d.tip || `Health Tip #${i + 1}`,
            desc: "Practical daily advice to keep you on track."
          }))
        )
      )
      .catch(() =>
        setTips([
          {
            title: "💧 Stay hydrated",
            desc: "Drink at least 2–3 liters of water a day to boost metabolism and energy."
          },
          {
            title: "🏃 Exercise regularly",
            desc: "30 minutes of brisk walking or light workout keeps your heart strong."
          },
          {
            title: "🥦 Eat more veggies",
            desc: "Fiber-rich veggies improve digestion and support long-term health."
          },
          {
            title: "😴 Sleep well",
            desc: "Aim for 7–8 hours of quality sleep to recover and recharge."
          },
          {
            title: "🧘 Manage stress",
            desc: "Try meditation, deep breathing, or yoga to keep stress in check."
          }
        ])
      );
  }, []);

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "260px"
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>💡 Health Tips</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tips.map((t, i) => (
          <li
            key={i}
            style={{
              marginBottom: "14px",
              padding: "10px",
              background: "#f9fafb",
              borderRadius: "8px",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              textAlign: "left"
            }}
          >
            <strong style={{ display: "block", marginBottom: "6px" }}>
              {t.title}
            </strong>
            <span style={{ fontSize: "14px", color: "#555" }}>{t.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
