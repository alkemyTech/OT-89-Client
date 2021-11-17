import React from "react";
import "./WarningDisplay.scss";

const WarningDisplay = ({ text }) => {
  return (
    <div className="warning">
      <span>{text}</span>
    </div>
  );
};

export default WarningDisplay;
