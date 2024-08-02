import React from "react";
import "./spinner.css";
const Spinner = () => {
  return (
    <>
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">
          Wait for a moment, document is being scanned...
        </p>
      </div>
    </>
  );
};

export default Spinner;
