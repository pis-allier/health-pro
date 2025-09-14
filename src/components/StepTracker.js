import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const StepTracker = () => {
  const [steps, setSteps] = useState([3000,4000,5000,6000,7000,8000,4000]);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div className="card">
      <h3>Step Tracker</h3>
      <Line data={{labels:days,datasets:[{label:"Steps",data:steps,borderColor:"#34d399"}]}}/>
      <button className="button" onClick={()=>setSteps([...steps,Math.floor(Math.random()*5000+3000)].slice(-7))}>Add Random Steps</button>
    </div>
  );
};

export default StepTracker;
