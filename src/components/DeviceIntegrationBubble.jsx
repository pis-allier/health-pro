import React, { useState, useEffect, useRef } from "react";
import WearableDevicesIntegration from "./WearableDevicesIntegration";

const beepSoundUrl = "https://www.soundjay.com/buttons/sounds/beep-07.mp3";

const DeviceIntegrationBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const beepRef = useRef(null);

  // Initialize beep sound
  useEffect(() => {
    beepRef.current = new Audio(beepSoundUrl);
    beepRef.current.load();
    const interval = setInterval(() => {
      beepRef.current.play().catch(() => {}); // Suppress any promise warnings
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Bubble */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          animation: "pulse 2s infinite",
          zIndex: 1000,
        }}
        title="Device Integration"
      >
        ⚡
      </div>

      {/* Pop-up Card (Fixed Position) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            padding: "20px",
            zIndex: 1000,
            animation: "fadeSlideIn 0.4s ease-out",
          }}
          onMouseEnter={() => setIsOpen(true)}   // Keep open when mouse is over pop-up
          onMouseLeave={() => setIsOpen(false)}  // Close when leaving
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ textAlign: "center", color: "#333", marginBottom: "15px", flexGrow: 1 }}>
              📡 Wearable Device Integration
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#333",
              }}
              aria-label="Close"
            >
              ✖
            </button>
          </div>

          <WearableDevicesIntegration />
        </div>
      )}

      {/* Keyframe Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default DeviceIntegrationBubble;
