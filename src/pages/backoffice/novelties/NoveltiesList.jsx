import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import { Spinner } from "../../../components/spinner/Spinner";
import WarningDisplay from "../../../components/utils/warning/WarningDisplay";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { loadNovelties } from "../../../features/slices/noveltySlice";

const NoveltiesList = ({ handleModify }) => {
  const dispatch = useDispatch();
  const novelties = useSelector((state) => state.novelties.novelties, shallowEqual);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    (async () => {
      await apiService
        .get("/news")
        .then((res) => {
          if (res.status === 200) {
            dispatch(loadNovelties(res.data.data));
          } else {
            setWarning("No hay novedades que mostrar");
          }
        })
        .catch((err) => {
          console.log(err);
          setWarning("Error de servidor");
        });
    })();
  }, []);
  useEffect(() => {
    if (novelties.length !== 0) {
      setWarning(null);
    } else if (novelties.length === 0) {
      setWarning("No hay novedades que mostrar");
    }
  }, [novelties]);

  return (
    <article className="novelties__list">
      {warning ? (
        <WarningDisplay text={warning} />
      ) : novelties.length === 0 ? (
        <Spinner size={50} center />
      ) : (
        novelties.map((novelty) => (
          <NoveltyItem
            novelty={novelty}
            handleModify={handleModify}
            key={novelty.id}
          />
        ))
      )}
    </article>
  );
};

export default NoveltiesList;

const NoveltyItem = ({ novelty, handleModify }) => {
  const { name, image, content } = novelty;
  return (
    <>
      <article className="novelty__item">
        <div className="__description">
          <span>{name}</span>
          <div
            className="__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <a href={image} target="_blank" rel='noopener noreferrer'>
          Imagen
        </a>
        <button
          className="button button-outline"
          onClick={() => handleModify(novelty)}
        >
          Modificar
        </button>
      </article>
    </>
  );
};
