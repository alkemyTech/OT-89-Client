import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { BackOffice } from "../pages/backoffice/BackOffice";
import ListUsers from "../pages/backoffice/ListUsers/ListUsers";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <Route path="/auth/backoffice" exact component={BackOffice} />
      <Route path="/backoffice/users" exact component={ListUsers} />
    </Switch>
  );
};
