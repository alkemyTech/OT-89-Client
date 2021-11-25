import React from "react";

import "./AboutUs.scss";

export const AboutUs = () => {
  return (
    <section className="AboutUs">
      <div className="AboutUs_box">
        <article>
          <h3>Nosotros</h3>
          <p>
            Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y
            papás, abuelos y vecinos del barrio La Cava generando procesos de
            crecimiento y de inserción social. Uniendo las manos de todas las
            familias, las que viven en el barrio y las que viven fuera de él, es
            que podemos pensar, crear y garantizar estos procesos. Somos una
            asociación civil sin fines de lucro que se creó en 1997 con la
            intención de dar alimento a las familias del barrio. Con el tiempo
            fuimos involucrándonos con la comunidad y agrandando y mejorando
            nuestra capacidad de trabajo. Hoy somos un centro comunitario que
            acompaña a más de 700 personas a través de las áreas de: Educación,
            deportes, primera infancia, salud, alimentación y trabajo social.
          </p>
        </article>

        <div className="articles--down">
          <article>
            <h3>Visión</h3>
            <p>
              Mejorar la calidad de vida de niños y familias en situación de
              vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo
              en cada individuo a través de la educación, salud, trabajo,
              deporte, responsabilidad y compromiso.
            </p>
          </article>

          <article>
            <h3>Misión</h3>
            <p>
              Trabajar articuladamente con los distintos aspectos de la vida de
              las familias, generando espacios de desarrollo personal y
              familiar, brindando herramientas que logren mejorar la calidad de
              vida a través de su propio esfuerzo.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
