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
        <Link to="/auth/backoffice/activities" className="category">
          Actividades
        </Link>
        <Link to="/auth/backoffice/edit-testomonials" className="category">
          Testimonios
        </Link>
        <Link to="/auth/backoffice/edit-organization" className="category">
          Organización
        </Link>
        <Link to="/auth/backoffice/users" className="category">
          Usuarios
        </Link>
        <Link to="/auth/backoffice/categories" className="category">
          Categorias
        </Link>
      </ul>
    </aside>
  );
};
