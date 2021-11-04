import React, { useState } from "react";
import { Aside } from "./aside/Aside";
import "./Backoffice.scss";
import { Content } from "./content/Content";
import logoONG from "../../assets/images/logo.png";
import { Button } from "../utils/buttons/Button";
import { ListScreen } from "./ListScreen/ListScreen";

export const BackOffice = () => {
  const [isOpen, setOpen] = useState(false);

  const openAside = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="Backoffice">
      <header>
        <img src={logoONG} alt="logo" />
        <Button className="btn outline" title="Volver al sitio" />
      </header>{" "}
      {/*Este es un navbar provisorio */}
      <Aside isOpen={isOpen} />
      <Content openAside={openAside} isLeft={isOpen} />
      <ListScreen></ListScreen>
    </div>
  );
};
