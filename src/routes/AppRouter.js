import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Header } from "../components/Header/Header";

import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Activities } from "../pages/Activities";
import { News } from "../pages/News";
import { Novelties } from "../pages/Novelties";
import { Testimonials } from "../pages/Testimonials";
import { Contacts } from "../pages/Contacts";
import { Contribute } from "../pages/Contribute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { User } from "../pages/User";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/activities" component={Activities} />
        <Route exact path="/news" component={News} />
        <Route exact path="/novelties" component={Novelties} />
        <Route exact path="/testimonials" component={Testimonials} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/contribute" component={Contribute} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};