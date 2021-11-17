import React from "react";
import CategoriesList from "./CategoriesList";
import "./Categories.scss";
import "../../../components/utils/buttons/Button.scss";


const CategoriesScreen = () => {
  const handleNewCategory = () => {
    console.log("Vincular al ticket OT89-460");
  };

  return (
    <main>
      <h1>Listado de Categorias</h1>
      <div className="add__category">
        <button onClick={handleNewCategory} className="button button-primary">Agregar Categoria</button>
      </div>
      <CategoriesList />
    </main>
  );
};

export default CategoriesScreen;
