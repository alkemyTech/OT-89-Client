import React from "react";
import "./Aside.scss";
import { Link } from "react-router-dom";
/* import ListScreen from "../ListScreen/ListScreen";
<ListScreen></ListScreen>
 */
export const Aside = ({ isOpen }) => {
  const open = isOpen ? "Aside open" : "Aside";

  return (
    <aside className={open}>
      <div className="user">
        <img src="https://picsum.photos/50/50" alt="user" />{" "}
        {/*<- Aca va la foto del usuario */}
        <span>Role</span> {/* Aca se debe renderizar el rol del usuario*/}
      </div>
      <ul className="list-aside">
        <Link to="/backoffice/" className="category">
          Actividades
        </Link>
        <Link to="/backoffice/edit-testomonials" className="category">
          Testimonios
        </Link>
        <Link to="/backoffice/edit-organization" className="category">
          Organización
        </Link>
        <Link to="/backoffice/users" className="category">
          Usuarios
        </Link>
        <Link to="/backoffice/contacts" className="category">
          Contactos
        </Link>
        <Link to="/backoffice/info-home" className="category">
          Información Home
        </Link>
        <Link to="/backoffice/categories" className="category">
          Categorias
        </Link>
        <Link to="/backoffice/novelties" className="category">
          Novedades
        </Link>
      </ul>
    </aside>
  );
};
