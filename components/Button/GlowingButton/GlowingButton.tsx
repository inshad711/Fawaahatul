import React from "react";
import "./Style.css";
const GlowingButton = () => {
  return (
    <button type="button" className="btn py-5 w-full bg-templateBlack">
      <strong>BUY IT NOW</strong>
      <div id="container-stars">
        <div id="stars"></div>
      </div>
    </button>
  );
};

export default GlowingButton;
