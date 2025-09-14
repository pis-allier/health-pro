import React from "react";
import { Line } from "react-chartjs-2";

const ProgressTracker = ({ user }) => {
  const data = {
    labels: user.progress.map(p => p.day),
    datasets: [
      {
        label: "Weight (kg)",
        data: user.progress.map(p => p.weight),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.2)"
      }
    ]
  };
  return (
    <div className="card">
      <h3>Progress Tracker</h3>
      <Line data={data} />
    </div>
  );
};

export default ProgressTracker;
