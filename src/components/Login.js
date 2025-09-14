import React, { useState, useEffect } from "react";

const Login = ({ users, setUser, goToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const handleLogin = () => {
    if (!users || users.length === 0) {
      setError("No users available for login.");
      return;
    }

    const foundUser = users.find(
      u => u.username === username.trim() && u.password === password.trim()
    );

    if (foundUser) {
      setUser(foundUser);
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  useEffect(() => {
    // trigger animation once component mounts
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div
      className={`login-card ${animate ? "show" : ""}`}
      style={{
        width: "400px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      {/* 🌟 Animated Banner */}
      <div
        style={{
          background: "linear-gradient(270deg, #6366f1, #8b5cf6, #ec4899)",
          backgroundSize: "600% 600%",
          color: "white",
          textAlign: "center",
          padding: "35px 20px",
          fontSize: "26px",
          fontWeight: "800",
          letterSpacing: "1px",
          textTransform: "uppercase",
          position: "relative",
          animation: "gradientShift 6s ease infinite"
        }}
      >
        <span style={{ fontSize: "30px", marginRight: "10px" }}>🚀</span>
        Fitness-Tracker
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "6px",
            background: "rgba(255,255,255,0.8)",
            borderRadius: "3px",
            animation: "pulse 2s infinite"
          }}
        ></div>
      </div>

      {/* Login Section */}
      <div style={{ padding: "25px" }}>
        <h2 style={{ textAlign: "center", color: "#4f46e5" }}>Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
            onClick={goToRegister}
          >
            Register
          </span>
        </p>
      </div>

      {/* 🔥 Keyframes & Animations */}
      <style>
        {`
          /* Gradient banner animation */
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); opacity: 0.9; }
            50% { transform: translateX(-50%) scale(1.3); opacity: 1; }
            100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          }

          /* ✨ Card Slide & Fade */
          .login-card {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
          .login-card.show {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: all 0.3s;
          }

          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 8px rgba(99,102,241,0.5);
          }

          .button {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default Login;
