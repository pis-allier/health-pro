import React, { useState } from "react";

const tutorialsData = {
  Chest: [
    { name: "Bench Press", video: "https://www.youtube.com/embed/gRVjAtPip0Y" },
    { name: "Push Ups", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
  ],
  Back: [
    { name: "Pull Ups", video: "https://www.youtube.com/embed/eGo4IYlbE5g" },
    { name: "Deadlift", video: "https://www.youtube.com/embed/op9kVnSso6Q" },
  ],
  Legs: [
    { name: "Squats", video: "https://www.youtube.com/embed/YaXPRqUwItQ" },
    { name: "Lunges", video: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
  ],
  Cardio: [
    { name: "HIIT Workout (10 min)", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
    { name: "Jump Rope Tutorial", video: "https://www.youtube.com/embed/1BZM97e9y9o" },
    { name: "Burpees", video: "https://www.youtube.com/embed/JZQA08SlJnM" },
  ],
};


const WorkoutTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("Chest");
  const [selectedTutorial, setSelectedTutorial] = useState(tutorialsData["Chest"][0]);
  const [completed, setCompleted] = useState([]); // track completed tutorials

  // Count total tutorials
  const totalTutorials = Object.values(tutorialsData).flat().length;
  const completedCount = completed.length;

  // Badge logic
  let badge = null;
  if (completedCount >= 2) badge = "🥉 Beginner";
  if (completedCount >= 4) badge = "🥈 Intermediate";
  if (completedCount >= 6) badge = "🥇 Pro";
  if (completedCount >= totalTutorials) badge = "🏆 Master Trainer";

  // Mark tutorial complete
  const markComplete = (tutorial) => {
    if (!completed.includes(tutorial.name)) {
      setCompleted([...completed, tutorial.name]);
    }
  };

  return (
    <div className="card">
      <h3>🏋️ Gym Workout Tutorials</h3>

      {/* Progress Bar */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontWeight: "bold" }}>
          Progress: {completedCount}/{totalTutorials} {badge && ` | Badge: ${badge}`}
        </div>
        <div style={{ height: "10px", background: "#eee", borderRadius: "5px", marginTop: "5px" }}>
          <div
            style={{
              width: `${(completedCount / totalTutorials) * 100}%`,
              height: "10px",
              background: "#4CAF50",
              borderRadius: "5px",
            }}
          ></div>
        </div>
      </div>

      {/* Category selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
        {Object.keys(tutorialsData).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedTutorial(tutorialsData[cat][0]);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: selectedCategory === cat ? "#4CAF50" : "#f1f1f1",
              color: selectedCategory === cat ? "white" : "black",
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div>
        {tutorialsData[selectedCategory].map((ex, i) => (
          <div
            key={i}
            style={{
              padding: "8px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              background: selectedTutorial.name === ex.name ? "#f9f9f9" : "transparent",
            }}
            onClick={() => setSelectedTutorial(ex)}
          >
            ▶ {ex.name} {completed.includes(ex.name) && "✅"}
          </div>
        ))}
      </div>

      {/* Video player + Complete button */}
      {selectedTutorial && (
        <div style={{ marginTop: "15px" }}>
          <iframe
            width="100%"
            height="200"
            src={selectedTutorial.video}
            title={selectedTutorial.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
          <button
            onClick={() => markComplete(selectedTutorial)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              background: "#2196F3",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutTutorials;
