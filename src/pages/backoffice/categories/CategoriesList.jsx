import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import "./Categories.scss";
import "../../../components/utils/buttons/Button.scss";
import { Spinner } from "../../../components/spinner/Spinner";
import WarningDisplay from "../../../components/utils/warning/WarningDisplay";
import { HandleDeleteCategory } from "../../../components/ActionsHandlers/HandleClicks/handleDelete";

const CategoriesList = () => {
  const [categories, setCategories] = useState("loading"); //
  const [warning, setWarning] = useState(
    "This will show if something went horribly wrong"
  );
  const [reload, setReload] = useState(null);

  useEffect(() => {
    (async () => {
      const categoriesResponse = await apiService
        .get("/categories")
        .catch((err) => {
          //It triggers when server is offline or user is unauthorized
          console.error(err);
          return err;
        });
      if (categoriesResponse.status === 200) {
        setCategories(categoriesResponse.data.data);
      } else if (categoriesResponse.status === 204) {
        setCategories(null);
        setWarning("No hay categorias en la base de datos");
      } else {
        setCategories(null);
        setWarning("Error inesperado");
      }
    })();
  }, [reload]);

  const handleEdit = (category) => {
    console.log("Modificame a: ", category);
    console.log("Vincular al ticket OT89-460");
  };

  const handleDelete = async (id) => {
    const res = await HandleDeleteCategory(id);
    if (res === "categoria eliminada") {
      setReload((current) => !current);
    }
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
