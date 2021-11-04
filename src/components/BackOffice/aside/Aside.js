import React from 'react';
import './Aside.scss';


export const Aside = ({isOpen}) => {

  const open = isOpen ? "Aside open" : "Aside";

  return (
    <aside className={open}>
      <div className="user">
        <img src="https://picsum.photos/50/50" alt="user" /> {/*<- Aca va la foto del usuario */} 
        <span>Role</span> {/* Aca se debe renderizar el rol del usuario*/}
      </div>
      <ul>
        <li className="category">Novedades</li>
        <li className="category">Actividades</li>
        <li className="category">Testimonios</li> {/* Segun el rol se debe renderizar un menu diferente */ }
      </ul>
    </aside>
  )
}
