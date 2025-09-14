import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const BMICalculator = ({ user }) => {
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let status = "", color = "";
  if (bmi < 18.5) { status = "Underweight"; color = "#93c5fd"; }
  else if (bmi < 25) { status = "Normal"; color = "#34d399"; }
  else if (bmi < 30) { status = "Overweight"; color = "#fbbf24"; }
  else { status = "Obese"; color = "#f87171"; }

  const data = {
    labels: ["BMI", "Remaining to Healthy BMI"],
    datasets: [{ data: [bmi, Math.max(25-bmi,0)], backgroundColor: [color,"#e5e7eb"] }]
  };

  return (
    <div className="card">
      <h3>BMI Calculator</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 45%" }}>
          <label>Height (cm)</label>
          <input className="input" type="number" value={height} onChange={e=>setHeight(e.target.value)} />
          <label>Weight (kg)</label>
          <input className="input" type="number" value={weight} onChange={e=>setWeight(e.target.value)} />
          <p><strong>BMI:</strong> {bmi} ({status})</p>
        </div>
        <div style={{ flex: "1 1 45%" }}>
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
