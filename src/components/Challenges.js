import React, { useEffect, useState, useCallback } from "react";

const SAMPLE_CHALLENGES = [
  "20 push-ups",
  "Drink 2L water",
  "Walk 5,000 steps",
  "Meditate 10 minutes",
  "Take a 15-min stretch break",
  "Climb 5 flights of stairs",
  "Hold plank for 60s",
  "Eat 2 servings of fruit",
  "Skip sugary drinks today",
  "Sleep 8 hours tonight",
  "Do 30 squats",
  "Run/jog 1 km",

];

const Challenges = ({ persistKey = "demo_challenges" }) => {
  const [todayChallenges, setTodayChallenges] = useState([]);
  const [completed, setCompleted] = useState({});
  const [reward, setReward] = useState("");

  // ✅ Memoized function (doesn't recreate every render)
  const generateChallenges = useCallback(() => {
    const shuffled = [...SAMPLE_CHALLENGES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const initialCompleted = {};
    selected.forEach((c) => (initialCompleted[c] = false));
    setTodayChallenges(selected);
    setCompleted(initialCompleted);
    setReward("");
    localStorage.setItem(
      persistKey,
      JSON.stringify({ challenges: selected, completed: initialCompleted })
    );
  }, [persistKey]);

  // ✅ initialize challenges once
  useEffect(() => {
    const stored = localStorage.getItem(persistKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setTodayChallenges(parsed.challenges);
      setCompleted(parsed.completed || {});
      return;
    }
    generateChallenges();
  }, [persistKey, generateChallenges]);

  const toggle = (ch) => {
    const next = { ...completed, [ch]: !completed[ch] };
    setCompleted(next);
    if (!completed[ch]) setReward("🎉 Great job!");
    else setReward("");
    localStorage.setItem(
      persistKey,
      JSON.stringify({ challenges: todayChallenges, completed: next })
    );
  };

  return (
    <div style={card} className="challenge-card">
      <div style={cardHeader}>🏆 Daily Challenges</div>
      <div>
        {todayChallenges.map((c, i) => (
          <div
            key={i}
            style={{
              ...challengeItem,
              textDecoration: completed[c] ? "line-through" : "none",
              opacity: completed[c] ? 0.6 : 1
            }}
          >
            <span>{c}</span>
            <input
              type="checkbox"
              checked={!!completed[c]}
              onChange={() => toggle(c)}
            />
          </div>
        ))}
      </div>

      {reward && (
        <div style={{ marginTop: 10, fontWeight: "600", color: "#10b981" }}>
          {reward}
        </div>
      )}

      <div style={{ marginTop: 14, textAlign: "center" }}>
        <button
          style={primaryBtn}
          onClick={generateChallenges}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          🔀 Shuffle Challenges
        </button>
      </div>
    </div>
  );
};

// 🎨 Styles
const card = {
  background: "#fff",
  padding: 18,
  borderRadius: 12,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  margin: 8,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  minHeight: 220,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const cardHeader = {
  fontWeight: 700,
  marginBottom: 12,
  fontSize: "18px",
  color: "#4f46e5"
};

const challengeItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 6px",
  borderBottom: "1px solid #f1f1f1",
  transition: "all 0.3s ease"
};

const primaryBtn = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  transition: "transform 0.2s ease"
};

export default Challenges;
