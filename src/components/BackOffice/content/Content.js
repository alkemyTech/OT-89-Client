import React from 'react'
import { Button } from '../../utils/buttons/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'; 

export const Content = ({openAside, isLeft}) => {

  const left = isLeft ? "icon isleft" : "icon isright";

  return (
    <section className="Content">
      <FontAwesomeIcon icon={faArrowRight} size="2x" className={left} onClick={openAside}/>
      <div className="heading">
        <h1>Novedades</h1> {/*Este H1 se debe renderizar segun las lista que contenga */}
        <Button title="Add new" className="btn primary"/>
      </div>
      <ul className="list">
        {/* En esta list se debe renderizar las novedades, actividades, testimonios o para editar el perfil del usuario segun corresponda */}
      </ul>
    </section>
  )
}
