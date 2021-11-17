import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { EditOrganization } from "../EditOrganization/EditOrganization";
import ListScreen from "../../backoffice/ListScreen/ListScreen.jsx";
import { ListActivities } from "../ListActivities/ListActivities";

import { Switch, Route } from "react-router-dom";
import { ListUsers } from "../ListUsers/ListUsers";

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
        <Route
          path="/auth/backoffice/activities"
          component={ListActivities}
          exact
        />
        <Route
          path="/auth/backoffice/edit-organization"
          component={EditOrganization}
          exact
        />
        <Route path="/auth/backoffice/users" component={ListUsers} exact />
      </Switch>
    </section>
  );
};
