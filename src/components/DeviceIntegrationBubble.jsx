import React, { useState, useEffect, useRef } from "react";
import WearableDevicesIntegration from "./WearableDevicesIntegration";

const beepSoundUrl = "https://www.soundjay.com/buttons/sounds/beep-07.mp3";

const DeviceIntegrationBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const beepRef = useRef(null);

  // Beep every 10s
  useEffect(() => {
    beepRef.current = new Audio(beepSoundUrl);
    beepRef.current.load();
    const interval = setInterval(() => {
      beepRef.current.play().catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        display: "flex",
        flexDirection: "column-reverse", // bubble bottom, popup above
        alignItems: "flex-end",
        zIndex: 1000,
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Bubble */}
      <div
        style={{
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
        }}
        title="Device Integration"
      >
        ⚡
      </div>

      {/* Popup */}
      {isOpen && (
        <div
          style={{
            marginBottom: "10px",
            width: "90vw",
            maxWidth: "400px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            padding: "20px",
            animation: "fadeSlideIn 0.4s ease-out",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "15px",
                flexGrow: 1,
              }}
            >
              📡 Wearable Device Integration
            </h3>
          </div>
          <WearableDevicesIntegration />
        </div>
      )}

      {/* Animations */}
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
    </div>
  );
};

export default DeviceIntegrationBubble;
