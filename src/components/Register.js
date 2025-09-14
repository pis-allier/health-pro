import React, { useState } from "react";

const Register = ({ users, setUser, goToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");

  const handleRegister = () => {
    const uname = username.trim();
    const pwd = password.trim();
    const fullname = name.trim();

    if (!uname || !pwd || !fullname) {
      setError("Please fill all fields!");
      return;
    }

    if (users.find(u => u.username === uname)) {
      setError("Username already exists!");
      return;
    }

    const newUser = {
      id: users.length + 1,
      username: uname,
      password: pwd,
      name: fullname,
      gender: gender,
      age: 25,
      height: 170,
      weight: 65,
      bmi: 22,
      workouts: ["Push-ups", "Running"],
      meals: ["Oatmeal", "Salad"],
      progress: [
        { day: "Mon", weight: 65 },
        { day: "Tue", weight: 64.8 },
        { day: "Wed", weight: 64.5 }
      ]
    };

    setUser(newUser);
    setError("");
  };

  return (
    <div className="card" style={{ width: "350px" }}>
      <h2 style={{ textAlign: "center", color: "#4f46e5" }}>Register</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <input
        className="input"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
      <select
        className="input"
        value={gender}
        onChange={e => setGender(e.target.value)}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button className="button" onClick={handleRegister}>Register</button>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account?{" "}
        <span style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }} onClick={goToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
