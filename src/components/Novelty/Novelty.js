import React, { useState, useEffect } from "react";
import { Button } from "../utils/buttons/Button";
import "./Novelty.scss";
import apiService from "../../services/server";
import { Alert } from "../Alert/Alert";
import { useParams } from "react-router-dom";

export const Novelty = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: 0,
    title: "",
    description: [],
    image: "",
  });

  console.log("Este id es del novelty" + id);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiService.get(`/news/${id}`);

        if (!response) {
          Alert(
            "Error",
            "La novedad que intenta visualizar no existe en la base de datos",
            "error"
          );
        } else {
          setData(response.data.data);
        }
      } catch (e) {
        console.log(e.response.data);
      }
    };
    getData();
  }, []);

  return (
    <div className="Novelty">
      <img className="Novelty__img" src={data.image} alt={data.title} />
      <div className="Novelty__description">
        <h2>{data.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
        <div className="buttons">
          <Button
            className="button button-primary"
            title="Volver a novedades"
            url="/novelties"
          />
        </div>
      </div>
    </div>
  );
};
