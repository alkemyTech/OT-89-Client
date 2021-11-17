import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./spinner.scss";

export const Spinner = ({
  size,
  type = "TailSpin",
  color = "#00BFFF",
  center = false,
  timeout = 0,
}) => {
  if (center)
    return (
      <div className="center__spinner">
        <Loader
          type={type}
          color={color}
          height={size}
          width={size}
          timeout={timeout} //3 secs
        />
      </div>
    );

  return (
    <Loader
      type={type}
      color={color}
      height={size}
      width={size}
      timeout={timeout} //3 secs
    />
  );
};
