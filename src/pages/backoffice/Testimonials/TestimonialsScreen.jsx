import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectTestimonials } from "../../../features/slices/testimonialSlice";
import TestimonialsList from "./TestimonialsList";
import TestimonialModal from "./TestimonialModal";
import "./testimonials.scss";


const TestimonialsScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleModify = (testimonial) => {
    dispatch(selectTestimonials(testimonial.id));
    setShowModal(true);
  };

  return (
    <section>
      <div className="testimonials">
        <h1>Testimonios</h1>
        <button
          className="button button-primary"
          onClick={() => {
            dispatch(selectTestimonials(null));
            setShowModal(true);
          }}
        >
          Nuevo Testimonio
        </button>
      </div>
      <TestimonialsList handleModify={handleModify} />
      <TestimonialModal isVisible={showModal} setIsVisible={setShowModal} />
    </section>
  );
};

export default TestimonialsScreen;
