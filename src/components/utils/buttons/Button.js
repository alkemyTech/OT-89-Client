import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

export const Button = ({ title, className, url })  => {
  return (
    <Link className={className} to={url}> {/* Cuando este el router usar Link */}
      {title}
    </Link>
  );
}
