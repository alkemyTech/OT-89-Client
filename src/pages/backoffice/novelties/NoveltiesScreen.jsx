import React, { useState } from "react";

import NoveltiesList from "./NoveltiesList";
import NoveltyModal from "./NoveltyModal";
import "./novelties.scss";
import { useDispatch } from "react-redux";
import { selectNovelty } from "../../../features/slices/noveltySlice";

const NoveltiesScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleModify = (novelty) => {
    dispatch(selectNovelty(novelty.id));
    setShowModal(true);
  };

  return (
    <>
      <div className="novelties">
        <h1>Novedades</h1>
        <button
          className="button primary"
          onClick={() => {
            dispatch(selectNovelty(null));
            setShowModal(true);
          }}
        >
          Agregar Novedades
        </button>
      </div>
      <NoveltiesList handleModify={handleModify} />
      <NoveltyModal isVisible={showModal} setIsVisible={setShowModal} />
    </>
  );
};

export default NoveltiesScreen;
