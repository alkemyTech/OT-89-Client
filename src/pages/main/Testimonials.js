import React from "react";
import { Testimonial } from "../../components/Testimonial/Testimonial";
import "./Testimonials.scss";

export const Testimonials = () => {
  return (
    <section>
      <h1>Testimonios</h1>
      <div className="box-container">
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
    </section>
  );
};

