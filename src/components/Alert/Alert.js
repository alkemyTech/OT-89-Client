import React from "react";
import Swal from "sweetalert2";
export const Alert = ({ title, text, icon, type, footer, buttonName }) => {
  const HandleClick = () => {
    Swal.fire({
      title: title,
      text: text,
      type: type,
      icon: icon,
      button: buttonName,
      footer: footer,
    });
  };

  return (
    <div>
      <button onClick={HandleClick}>{buttonName}</button>
    </div>
  );
};
