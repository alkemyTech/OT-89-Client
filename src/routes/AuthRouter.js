import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { BackOffice } from "../pages/backoffice/BackOffice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transitions.css"

export const AuthRouter = () => {
  return (
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
            <Route path="/auth/backoffice" component={BackOffice} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}
    />
  );
};
