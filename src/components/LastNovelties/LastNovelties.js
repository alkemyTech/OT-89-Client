import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Button } from "../utils/buttons/Button";

export const LastNovelties = React.memo((props) => {
  const { data } = props;

  return (
    <div className="wrapper">
      <h3>Últimas Novedades</h3>
      <div className="noveltie-conteiner">
        {data.map((dato) => {
          if (dato === undefined) {
            return;
          } else {
            return (
              <div className="noveltie-conteiner-item" key={dato.id}>
                <img src={dato.image} alt={dato.name} />
                <h3>{dato.name}</h3>
              </div>
            );
          }
        })}
      </div>
      <div className="novelties-links">
        <Button className="button" title="Testimonios" url="/testimonials" />
        <Button
          className="button button-primary"
          title="Ver todas"
          url="/novelties"
        />
        <Button className="button" title="Novedades" url="/novelties" />
      </div>
    </div>
  );
});

LastNovelties.propTypes = {
  data: PropTypes.array.isRequired,
};
