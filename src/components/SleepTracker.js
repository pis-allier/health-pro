import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const SleepTracker = () => {
  const [sleep, setSleep] = useState([7,6,8,5,7,6,7]);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div className="card">
      <h3>Sleep Tracker</h3>
      <Bar data={{labels:days,datasets:[{label:"Hours",data:sleep,backgroundColor:"#fbbf24"}]}}/>
      <button className="button" onClick={()=>setSleep([...sleep,Math.floor(Math.random()*3+5)].slice(-7))}>Add Random Sleep</button>
    </div>
  );
};

export default SleepTracker;
