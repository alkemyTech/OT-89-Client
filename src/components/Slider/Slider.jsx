import React from "react";
import "./Slider.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = React.memo(() => {
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
    <Carousel
      className="Slider"
      useKeyboardArrows={true}
      renderThumbs={() => false}
      showStatus={false}
    >
      {carouselData.map((item, index) => (
        <img key={index} src={item.imgUrl} alt={item.text} />
      ))}
    </Carousel>
  );
});
export default Slider;
