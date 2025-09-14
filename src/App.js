import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import usersData from "./data/users.json"; // ✅ make sure this path is correct
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {!user ? (
        <div className="center-screen">
          {showRegister ? (
            <Register
              users={usersData}       // ✅ pass users correctly
              setUser={setUser}
              goToLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login
              users={usersData}       // ✅ pass users correctly
              setUser={setUser}
              goToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      ) : (
        <Dashboard user={user} logout={() => setUser(null)} />
      )}
    </>
  );
}

export default App;
