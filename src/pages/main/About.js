import React from "react";
import { AboutUs } from "../../components/AboutUs/AboutUs";
import { WhatWeDo } from "../../components/AboutUs/WhatWeDo";
import { Members } from "../../components/Members/Members";

export const About = () => {
  return (
    <>
      <AboutUs />
      <Members />
      <WhatWeDo />
    </>
  );
};
