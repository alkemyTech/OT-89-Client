import React from "react";

const Slider = () => {
  const carouselData = [
    {
      imgUrl:
        "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg",
      text: "Hola esta es una prueba de slider para la web",
    },
    {
      imgUrl:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
      text: "Hola esta es una prueba de slider para la web",
    },
  ];
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide carousel-fade w-50"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        {carouselData.map((object, index) => {
          console.log(object.imgUrl);
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
              <div class="carousel-caption d-none d-md-block">
                <h3>{object.text}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
