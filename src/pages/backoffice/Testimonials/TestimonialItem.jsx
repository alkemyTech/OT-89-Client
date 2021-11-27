import React from "react";

export const TestimonialItem = ({ testimonial, handleModify }) => {
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
