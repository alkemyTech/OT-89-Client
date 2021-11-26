import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import apiService from "../../services/server";

export const Novelties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Petocion a la base de datos con axios
    const getData = async () => {
      const res = await apiService.get("/news");
      if (res.status !== 204) {
        const data = await res.data.data;
        setData(data);
      } else {
        return;
      }
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="novelties-page">
      <div>
        <h1>Últimas novedades</h1>
      </div>
      <div className="novelties-page__items">
        {data.length !== 0 ? (
          data.map((obj) => (
            <Card
              key={obj.id}
              id={obj.id}
              title={obj.name}
              image={obj.image}
              content={obj.content}
              altText={"Imagen de la novedad."}
            />
          ))
        ) : (
          <div className="novelties-page__no-items">
            <h2>{`Por ahora no hay nada. Vuelve más tarde :)`}</h2>
          </div>
        )}
      </div>
    </section>
  );
};
