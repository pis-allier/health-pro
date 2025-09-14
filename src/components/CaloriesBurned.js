// src/components/CaloriesBurned.js
import React, { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesBurned = ({ steps = 4000, heartRate = 75, goal = 500 }) => {
  // Simple estimation algorithm for demo purposes:
  // baseCaloriesFromSteps = steps * 0.04 (approx)
  // heartRateFactor adds a small multiplier
  const estimate = (s, hr) => {
    const fromSteps = s * 0.04;
    const hrFactor = 1 + Math.max(0, (hr - 70)) * 0.005;
    return Math.round(fromSteps * hrFactor);
  };

  const [calories, setCalories] = useState(estimate(steps, heartRate));

  useEffect(() => {
    setCalories(estimate(steps, heartRate));
  }, [steps, heartRate]);

  const remaining = Math.max(goal - calories, 0);
  const data = useMemo(() => ({
    labels: ["Burned", "Remaining"],
    datasets: [{ data: [calories, remaining], backgroundColor: ["#fb923c", "#fde68a"] }]
  }), [calories, remaining]);

  return (
    <div style={card}>
      <div style={cardHeader}>🔥 Calories Burned</div>
      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 180px" }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{calories} kcal</div>
          <div style={{ color: "#555", marginTop: 6 }}>Goal: {goal} kcal</div>
          <div style={{ marginTop: 10 }}>
            <button style={smallButton} onClick={() => setCalories(c => Math.min(goal, c + 25))}>+25 kcal</button>
            <button style={{ ...smallButton, marginLeft: 8 }} onClick={() => setCalories(c => Math.max(0, c - 25))}>-25 kcal</button>
          </div>
        </div>
        <div style={{ flex: "1 1 220px", minWidth: 180 }}>
          <Doughnut data={data} options={{ plugins: { legend: { display: false } } }} />
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
};
const cardHeader = { fontWeight: 700, marginBottom: 12 };
const smallButton = { padding: "8px 10px", borderRadius: 8, border: "none", background: "#f97316", color: "#fff", cursor: "pointer" };

export default CaloriesBurned;
