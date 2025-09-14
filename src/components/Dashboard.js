import React from "react";
import BMICalculator from "./BMICalculator";
import CalorieCalculator from "./CalorieCalculator";
import WorkoutPlanner from "./WorkoutPlanner";
import MealPlanner from "./MealPlanner";
import ProgressTracker from "./ProgressTracker";
import WaterTracker from "./WaterTracker";
import StepTracker from "./StepTracker";
import SleepTracker from "./SleepTracker";
import Tips from "./Tips";
import HealthMonitor from "./HealthMonitor";
import HeartRateMonitor from "./HeartRateMonitor";
import CaloriesBurned from "./CaloriesBurned";
import Challenges from "./Challenges";
import Badges from "./Badges";
import DeviceIntegrationBubble from "./DeviceIntegrationBubble";
import DoctorAppointment from "./DoctorAppointment";
import NearbyHospitals from "./NearbyHospitals";
import HealthInsurance from "./HealthInsurance";
import WorkoutTutorials from "./WorkoutTutorials";
import YogaTutorials from "./YogaTutorials";
import NutritionTips from "./NutritionTips";
import Motivation from "./Motivation";



const Dashboard = ({ user, logout }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    alignItems: "stretch",
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcome, {user.name}</h1>
        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
      {/* HealthMonitor full-width card */}
      <div style={{ margin: "20px 0" }}>
        <HealthMonitor userName={user.name} />
      </div>

      {/* Grid of other cards */}
      <div style={gridStyle}>
        <BMICalculator user={user} />
        <CalorieCalculator user={user} />
        <WorkoutPlanner user={user} />
        <MealPlanner user={user} />
        <ProgressTracker user={user} />
        <WaterTracker />
        <StepTracker />
        <SleepTracker />
        <HeartRateMonitor initialRate={72} />
        <CaloriesBurned steps={4000} heartRate={72} goal={600} />
        <Challenges />
        <WorkoutTutorials />
        <YogaTutorials />
<NutritionTips />

        <Badges earned={["steps5k"]} />
        <Tips apiKey={""} />
        <DoctorAppointment />
<NearbyHospitals />
<HealthInsurance />

<Motivation />


      </div>
       <DeviceIntegrationBubble />
    </div>
    
  );
};

export default Dashboard;
