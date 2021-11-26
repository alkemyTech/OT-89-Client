import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import apiService from "../../../services/server";
import {
  deleteActivity,
  loadActivities,
} from "../../../features/slices/activitySlice";
import EditActivities from "../../../components/EditActivities/EditActivities";
import "./ListActivities.scss";
import { Alert, Confirm } from "../../../components/Alert/Alert";

export const ListActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector(
    (state) => state.activities.activities,
    shallowEqual
  );
  const [actividadAModificar, setActividadAModificar] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiService.get("/activities");
        const { data } = await res.data;
        if (data.length !== 0) {
          dispatch(loadActivities(res.data.data));
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (activities.length === 0) {
      getData();
    }
  }, [activities]);

  const handleDelete = async (id) => {
    try {
      const result = await Confirm(
        "ELIMINAR ACTIVIDAD",
        "¿Desea eliminar esta actividad?"
      );
      if (result) {
        const res = await apiService.delete(`/activities/${id}`);

        if (res.status === 200) {
          dispatch(deleteActivity(id));
          Alert(
            "Actividad Eliminada",
            "Se ha eliminado la actividad correctamente",
            "success"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-activities">
      <div className="activities__header">
        <h3>Listado de Actividades</h3>
        <div className="container-activities__table">
          <button
            className="button button-primary"
            onClick={() => {
              setActividadAModificar(0);
              setShowModal(true);
            }}
          >
            Nuevo
          </button>
        </div>
        <EditActivities
          actId={actividadAModificar}
          visible={showModal}
          setVisible={setShowModal}
        />
        {activities?.map((act) => (
          <div className="container-activities__table--items" key={act.id}>
            <p className="activities__title">{act.name}</p>

            <button
              className="edit-button"
              onClick={() => {
                setShowModal(true);
                setActividadAModificar(act.id);
              }}
            >
              Editar
            </button>
            <button
              className="button button-secondary"
              onClick={() => handleDelete(act.id)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
