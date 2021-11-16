import React from "react";
import CategoriesList from "./CategoriesList";
import "./Categories.scss";

const CategoriesScreen = () => {
  const handleNewCategory = () => {
    console.log("Vincular al ticket OT89-460");
  };

  return (
    <main>
      <h1>Listado de Categorias</h1>
      <div className="add__category">
        <button onClick={handleNewCategory}>Agregar Categoria</button>
      </div>
      <CategoriesList />
    </main>
  );
};

export default CategoriesScreen;
