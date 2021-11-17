import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import "./Categories.scss";
import "../../../components/utils/buttons/Button.scss";
import { Spinner } from "../../../components/spinner/Spinner";
import WarningDisplay from "../../../components/utils/warning/WarningDisplay";

const CategoriesList = () => {
  const [categories, setCategories] = useState("loading");//
  const [warning, setWarning] = useState(
    "This will show if something went horribly wrong"
  );

  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await apiService.get("/categories");
        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data.data);
        } else if (categoriesResponse.status === 204) {
          setCategories(null);
          setWarning("No hay categorias en la base de datos");
        } else if (categoriesResponse.data.message) {
          setCategories(null);
          setWarning(categoriesResponse.data.message);
        } else {
          setCategories(null);
          setWarning("Error inesperado");
        }
      } catch (err) {
        //triggers when server is offline
        setCategories(null);
        setWarning(err.message);
      }
    })();
  }, []);

  const handleEdit = (category) => {
    console.log("Modificame a: ", category);
    console.log("Vincular al ticket OT89-460");
  };

  const handleDelete = (id) => {
    console.log("Elmininame el: ", id);
    console.log("Vincular al ticket OT89-461");
  };

  return (
    <article className="categories__list">
      {categories === "loading" ? (
        <Spinner size={50} center />
      ) : categories ? (
        <>
          {categories.map((category) => (
            <CategoryItem
              category={category}
              key={category.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </>
      ) : (
        <WarningDisplay text={warning} />
      )}
    </article>
  );
};

export default CategoriesList;

//poco seguro sobre este memo
const CategoryItem = React.memo(({ category, handleEdit, handleDelete }) => {
  const { name, id } = category;
  //console.log("Hola, soy CategoryItem key: ", id, " y me renderice");
  return (
    <>
      <section>
        <span>{name}</span>
        <button
          className="button button-outline"
          onClick={() => handleEdit(category)}
        >
          Editar
        </button>
        <button
          className="button button-secondary-outline "
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </section>
    </>
  );
});
