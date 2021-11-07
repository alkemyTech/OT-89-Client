import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <Route path="/" component={MainRouter} />
      </Switch>
    </Router>
  );
};
