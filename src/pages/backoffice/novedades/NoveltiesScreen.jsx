import React, { useEffect, useState } from "react";

import NoveltyModal from "./NoveltyModal";
import "./novelties.scss";

const NoveltiesScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [toEdit, setToEdit] = useState();
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    console.log("Refresheando por la vida");
  }, [refresh]);

  return (
    <>
      <div className="novelties">
        <h1>Novedades</h1>
        <button
          className="button primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Agregar Novedades
        </button>
      </div>
      <NoveltyModal
        isVisible={showModal}
        setIsVisible={setShowModal}
        toEdit={toEdit}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default NoveltiesScreen;
