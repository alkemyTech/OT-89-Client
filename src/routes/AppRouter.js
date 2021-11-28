import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/main/NotFound";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transitions.css";

export const AppRouter = () => {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route path="/auth" component={AuthRouter} />
                <Route path="/" component={MainRouter} />
                <Route path="*" component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
};
