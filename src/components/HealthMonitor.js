// src/components/HealthMonitor.js
import React, { useEffect, useRef, useState } from "react";
import doctors from "../data/doctors.json";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

const thresholds = {
  hr: { low: 40, high: 160 },
  spo2: { low: 90 },
  sysBP: { high: 160 },
  diaBP: { high: 100 },
  temp: { high: 39.5 }
};

const HealthMonitor = ({ userName = "Demo User" }) => {
  // vitals state
  const [hr, setHr] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [bp, setBp] = useState({ sys: 120, dia: 78 });
  const [temp, setTemp] = useState(36.6);

  // histories for charts
  const [hrHistory, setHrHistory] = useState(Array.from({ length: 30 }, () => 72));
  const [spo2History, setSpo2History] = useState(Array.from({ length: 30 }, () => 98));
  const [bpHistory, setBpHistory] = useState(Array.from({ length: 30 }, () => ({ sys: 120, dia: 78 })));

  // emergency state
  const [alert, setAlert] = useState(null);
  const [log, setLog] = useState([]);
  const intervalRef = useRef(null);

  // start simulation on mount
  useEffect(() => {
    intervalRef.current = setInterval(simulateVitals, 3000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // simulate vitals update
  function simulateVitals() {
    // HR random walk
    setHr(prev => {
      const next = clamp(Math.round(prev + randomBetween(-6, 8)), 35, 180);
      pushHistory(setHrHistory, next, 30);
      return next;
    });

    // SpO2 slight variations
    setSpo2(prev => {
      const next = clamp(Math.round(prev + randomBetween(-2, 1)), 85, 100);
      pushHistory(setSpo2History, next, 30);
      return next;
    });

    // BP small variation
    setBp(prev => {
      const sys = clamp(prev.sys + randomBetween(-4, 6), 90, 200);
      const dia = clamp(prev.dia + randomBetween(-3, 4), 60, 120);
      pushHistory(setBpHistory, { sys, dia }, 30);
      return { sys, dia };
    });

    // Temp small fluctuation
    setTemp(prev => Number((prev + (Math.random() * 0.2 - 0.05)).toFixed(1)));

    // after updating vitals, check thresholds
    setTimeout(checkThresholds, 100);
  }

  // helper functions
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function randomBetween(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pushHistory(setter, val, maxLen) {
    setter(prev => {
      const next = [...prev.slice(-(maxLen - 1)), val];
      return next;
    });
  }

  // check thresholds
  function checkThresholds() {
    const latestHr = hrHistory[hrHistory.length - 1] ?? hr;
    const latestSpo2 = spo2History[spo2History.length - 1] ?? spo2;
    const latestSys = bp.sys;
    const latestDia = bp.dia;
    const latestTemp = temp;

    let reasons = [];
    if (latestHr < thresholds.hr.low) reasons.push(`HR too low (${latestHr} bpm)`);
    if (latestHr > thresholds.hr.high) reasons.push(`HR too high (${latestHr} bpm)`);
    if (latestSpo2 < thresholds.spo2.low) reasons.push(`SpO₂ low (${latestSpo2}%)`);
    if (latestSys > thresholds.sysBP.high || latestDia > thresholds.diaBP.high) reasons.push(`BP critical (${latestSys}/${latestDia} mmHg)`);
    if (latestTemp > thresholds.temp.high) reasons.push(`High Temp (${latestTemp}°C)`);

    if (reasons.length > 0) {
      const critical = reasons.some(r => /too low|too high|critical|High Temp/i.test(r));
      const level = critical ? "critical" : "warning";
      const reasonText = reasons.join("; ");
      setAlert(prev => {
        if (prev && prev.resolved === false) return prev;
        const newAlert = {
          level,
          reason: reasonText,
          timestamp: new Date().toISOString(),
          resolved: false,
          contacted: null
        };
        if (level === "critical") {
          simulateContact(newAlert);
        } else {
          logMessage(`Warning: ${reasonText}`);
        }
        return newAlert;
      });
    } else {
      setAlert(prev => (prev && prev.level === "critical" && !prev.resolved) ? prev : null);
    }
  }

  // simulate contacting
  function simulateContact(alertObj) {
    const nearest = [...doctors].sort((a, b) => a.distance_km - b.distance_km)[0];
    logMessage(`ALERT: ${alertObj.reason}. Contacting ${nearest.name} at ${nearest.hospital}...`);
    setAlert(prev => ({ ...alertObj, contacted: { doctor: nearest, status: "contacting" }, resolved: false }));

    setTimeout(() => {
      logMessage(`${nearest.name} acknowledged the alert. Dispatching ambulance.`);
      setAlert(prev => ({ ...prev, contacted: { ...prev.contacted, status: "acknowledged" }, ambulance: { eta_mins: 8 } }));
      setTimeout(() => {
        logMessage(`Ambulance from ${nearest.hospital} dispatched. ETA ~${8} mins.`);
        setAlert(prev => ({ ...prev, ambulance: { ...prev.ambulance, dispatched: true } }));
      }, 1500);
    }, 1400);
  }

  function logMessage(msg) {
    setLog(prev => [{ ts: new Date().toLocaleTimeString(), text: msg }, ...prev].slice(0, 20));
  }

  function triggerSOS() {
    const manualAlert = {
      level: "critical",
      reason: "Manual SOS triggered",
      timestamp: new Date().toISOString(),
      resolved: false,
      contacted: null
    };
    setAlert(manualAlert);
    simulateContact(manualAlert);
  }

  function resolveAlert() {
    if (!alert) return;
    setAlert(prev => ({ ...prev, resolved: true }));
    logMessage("Alert resolved (demo).");
  }

  // chart data
  const hrData = {
    labels: hrHistory.map((_, i) => i),
    datasets: [{ label: "BPM", data: hrHistory, borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.12)", tension: 0.3, pointRadius: 0 }]
  };

  const spo2Data = {
    labels: spo2History.map((_, i) => i),
    datasets: [{ label: "SpO₂", data: spo2History, borderColor: "#06b6d4", backgroundColor: "rgba(6,182,212,0.12)", tension: 0.3, pointRadius: 0 }]
  };

  const bpData = {
    labels: bpHistory.map((_, i) => i),
    datasets: [
      { label: "Sys", data: bpHistory.map(p => p.sys), borderColor: "#f87171", tension: 0.3, pointRadius: 0 },
      { label: "Dia", data: bpHistory.map(p => p.dia), borderColor: "#60a5fa", tension: 0.3, pointRadius: 0 }
    ]
  };

  const tempData = {
    labels: ["Temp", "Rest"],
    datasets: [{
      data: [temp - 35, Math.max(0, 5 - (temp - 35))],
      backgroundColor: ["#f59e0b", "#fef3c7"]
    }]
  };

  const isCritical = alert && alert.level === "critical" && !alert.resolved;

  return (
    <div style={{ margin: 8 }}>
      {/* Critical alert banner */}
      <div style={{ position: "relative" }}>
        {isCritical && (
          <div style={{
            background: "linear-gradient(90deg,#ef4444,#f97316)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 10,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            animation: "pulseRed 1.5s infinite"
          }}>
            <div>
              <strong style={{ fontSize: 16 }}>🚨 CRITICAL ALERT</strong>
              <div style={{ fontSize: 13 }}>{alert.reason}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={resolveAlert} style={{ ...btnSecondary }}>Acknowledge</button>
              <button onClick={triggerSOS} style={{ ...btnDanger }}>SOS</button>
            </div>
          </div>
        )}
      </div>

      {/* Vitals cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {/* HR */}
        <div style={vCard}>
          <div style={vTitle}>Heart Rate</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{hr} <span style={{ fontSize: 12 }}>bpm</span></div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>{hr < thresholds.hr.low ? "Low" : hr > thresholds.hr.high ? "High" : "Normal"}</div>
          <div style={{ marginTop: 8 }}>
            <Line data={hrData} options={{ plugins: { legend: { display: false } }, scales: { y: { min: 30, max: 180 } } }} />
          </div>
        </div>

        {/* SpO2 */}
        <div style={vCard}>
          <div style={vTitle}>SpO₂</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#06b6d4" }}>{spo2}%</div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>{spo2 < thresholds.spo2.low ? "Low oxygen" : "Normal"}</div>
          <div style={{ marginTop: 8 }}>
            <Doughnut data={spo2Data} options={{ plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Blood Pressure */}
        <div style={vCard}>
          <div style={vTitle}>Blood Pressure</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{bp.sys}/{bp.dia} mmHg</div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>{(bp.sys > thresholds.sysBP.high || bp.dia > thresholds.diaBP.high) ? "High BP" : "Normal"}</div>
          <div style={{ marginTop: 8 }}>
            <Line data={bpData} options={{ plugins: { legend: { display: false } }, scales: { y: { min: 60, max: 200 } } }} />
          </div>
        </div>

        {/* Temperature */}
        <div style={vCard}>
          <div style={vTitle}>Temperature</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{temp}°C</div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>{temp > thresholds.temp.high ? "Fever" : "Normal"}</div>
          <div style={{ marginTop: 8 }}>
            <Doughnut data={tempData} options={{ plugins: { legend: { display: false } }, circumference: 180, rotation: 270 }} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        <button style={btnPrimary} onClick={() => { simulateSpike(); logMessage("Manual spike simulated"); }}>Simulate Critical Spike</button>
        <button style={btnWarning} onClick={() => { simulateFlatline(); logMessage("Manual fatal simulation executed"); }}>Simulate Fatal (demo)</button>
        <button style={btnDanger} onClick={triggerSOS}>Emergency SOS</button>
      </div>

      {/* Incident log */}
      {alert && (
        <div style={{ marginTop: 14, ...cardLight }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Incident Timeline</div>
          <div style={{ maxHeight: 160, overflowY: "auto" }}>
            {log.map((l, idx) => (
              <div key={idx} style={{ fontSize: 13, padding: "6px 0", borderBottom: "1px solid #f1f1f1" }}>
                <strong style={{ color: "#111" }}>{l.ts}:</strong> <span style={{ color: "#333" }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* keyframe styles */}
      <style>{`
        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 18px rgba(239,68,68,0.9); }
          100% { box-shadow: 0 0 0 rgba(239,68,68,0.4); }
        }
      `}</style>
    </div>
  );

  // demo spike functions
  function simulateSpike() {
    setHr(180); pushHistory(setHrHistory, 180, 30);
    setSpo2(82); pushHistory(setSpo2History, 82, 30);
    setBp({ sys: 185, dia: 115 }); pushHistory(setBpHistory, { sys: 185, dia: 115 }, 30);
    setTemp(40.2);
    setTimeout(checkThresholds, 200);
  }

  function simulateFlatline() {
    setHr(0); pushHistory(setHrHistory, 0, 30);
    setSpo2(0); pushHistory(setSpo2History, 0, 30);
    setBp({ sys: 220, dia: 150 }); pushHistory(setBpHistory, { sys: 220, dia: 150 }, 30);
    setTemp(41.0);
    setTimeout(checkThresholds, 200);
  }
};

const vCard = {
  background: "#fff",
  padding: 12,
  borderRadius: 10,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const vTitle = { fontWeight: 700, marginBottom: 6, color: "#374151" };

const btnPrimary = { padding: "10px 14px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#10b981,#06b6d4)", color: "#fff", cursor: "pointer" };
const btnWarning = { padding: "10px 14px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#f59e0b,#f97316)", color: "#fff", cursor: "pointer" };
const btnDanger = { padding: "10px 14px", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" };

const btnSecondary = { padding: "8px 10px", borderRadius: 8, border: "none", background: "#e5e7eb", cursor: "pointer" };
const cardLight = { background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 8px 20px rgba(0,0,0,0.05)" };

export default HealthMonitor;
