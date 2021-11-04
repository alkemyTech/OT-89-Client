import React from "react";
/* import { Link } from "react-router-dom"; */

import "./Button.scss";

export function Button({ title, className, url }) {
  return (
    <a className={className} href={url}> {/* Cuando este el router usar Link */}
      {title}
    </a>
  );
}
