import React, { useState, useEffect } from "react";
import apiService from "../../../services/server";
//import { EditCategories } from "../../../components/EditCategories/EditCategories";

import "./Categories.scss";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiService.get("/activities");
        const { data } = await res.data;
        if (data.length !== 0) {
          setCategories(data.reverse());
        } else {
          return;
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    getData();
  }, []);

  console.log(categories);
  return (
    <div className="container-activities">
      <h1>Listado de Categorias</h1>
      {/* Aca metemos un campo para que el administrador pueda crear una nueva actividad */}
      {/* <EditCategories actId={0} /> */}
      <div className="container-activities__table">
        {categories?.map((category) => (
          <div className="container-activities__table--items" key={category.id}>
            <p className="activities__title">{category.name}</p>
            {/* <EditCategories actId={category.id} /> */}
            <button
              className="button button-secondary"
              onClick={() =>
                console.log("se esta borrando el elemento " + category.id)
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
