import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { selectNovelty } from "../../../features/slices/noveltySlice";
import NoveltiesList from "./NoveltiesList";
import NoveltyModal from "./NoveltyModal";
import "./novelties.scss";

const NoveltiesScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleModify = (novelty) => {
    dispatch(selectNovelty(novelty.id));
    setShowModal(true);
  };

  return <section>
      <div className="novelties">
      <h1>Novedades</h1>
        <button
          className="button button-primary"
          onClick={() => {
            dispatch(selectNovelty(null));
            setShowModal(true);
          }}
        >
          Nueva Novedad
        </button>
      </div>
      <NoveltiesList handleModify={handleModify} />
      <NoveltyModal isVisible={showModal} setIsVisible={setShowModal} />
    </section>
};

export default NoveltiesScreen;
