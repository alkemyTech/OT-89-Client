import React from "react";
import "./modal.scss";

const Modal = ({ children, visible, onClose }) => {
  //remember to set className .content-modal to the children container!
  if (visible) {
    return (
      <div className="modal-component modal-activity ">
        <div className="background-modal" onClick={onClose} />
        {children}
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
