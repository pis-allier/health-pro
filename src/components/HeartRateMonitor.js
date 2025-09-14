// src/components/HeartRateMonitor.js
import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const HeartRateMonitor = ({ initialRate = 72 }) => {
  const [hr, setHr] = useState(initialRate);
  const [history, setHistory] = useState(Array.from({ length: 20 }, (_, i) => initialRate));
  const intervRef = useRef(null);

  useEffect(() => {
    // simulate wearable streaming: update every 3s
    intervRef.current = setInterval(() => {
      setHr(prev => {
        const next = Math.max(50, Math.min(140, Math.round(prev + (Math.random() * 10 - 5))));
        setHistory(h => [...h.slice(-19), next]);
        return next;
      });
    }, 3000);

    return () => clearInterval(intervRef.current);
  }, []);

  const labels = history.map((_, i) => `${i - history.length + 1}s`);
  const data = {
    labels,
    datasets: [
      {
        label: "BPM",
        data: history,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={card}>
      <div style={cardHeader}>💓 Heart Rate (Live)</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 220px" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{hr} <span style={{fontSize:14}}>bpm</span></div>
          <div style={{ color: "#555", marginTop: 6 }}>Status: {hr < 60 ? "Resting" : hr < 100 ? "Normal" : "Active/High"}</div>
        </div>
        <div style={{ flex: "2 1 420px", minWidth: 260 }}>
          <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 40, max: 150 } } }} />
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

const cardHeader = {
  fontWeight: 700,
  marginBottom: 12,
};

export default HeartRateMonitor;
