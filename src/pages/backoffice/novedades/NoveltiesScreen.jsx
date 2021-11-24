import React, { useEffect, useState } from "react";

import apiService from "../../../services/server";
import NoveltiesList from "./NoveltiesList";
import NoveltyModal from "./NoveltyModal";
//import "../../../components/utils/buttons/Button.scss";
import "./novelties.scss";

const NoveltiesScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [toModify, setToModify] = useState();
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    (async () => {
      await apiService
        .get("/categories")
        .then((res) => {
          console.log(res);
          if (res.status === 200) setCategories(res.data.data);
          else console.log("No hay categorias disponibles");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [refresh]);

  const handleModify = (novelty) => {
    setToModify(novelty);
    setShowModal(true);
  };

  return (
    <>
      <div className="novelties">
        <h1>Novedades</h1>
        <button
          className="button primary"
          onClick={() => {
            setToModify(null);
            setShowModal(true);
          }}
        >
          Agregar Novedades
        </button>
      </div>
      <NoveltiesList handleModify={handleModify} refresh={refresh} categories={categories} />
      <NoveltyModal
        isVisible={showModal}
        setIsVisible={setShowModal}
        toModify={toModify}
        setRefresh={setRefresh}
        categories={categories}
      />
    </>
  );
};

export default NoveltiesScreen;
