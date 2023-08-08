import React from "react";
import "./spinner.css";
const Spinner2 = () => {
  return (
    <div className="fixed t-[20vh] flex justify-center items-center">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Spinner2;
