import React from "react";
import apiService from "../../services/server";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";

import "./Footer.scss";

export const Footer = () => {
  // GET Logo ONG
  const logoONG = "/images/assets/logo.png";

  //! This function will request the image url from a database
  // const getLogo = async () => {
  //   const response = await fetch(DATABASE_URL + "/logo");
  //   const blob = await response.blob();
  //   const src = URL.createObjectURL(blob);
  //   return src;
  // };


  //Function to bring social media urls

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const getSocialMedia = async () => {
      try{
        const response = await apiService.get("/public");

        setData(response.data.data);
      }
      catch(e){
        console.log(e.response.data);
      }
    }
    getSocialMedia();
  }, [])

  const itemsLeftFooter = [
    { title: "Noticias", route: "news" },
    { title: "Actividades", route: "activities" },
    { title: "Novedades", route: "novelties" },
  ];

  const itemsRightFooter = [
    { title: "Testimonios", route: "testimonials" },
    { title: "Nosotros", route: "about" },
    { title: "Contacto", route: "contacts" },
  ];

  return (
    <footer>
      <div className="footer-nav">
        <ul className="footer-list footer-list--left">
          {itemsLeftFooter.map((item, index) => (
            <Link key={index} to={`/${item.route}`}>
              {item.title}
            </Link>
          ))}
        </ul>
        <figure className="footer-logo">
          <img src={logoONG} alt="Logo SOMOS ONG" />
        </figure>
        <ul className="footer-list footer-list--right">
          {itemsRightFooter.map((item, index) => (
            <Link key={index} to={`/${item.route}`}>
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
      <div className="social-media">
        <a href={data.facebook}>
            <FontAwesomeIcon icon={faFacebook} className="icon"/>
        </a>

        <a href={data.instagram}>
            <FontAwesomeIcon icon={faInstagram} className="icon"/>
        </a>

        <a href={data.linkedin}>
          {/* ARREGLAR ICONO DE LINKEDIN */}
            <FontAwesomeIcon icon={faLinkedin} className="icon"/>
        </a>
      </div>
      <p className="terms-and-condition">
        2021 by mHm All Rights Reserved.
      </p>
    </footer>
  );
};
