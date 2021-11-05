import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { fakedata } from "../components/Card/infofake";

export const Novelties = () => {

  // COMO: Usuario
  // QUIERO: Ver el listado de novedades 
  // PARA: Tener conocimiento de las novedades de la web
  
  // Criterios de aceptación: Al ingresar a la ruta /novedades, mostrará un listado de novedades iterando sobre un array. Este listado se renderizará iterando sobre un array de entries obtenidas desde el servidor. En el caso de que el endpoint aún no exista generar un array con datos de ejemplo. Cada elemento del listado se renderizará como una card con el título e imagen de la novedad (utilizar las de la plantilla), y llevarán a la ruta /novedades/:id al hacer click, para visualizar el detalle

  const [data, setData] = useState([])

  useEffect(() => {
// Petocion a la base de datos con axios
    setData(fakedata)
  }, [])

  return (
    <div className="novelties-page">
      {
        data.map(obj => (
          <Card 
            key={obj.id} 
            id={obj.id}
            title={obj.title} 
            image={obj.image} 
            altText={obj.altText}
          />
        ))
      }
    </div>
  );
};
