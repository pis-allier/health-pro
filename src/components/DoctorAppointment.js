import React, { useState } from "react";

const specialists = [
  { id: 1, name: "Dr. Arjun Mehta", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Dietitian" },
  { id: 3, name: "Dr. Rakesh Nair", specialty: "Physiotherapist" },
];

const DoctorAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const bookAppointment = () => {
    if (!selectedDoctor || !date || !time) {
      alert("Please select doctor, date and time!");
      return;
    }
    alert(
      `Appointment booked with ${selectedDoctor?.name} on ${date} at ${time}`
    );
  };

  return (
    <div className="card">
      <h2>Doctor Appointment</h2>

      <select
        className="input"
        onChange={(e) =>
          setSelectedDoctor(
            specialists.find((doc) => doc.id === parseInt(e.target.value))
          )
        }
      >
        <option>Select Doctor</option>
        {specialists.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name} - {doc.specialty}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="input"
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        className="input"
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={bookAppointment} className="button">
        Book Appointment
      </button>

      <button className="button secondary">📹 Video Call Doctor</button>
    </div>
  );
};

export default DoctorAppointment;
