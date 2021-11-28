import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import { Spinner } from "../../../components/spinner/Spinner";
import WarningDisplay from "../../../components/utils/warning/WarningDisplay";
import { useDispatch, useSelector } from "react-redux";
import { loadTestimonials } from "../../../features/slices/testimonialSlice";

const TestimonialList = ({ handleModify }) => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonials.testimonials);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    (async () => {
      await apiService
        .get("/testimonials")
        .then((res) => {
          if (res.status === 200) {
            dispatch(loadTestimonials(res.data));
          } else {
            setWarning("No hay testimonios que mostrar");
          }
        })
        .catch((err) => {
          console.log(err);
          setWarning("Error de servidor");
        });
    })();
  }, []);

  useEffect(() => {
    if (warning === undefined && testimonials.length === 0) {
      setWarning("Ya no hay mas novedades");
    } else if (testimonials.length !== 0) {
      setWarning(undefined);
    }
  }, [testimonials]);

  return (
    <article className="testimonials__list">
      {warning ? (
        <WarningDisplay text={warning} />
      ) : testimonials?.length === 0 ? (
        <Spinner size={50} center />
      ) : (
        testimonials?.map((testimonial) => (
          <TestimonialItem
            testimonial={testimonial}
            handleModify={handleModify}
            key={testimonial.id}
          />
        ))
      )}
    </article>
  );
};

export default TestimonialList;

const TestimonialItem = ({ testimonial, handleModify }) => {
  const { name, image, content } = testimonial;
  return (
    <>
      <article className="testimonial__item">
        <div className="__description">
          <span>{name}</span>
          <div
            className="__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <a href={image} target="_blank" rel="noopener noreferrer">
          Imagen
        </a>
        <button
          className="button button-outline"
          onClick={() => handleModify(testimonial)}
        >
          Modificar
        </button>
      </article>
    </>
  );
};
