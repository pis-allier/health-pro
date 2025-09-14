import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const WaterTracker = () => {
  const goal = 8;
  const [glasses, setGlasses] = useState(0);

  const data = { labels: ["Water", "Remaining"], datasets:[{data:[glasses,goal-glasses], backgroundColor:["#60a5fa","#e5e7eb"]}]};

  return (
    <div className="card">
      <h3>Water Intake Tracker</h3>
      <Doughnut data={data} />
      <button className="button" onClick={()=>setGlasses(Math.min(glasses+1,goal))}>Add Glass</button>
    </div>
  );
};

export default WaterTracker;
