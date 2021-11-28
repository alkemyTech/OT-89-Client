import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { EditOrganization } from "../EditOrganization/EditOrganization";
import { ListActivities } from "../ListActivities/ListActivities";
import { EditHomeData } from "../EditHomeData/EditHomeData";
import { Switch, Route } from "react-router-dom";
import { ListUsers } from "../ListUsers/ListUsers";
import { ListContact } from "../ListContact/ListContact";
import CategoriesScreen from "../categories/CategoriesScreen";
import NoveltiesScreen from "../novelties/NoveltiesScreen";
import TestimonialScreen from "../Testimonials/TestimonialsScreen";
import { NotFound } from "../../main/NotFound";

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

      <Switch>
        <Route path="/backoffice/" component={ListActivities} exact />

        <Route
          path="/backoffice/edit-organization"
          component={EditOrganization}
          exact
        />
        <Route path="/backoffice/users" component={ListUsers} exact />
        <Route path="/backoffice/info-home" component={EditHomeData} exact />
        <Route path="/backoffice/contacts" component={ListContact} />
        <Route
          path="/backoffice/categories"
          component={CategoriesScreen}
          exact
        />
        <Route path="/backoffice/novelties" component={NoveltiesScreen} exact />
        <Route
          path="/backoffice/testimonials"
          component={TestimonialScreen}
          exact
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </section>
  );
};
export default Content;
