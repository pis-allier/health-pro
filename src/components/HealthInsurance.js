import React, { useState } from "react";

const HealthInsurance = () => {
  const [provider, setProvider] = useState("");
  const [policy, setPolicy] = useState("");
  const [expiry, setExpiry] = useState("");

  const saveInsurance = () => {
    if (!provider || !policy || !expiry) {
      alert("Please fill all fields!");
      return;
    }
    alert(`Insurance saved: ${provider}, Policy: ${policy}, Expiry: ${expiry}`);
  };

  return (
    <div className="card">
      <h2>Health Insurance Manager</h2>

      <input
        type="text"
        placeholder="Provider Name"
        className="input"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />

      <input
        type="text"
        placeholder="Policy Number"
        className="input"
        value={policy}
        onChange={(e) => setPolicy(e.target.value)}
      />

      <input
        type="date"
        className="input"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />

      <button onClick={saveInsurance} className="button">
        Save Insurance
      </button>
    </div>
  );
};

export default HealthInsurance;
