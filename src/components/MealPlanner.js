import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";

const MealPlanner = ({ user }) => {
  // Mock calories + macros (you’d normally fetch from DB or API)
  const meals = user.meals.map((meal, i) => ({
    name: meal,
    calories: Math.floor(150 + Math.random() * 250),
    carbs: Math.floor(20 + Math.random() * 40),
    protein: Math.floor(10 + Math.random() * 30),
    fat: Math.floor(5 + Math.random() * 15),
  }));

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const goalCalories = 2000; // could make user-specific later
  const progress = Math.min((totalCalories / goalCalories) * 100, 100);

  const pieData = {
    labels: meals.map((m) => m.name),
    datasets: [
      {
        data: meals.map((m) => m.calories),
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24"],
      },
    ],
  };

  const barData = {
    labels: ["Carbs", "Protein", "Fat"],
    datasets: [
      {
        label: "Grams",
        data: [
          meals.reduce((sum, m) => sum + m.carbs, 0),
          meals.reduce((sum, m) => sum + m.protein, 0),
          meals.reduce((sum, m) => sum + m.fat, 0),
        ],
        backgroundColor: ["#fbbf24", "#34d399", "#60a5fa"],
      },
    ],
  };

  const [badge, setBadge] = useState("");

  const suggestMeal = () => {
    const suggestions = [
      "🥗 Add a fresh salad",
      "🍎 Have a fruit snack",
      "🥛 Include a glass of milk",
      "🍵 Try green tea instead of soda",
    ];
    const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
    setBadge(pick);
  };

  return (
    <div
      className="card"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ color: "#4f46e5", marginBottom: 10 }}>🥗 Meal Planner</h3>

      {/* Pie Chart for Calories */}
      <Pie data={pieData} />

      {/* Macro Breakdown */}
      <div style={{ marginTop: 20 }}>
        <h4>Macros</h4>
        <Bar data={barData} />
      </div>

      {/* Calorie Progress */}
      <div style={{ marginTop: 20 }}>
        <h4>Calories: {totalCalories} / {goalCalories}</h4>
        <div
          style={{
            height: 12,
            borderRadius: 6,
            background: "#eee",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                progress < 70
                  ? "#34d399"
                  : progress < 100
                  ? "#fbbf24"
                  : "#f87171",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button
          onClick={suggestMeal}
          style={{
            padding: "8px 14px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🍴 Suggest a Healthy Add-on
        </button>
        {badge && (
          <div style={{ marginTop: 12, fontWeight: 600, color: "#10b981" }}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
