import React from "react";
import "./Slider.scss";
const Slider = () => {
  const carouselData = [
    {
      imgUrl:
        "http://drive.google.com/uc?export=view&id=1S1AurINBtoSmI8qEBxhrXAW9m34rsF5p",
      text: "Hola esta es una prueba de slider para la web",
    },
    {
      imgUrl:
        "http://drive.google.com/uc?export=view&id=10zBKAJOJLjMKXWMXDad_SUg8yL5znm91",
      text: "Hola esta es una prueba de slider para la web",
    },
    {
      imgUrl:
        "http://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
      text: "Hola esta es una la ultima de slider para la web",
    },
  ];
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {carouselData?.map((object, index) => {
          return (
            <div
              key={index}
              className={
                index === 0
                  ? "carousel-item active text-center"
                  : "carousel-item text-center"
              }
            >
              <img
                key={index}
                src={object.imgUrl}
                alt={index}
                className="d-block w-100"
              />
              <div className="carousel-caption d-none d-md-block">
                <p className="sliderText">{object.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
