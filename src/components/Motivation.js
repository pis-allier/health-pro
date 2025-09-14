import React, { useEffect, useState } from "react";

const QUOTES = [
  "Push yourself, because no one else is going to do it for you.",
  "Your body can stand almost anything. It’s your mind you have to convince.",
  "Fitness is not about being better than someone else. It’s about being better than you used to be.",
  "A little progress each day adds up to big results.",
  "Don’t stop until you’re proud.",
  "Sweat is just fat crying.",
  "Discipline is choosing between what you want now and what you want most.",
  "The only bad workout is the one that didn’t happen."
];

const DOCTORS = [
  { name: "Dr. Asha Menon", text: "This app is a game-changer for preventive healthcare.", avatar: "👩‍⚕️" },
  { name: "Dr. Rajiv Sharma", text: "I recommend it to my patients for daily fitness tracking.", avatar: "👨‍⚕️" },
  { name: "Dr. Leena Patel", text: "Engaging, reliable, and motivates patients to stay active.", avatar: "👩‍⚕️" }
];

const USERS = [
  { name: "Ravi Kumar", text: "I lost 8 kg in 3 months using this app — love it!", avatar: "🧑" },
  { name: "Ananya Gupta", text: "The water tracker keeps me hydrated all day.", avatar: "👩" },
  { name: "Karan Singh", text: "Challenges make workouts fun. Feels like a game!", avatar: "🧑‍💻" }
];

const Motivation = () => {
  const [tab, setTab] = useState("quotes");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [doctorIndex, setDoctorIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0);

  // Auto-rotate per tab
  useEffect(() => {
    const interval = setInterval(() => {
      if (tab === "quotes") {
        setQuoteIndex(prev => (prev + 1) % QUOTES.length);
      } else if (tab === "doctors") {
        setDoctorIndex(prev => (prev + 1) % DOCTORS.length);
      } else if (tab === "users") {
        setUserIndex(prev => (prev + 1) % USERS.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [tab]);

  const renderTestimonial = (item) => (
    <div style={testimonialBox}>
      <div style={avatar}>{item.avatar}</div>
      <div>
        <p style={{ fontStyle: "italic", marginBottom: "6px" }}>"{item.text}"</p>
        <b style={{ color: "#111" }}>{item.name}</b>
      </div>
    </div>
  );

  return (
    <div className="card" style={{ textAlign: "center", background: "#fdfdfd", minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <h3 style={{ marginBottom: "10px" }}>💡 Stay Inspired</h3>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
        <button onClick={() => setTab("quotes")} style={tab === "quotes" ? btnActive : btn}>Motivation</button>
        <button onClick={() => setTab("doctors")} style={tab === "doctors" ? btnActive : btn}>Doctors</button>
        <button onClick={() => setTab("users")} style={tab === "users" ? btnActive : btn}>Users</button>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {tab === "quotes" && <p style={{ fontSize: "16px", fontWeight: "500" }}>"{QUOTES[quoteIndex]}"</p>}
        {tab === "doctors" && renderTestimonial(DOCTORS[doctorIndex])}
        {tab === "users" && renderTestimonial(USERS[userIndex])}
      </div>

      {/* Gamification */}
      <div style={{ marginTop: "15px", fontSize: "14px" }}>
        <span role="img" aria-label="fire">🔥</span> Streak: <b>{Math.floor(Math.random() * 30) + 1} days</b>
      </div>
      <div style={{ marginTop: "5px", fontSize: "13px", color: "#4f46e5" }}>
        🏅 Earn badges by completing daily workouts!
      </div>
    </div>
  );
};

const btn = {
  padding: "6px 12px",
  margin: "0 4px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#fff",
  fontSize: "13px"
};

const btnActive = {
  ...btn,
  background: "#4f46e5",
  color: "#fff",
  fontWeight: "600"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  minHeight: "100px",
  transition: "opacity 0.5s ease-in-out"
};

const testimonialBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "10px",
  background: "#f1f5f9",
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)"
};

const avatar = {
  fontSize: "32px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

export default Motivation;
