import React, { useState, useEffect } from "react";
import { Button } from "../utils/buttons/Button";
import "./Testimonials.scss";
import apiService from "../../services/server";
import { Alert } from "../Alert/Alert";

export const Testimonial = ({ id }) => {
  const [data, setData] = useState({
    id: 0,
    title: "",
    description: [],
    image: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiService.get(`/testimonials/${id}`);

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
    <div className="Testimonial">
      <img className="Testimonial__img" src={data.image} alt={data.title} />
      <div className="Testimonial__description">
        <h2>{data.title}</h2>
        <h3>{data.description}</h3>
        <div className="buttons">
          <Button
            className="button button-primary"
            title="Volver a testimonios"
            url="/testimonials"
          />
        </div>
      </div>
    </div>
  );
};
