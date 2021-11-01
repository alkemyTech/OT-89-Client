import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner"

export const Spinner = ({type="TailSpin",size,color="#00BFFF",timeout=0}) => {
    return (
        <Loader
        type={type}
        color={color}
        height={size}
        width={size}
        timeout={timeout} //3 secs
        
      />
    )
}
