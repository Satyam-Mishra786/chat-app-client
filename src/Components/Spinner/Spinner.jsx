import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="loading-wave">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
    </div>
  );
};

export default Spinner;
