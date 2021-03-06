import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <Redirect to="/404" />
    </Switch>
  );
};
