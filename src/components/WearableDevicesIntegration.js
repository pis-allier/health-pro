import React, { useState, useEffect } from "react";

const devices = ["Fitbit", "Apple Watch", "Mi Band", "Garmin"];

const WearableDevicesIntegration = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [dummyData, setDummyData] = useState({
    heartRate: 70,
    steps: 1000,
    calories: 150,
  });
  const [autoConnect, setAutoConnect] = useState(false);

  useEffect(() => {
    if (autoConnect && selectedDevice) {
      // Simulate auto-connect delay
      const timer = setTimeout(() => {
        setConnectedDevice(selectedDevice);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoConnect, selectedDevice]);

  useEffect(() => {
    if (connectedDevice) {
      const interval = setInterval(() => {
        setDummyData((prevData) => ({
          heartRate: prevData.heartRate + Math.floor(Math.random() * 3),
          steps: prevData.steps + Math.floor(Math.random() * 10),
          calories: prevData.calories + Math.floor(Math.random() * 2),
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [connectedDevice]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📱 Wearable Device Integration (Prototype)</h2>

      {!connectedDevice ? (
        <div style={styles.controls}>
          <label style={styles.label}>
            Select Device:
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              style={styles.dropdown}
            >
              <option value="">-- Choose a Device --</option>
              {devices.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.autoConnect}>
            <input
              type="checkbox"
              checked={autoConnect}
              onChange={(e) => setAutoConnect(e.target.checked)}
            />
            Auto Connect
          </label>

          <button
            style={styles.connectButton}
            disabled={!selectedDevice}
            onClick={() => setConnectedDevice(selectedDevice)}
          >
            Connect Now
          </button>
        </div>
      ) : (
        <div style={styles.dataCard}>
          <h3 style={styles.subtitle}>Connected to: {connectedDevice}</h3>

          <div style={styles.dataList}>
            <div style={styles.dataItem}>
              ❤️ <span>Heart Rate:</span> {dummyData.heartRate} bpm
            </div>
            <div style={styles.dataItem}>
              🚶 <span>Steps:</span> {dummyData.steps}
            </div>
            <div style={styles.dataItem}>
              🔥 <span>Calories Burned:</span> {dummyData.calories} kcal
            </div>
          </div>

          <button
            style={styles.disconnectButton}
            onClick={() => {
              setConnectedDevice(null);
              setAutoConnect(false);
              setSelectedDevice("");
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "30px",
    fontSize: "28px",
    color: "#333",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  label: {
    fontSize: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minWidth: "220px",
  },
  autoConnect: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  connectButton: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    minWidth: "200px",
    transition: "background 0.3s ease",
  },
  dataCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  subtitle: {
    fontSize: "20px",
    color: "#555",
  },
  dataList: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  dataItem: {
    fontSize: "18px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "15px",
    minWidth: "150px",
    textAlign: "center",
  },
  disconnectButton: {
    marginTop: "25px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f44336",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default WearableDevicesIntegration;
