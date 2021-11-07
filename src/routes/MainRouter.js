import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Home } from "../pages/main/Home";
import { About } from "../pages/main/About";
import { Novelties } from "../pages/main/Novelties";
import { Testimonials } from "../pages/main/Testimonials";
import { Contacts } from "../pages/main/Contacts";
import { Contribute } from "../pages/main/Contribute";
import { Novelty } from "../components/Novelty/Novelty";

export const MainRouter = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/novelties" component={Novelties} />
        <Route exact path="/novelties/:id" component={Novelty} />
        <Route exact path="/testimonials" component={Testimonials} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/contribute" component={Contribute} />
      </Switch>
      <Footer />
    </>
  );
};
