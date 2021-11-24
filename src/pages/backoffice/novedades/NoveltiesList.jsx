import React, { useEffect, useState } from "react";
import apiService from "../../../services/server";
import { Spinner } from "../../../components/spinner/Spinner";
import WarningDisplay from "../../../components/utils/warning/WarningDisplay";

const NoveltiesList = ({ handleModify, refresh, categories }) => {
  const [novelties, setNovelties] = useState([]);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    (async () => {
      await apiService
        .get("/news")
        .then((res) => {
          if (res.status === 200) {
            setNovelties(res.data.data);
          } else {
            setWarning("No hay novedades que mostrar");
          }
        })
        .catch((err) => {
          console.log(err);
          setWarning("Error de servidor");
        });
    })();
  }, [refresh]);

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
  const { name, image, content, categoryId, id } = novelty;
  return (
    <>
      <section>
        <span>{name}</span>
        <button
          className="button button-outline"
          onClick={() => handleModify(novelty)}
        >
          Modificar
        </button>
      </section>
    </>
  );
};
