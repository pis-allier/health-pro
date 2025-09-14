import React from "react";

const NutritionTips = () => {
  return (
    <div className="card">
      <h3>🥗 Nutrition & Diet Tips</h3>
      <p>Eat smart with easy diet tips and healthy meal suggestions.</p>
      <div style={{ marginTop: "10px" }}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/fqhYBTg73fw"
          title="Healthy Eating Made Simple"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/mMHVEFWNLMc"
          title="10 Healthy Foods You Should Eat Every Day"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default NutritionTips;
