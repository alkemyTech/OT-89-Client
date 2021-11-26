import React, { useState, useEffect } from "react";
import apiService from "../../../services/server";
import { Alert, Confirm } from "../../../components/Alert/Alert";
//import { EditCategories } from "../../../components/EditCategories/EditCategories";

import "./Categories.scss";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const deleteCategory = async (id) => {
    const confirm = await Confirm("Eliminar Categoria", "Estas seguro de eliminar esta categoria?");
    if (confirm) {
      const response = await apiService.delete(`/categories/${id}`);
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        Alert("Error", "Hubo un error al eliminar la categoria", "warning");
      }
    } else {
      Alert("Cancelado", "No se elimino la categoria", "warning");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiService.get("/categories");
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
                deleteCategory(category.id)
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
