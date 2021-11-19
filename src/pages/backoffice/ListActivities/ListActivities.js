import React, { useState, useEffect } from "react";
import apiService from "../../../services/server";
import { fakeActivities } from "./fakeActivities";
import "./ListActivities.scss";

export const ListActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiService.get("/activities");
        const { data } = await res.data;
        if (data.length !== 0) {
          setActivities(data.reverse());
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
        setActivities(fakeActivities.reverse());
      }
    };

    getData();
  }, []);

  return (
    <div className="container-activities">
      <h1>Listado de Actividades</h1>
      {/* Aca metemos un campo para que el administrador pueda crear una nueva actividad */}
      <div className="container-activities__table">
        {activities.length !== 0 ? (
          activities.map((act) => (
            <div className="container-activities__table--items" key={act.id}>
              <p>{act.title}</p>
              <button
                className="button button-primary"
                onClick={() =>
                  console.log("se esta editando el elemento " + act.id)
                }
              >
                Editar
              </button>
              <button
                className="button button-secondary"
                onClick={() =>
                  console.log("se esta borrando el elemento " + act.id)
                }
              >
                Borrar
              </button>
            </div>
          ))
        ) : (
          <div>
            <h2>{`Por ahora no hay actividades, crea una o vuelve más tarde :)`}</h2>
            <button
              className="container-activities__table--buttons create"
              // Aca metemos el post
              onClick={() => console.log("Creando una nueva actividad")}
            >
              Crear Actividad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
