import React from "react";
import "./Testimonials.scss";

export const Testimonials = () => {
  //Verificar la adaptabilidad a dispositivos móviles de los diferentes elementos y aplicar las correcciones necesarias para que pueda visualizarse correctamente. Aprovechar para terminar de refinar los elementos que se crean pertinentes para el diseño de la página.
  const Testimonials = [
    {
      name: "Juan Perez",
      content: "lorem ipsummmmmmmmmmmmmmmmmmmmmmmmmmm",
      imgUrl: 'https://picsum.photos/50/50?random=1',
    },
    {
      name: "Juan Perez",
      content: "testimonialtestimonialtestimonialtestimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial testimonial",
      imgUrl: 'https://picsum.photos/50/50?random=2',
    }
  ]
  return (
    <section>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="testimonials">
            {Testimonials.map((Testimonial, index) => (
              <div className="testimonial row" key={index}>
                <div className="testimonial-Profile col-2">
                  <img src={Testimonial.imgUrl} alt="Foto de perfil del autor del testimonio." className='user-image' />
                  <h4>{Testimonial.name}</h4>
                </div>
                <div className="testimonial-content col">
                  <p className='testimonial-text'>{Testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
</section>
  );
};

