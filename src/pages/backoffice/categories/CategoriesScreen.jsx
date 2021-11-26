import React from "react";
import { CategoriesList } from "./CategoriesList";
import "./Categories.scss";
import "../../../components/utils/buttons/Button.scss";

const CategoriesScreen = () => {
  return (
    <section>
      <CategoriesList />
    </section>
  );
};

export default CategoriesScreen;
