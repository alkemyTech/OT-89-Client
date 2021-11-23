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
import Profile from "../components/Profile/Profile";
import ViewActivity from "../components/ViewActivity/ViewActivity";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transitions.css"

export const MainRouter = () => {
  return (
    <>
      <Header />
      {/* Route without specifying the path will render all the time */}
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/novelties" component={Novelties} />
              <Route exact path="/novelties/:id" component={Novelty} />
              <Route exact path="/testimonials" component={Testimonials} />
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/contribute" component={Contribute} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/activities/:id" component={ViewActivity} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
      <Footer />
    </>
  );
};
