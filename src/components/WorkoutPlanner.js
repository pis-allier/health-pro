import React from "react";

const WorkoutPlanner = ({ user }) => {
  return (
    <div className="card">
      <h3>Workout Planner</h3>
      <div>
        {user.workouts.map((w,i)=>(
          <div key={i} style={{padding:"10px",borderBottom:"1px solid #eee"}}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
