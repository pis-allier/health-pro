import React from "react";

const NearbyHospitals = () => {
  return (
    <div className="card">
      <h2>Nearby Hospitals & Clinics</h2>
      <p>Find hospitals, gyms & pharmacies near you:</p>
      <iframe
        title="Nearby Hospitals"
        src="https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=hospitals+near+me"
        width="100%"
        height="250"
        className="map-frame"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default NearbyHospitals;
