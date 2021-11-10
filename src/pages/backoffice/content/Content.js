import React from "react";
import { Button } from "../../../components/utils/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ListScreen from "../ListScreen/ListScreen";

export const Content = ({ openAside, isLeft }) => {
  const left = isLeft ? "icon isleft" : "icon isright";

  return (
    <section className="Content">
      <FontAwesomeIcon
        icon={faArrowRight}
        size="2x"
        className={left}
        onClick={openAside}
      />
      <div className="heading">
        <h1>Novedades</h1>{" "}
        {/*Este H1 se debe renderizar segun las lista que contenga */}
        <Button title="Agregar Novedades" className="button primary" />
      </div>
      <ul className="list"></ul>
      <ListScreen></ListScreen>
    </section>
  );
};
