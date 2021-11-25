import React from "react";
import image from '../../assets/images/Foto-6.jpg';
import image2 from '../../assets/images/Manos-10.jpg';
import image3 from '../../assets/images/Foto-2.jpg';
import image4 from '../../assets/images/Foto-1.jpg';
import image5 from '../../assets/images/Foto-4.jpg';

import "./About.scss";

export const About = () => {
  return (
      <section className="AboutUs">
        <article className="box white">
          <h1>Nosotros</h1>
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

        <div className="row">
          <img src={image} alt="us"/>
          <article className="text-content">
            <h3>Visión</h3>
            <p>
              Mejorar la calidad de vida de niños y familias en situación de
              vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo
              en cada individuo a través de la educación, salud, trabajo,
              deporte, responsabilidad y compromiso.
            </p>
          </article>
        </div>

        <div className="row">
          <article className="text-content">
            <h3>Misión</h3>
            <p>
              Trabajar articuladamente con los distintos aspectos de la vida de
              las familias, generando espacios de desarrollo personal y
              familiar, brindando herramientas que logren mejorar la calidad de
              vida a través de su propio esfuerzo.
            </p>
          </article>
          <img src={image2} alt="us"/>
        </div>

        <div className="box white">
          <h1>Que hacemos?</h1>
          <p>
            Mediante nuestros programas educativos, buscamos incrementar la
            capacidad intelectual, moral y afectiva de las personas de acuerdo con
            la cultura y las normas de convivencia de la sociedad a la que
            pertenecen.
          </p>
        </div>

        <article className="row">
          <div className="text-content">
            <h3>Apoyo Escolar para el Nivel Primario</h3>
            <p>
              El espacio de apoyo escolar es el corazón del área educativa. Se
              realizan los talleres de lunes a jueves de 10 a 12 horas y de 14 a
              16 horas en el contraturno, Los sábados también se realiza el taller
              para niños y niñas que asisten a la escuela doble turno. Tenemos un
              espacio especial para los de 1er grado 2 veces por semana ya que
              ellos necesitan atención especial! Actualmente se encuentran
              inscriptos a este programa 150 niños y niñas de 6 a 15 años. Este
              taller está pensado para ayudar a los alumnos con el material que
              traen de la escuela, también tenemos una docente que les da clases
              de lengua y matemática con una planificación propia que armamos en
              Manos para nivelar a los niños y que vayan con más herramientas a la
              escuela.
            </p>
          </div>
          <img src={image3} alt=" "/>
        </article>
        <article className="row">
          <div className="text-content">
            <h3>Apoyo Escolar para el Nivel Secundaria</h3>
            <p>
              Del mismo modo que en primaria, este taller es el corazón del área
              secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas
              y de 16 a 18 horas en el contraturno. Actualmente se encuentran
              inscriptos en el taller 50 adolescentes entre 13 y 20 años. Aquí los
              jóvenes se presentan con el material que traen del colegio y una
              docente de la institución y un grupo de voluntarios los recibe para
              ayudarlos a estudiar o hacer la tarea. Este espacio también es
              utilizado por los jóvenes como un punto de encuentro y relación
              entre ellos y la institución.
            </p>
          </div>
          <img src={image4} alt=" "/>
        </article>

        <article className="row">
          <div className="text-content">
            <h3>Tutorias</h3>
            <p>
              Es un programa destinado a jóvenes a partir del tercer año de
              secundaria, cuyo objetivo es garantizar su permanencia en la escuela
              y construir un proyecto de vida que da sentido al colegio. El
              objetivo de esta propuesta es lograr la integración escolar de niños
              y jóvenes del barrio promoviendo el soporte socioeducativo y
              emocional apropiado, desarrollando los recursos institucionales
              necesarios a través de la articulación de nuestras intervenciones
              con las escuelas que los alojan, con las familias de los alumnos y
              con las instancias municipales, provinciales y nacionales que
              correspondan.
            </p>
          </div>
          <img src={image5} alt=" "/>
        </article>
      
    </section>
  );
};
