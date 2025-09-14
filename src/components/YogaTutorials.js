import React from "react";

const YogaTutorials = () => {
  return (
    <div className="card">
      <h3>🧘 Yoga & Flexibility</h3>
      <p>Relax, stretch, and improve flexibility with guided yoga routines.</p>
      <div style={{ marginTop: "10px" }}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/v7AYKMP6rOE"
          title="Morning Yoga for Beginners"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/4pKly2JojMw"
          title="Yoga for Flexibility"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YogaTutorials;
