import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// ✅ Register chart elements at top
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const CalorieCalculator = ({ user }) => {
  const [age, setAge] = useState(user.age);
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);
  const [gender, setGender] = useState(user.gender);
  const [activity, setActivity] = useState(1.2); // sedentary
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    let bmr = gender === "male" ?
      10*weight + 6.25*height - 5*age + 5 :
      10*weight + 6.25*height - 5*age - 161;
    setCalories(Math.round(bmr * activity));
  }, [age, weight, height, gender, activity]);

  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [{ data: [0.3*calories,0.5*calories,0.2*calories], backgroundColor: ["#f87171","#34d399","#60a5fa"] }]
  };

  return (
    <div className="card">
      <h3>Calorie Calculator</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 45%" }}>
          <label>Age</label>
          <input className="input" type="number" value={age} onChange={e=>setAge(e.target.value)} />
          <label>Height (cm)</label>
          <input className="input" type="number" value={height} onChange={e=>setHeight(e.target.value)} />
          <label>Weight (kg)</label>
          <input className="input" type="number" value={weight} onChange={e=>setWeight(e.target.value)} />
          <label>Gender</label>
          <select className="input" value={gender} onChange={e=>setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Activity</label>
          <select className="input" value={activity} onChange={e=>setActivity(parseFloat(e.target.value))}>
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Light</option>
            <option value={1.55}>Moderate</option>
            <option value={1.725}>Active</option>
            <option value={1.9}>Very Active</option>
          </select>
          <p><strong>Calories:</strong> {calories}</p>
        </div>
        <div style={{ flex: "1 1 45%" }}>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
