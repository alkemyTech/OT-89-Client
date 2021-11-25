import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
    </Switch>
  );
};
