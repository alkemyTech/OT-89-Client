import React from "react";

import { Link } from "react-router-dom";

// Icons
import iconFacebook from "../../assets/icons/facebook.svg";
import iconTwitter from "../../assets/icons/twitter.svg";
import iconYoutube from "../../assets/icons/youtube.svg";
import iconInstagram from "../../assets/icons/instagram.svg";

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
      <section className="footer-nav">
        <ul className="list-left">
          {itemsLeftFooter.map((item, index) => (
            <Link key={index} to={`/${item.route}`}>
              {item.title}
            </Link>
          ))}
        </ul>
        <figure>
          <img src={logoONG} alt="Logo SOMOS ONG" />
        </figure>
        <ul className="list-right">
          {itemsRightFooter.map((item, index) => (
            <Link key={index} to={`/${item.route}`}>
              {item.title}
            </Link>
          ))}
        </ul>
      </section>
      <div className="social-media">
        <a href="/">
          <img className="icon" src={iconFacebook} alt="Icono de Facebook" />
        </a>

        <a href="/">
          <img className="icon" src={iconInstagram} alt="Icono de Instagram" />
        </a>

        <a href="/">
          <img className="icon" src={iconTwitter} alt="Icono de Twitter" />
        </a>

        <a href="/">
          <img className="icon" src={iconYoutube} alt="Icono de Youtube" />
        </a>
      </div>
      <p className="terms-and-condition">
        2021 by Alkemy. All Rights Reserved.
      </p>
    </footer>
  );
};
