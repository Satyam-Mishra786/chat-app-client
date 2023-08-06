import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div class="loading-wave">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>
  );
};

export default Spinner;
