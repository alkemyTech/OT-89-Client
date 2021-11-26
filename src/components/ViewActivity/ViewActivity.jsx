import React, { useState, useEffect } from "react";
import apiService from "../../services/server";
import { Alert } from "../Alert/Alert";
import { Button } from "../utils/buttons/Button";
import { useLocation } from "react-router-dom";
import "./ViewActivities.scss";

//Activity details
//Faltan implementar estilos
const Activity = () => {
  const location = useLocation();

  const [id, setId] = useState(0);

  const [data, setData] = useState({
    id: 0,
    name: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    const id = location.pathname.split("/", -1);
    setId(id[2]);
  }, [location.pathname]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiService.get("/activities/" + id);

        if (!response) {
          Alert(
            "Error",
            "La actividad que intenta visualizar no existe en la base de datos",
            "error"
          );
        } else {
          setData(response.data.data);
        }
      } catch (e) {
        console.log(e.response.data);
      }
    };
    if (id !== 0) {
      getData();
    } else {
      return;
    }
  }, [id]);

  return (
    <div className="Activity">
      <img src={data.image} alt={data.name} />
      <div className="Activity__description ">
        <h2>{data.name}</h2>
        <h3>{data.content}</h3>
        <div className="buttons">
          <Button
            className="button button-primary"
            title="Volver a actividades"
            url="/activities"
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;
