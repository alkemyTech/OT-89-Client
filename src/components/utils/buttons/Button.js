import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

export const Button = ({ title, className, url, onClick }) => {
  return (
    <Link className={className} to={url} onClick={onClick}>
      {title}
    </Link>
  );
};
