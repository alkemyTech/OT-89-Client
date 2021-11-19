import React, { useState, useEffect } from "react";
import apiService from "../../../services/server";
import { fakeActivities } from "./fakeActivities";
import EditActivities from "../../../components/EditActivities/EditActivities";

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

  console.log(activities);
  return (
    <div className="container-activities">
      <h1>Listado de Actividades</h1>
      {/* Aca metemos un campo para que el administrador pueda crear una nueva actividad */}
      <EditActivities actId={0} />
      <div className="container-activities__table">
        {activities?.map((act) => (
          <div className="container-activities__table--items" key={act.id}>
            <p className="activities__title">{act.name}</p>
            <EditActivities actId={act.id} />
            <button
              className="button button-secondary"
              onClick={() =>
                console.log("se esta borrando el elemento " + act.id)
              }
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
