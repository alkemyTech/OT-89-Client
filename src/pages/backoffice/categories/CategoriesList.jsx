import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import "./Categories.scss";
import "../../../components/utils/buttons/Button.scss";

const CategoriesList = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState(
    "This will show if something went horribly wrong"
  );

  useEffect(() => {
    (async () => {
      const categoriesResponse = await apiService.get("/categories");
      if (categoriesResponse.status === 200) {
        setCategories(categoriesResponse.data.data);
      } else if (categoriesResponse.status === 204) {
        setWarning("No hay categorias en la base de datos");
      } else if (categoriesResponse.data.message) {
        setWarning(categoriesResponse.data.message);
      } else {
        setWarning("Error inesperado");
      }
      setIsLoading(false);
    })();
  }, []);

  console.log(categories);
  const handleEdit = (category) => {
    console.log("Modificame a: ", category);
    console.log("Vincular al ticket OT89-460");
  };

  const handleDelete = (id) => {
    console.log("Elmininame el: ", id);
    console.log("Vincular al ticket OT89-461");
  };

  if (isLoading) return <Loading />;

  return (
    <article className="categories__list">
      {categories ? (
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
        <Warning text={warning} />
      )}
    </article>
  );
};

export default CategoriesList;

//poco seguro sobre este memo
const CategoryItem = React.memo(({ category, handleEdit, handleDelete }) => {
  const { name, id } = category;
  console.log("Hola, soy CategoryItem key: ", id, " y me renderice");
  return (
    <>
      <section>
        <span>{name}</span>
        <button
          className="btn__edit button button-outline"
          onClick={() => handleEdit(category)}
        >
          Editar
        </button>
        <button
          className="btn__delete button button-secondary-outline "
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </section>
    </>
  );
});

const Warning = ({ text }) => {
  return (
    <>
      <h3 className="warning">{text}</h3>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <h3 className="loading">Cargando...</h3>
    </>
  );
};
