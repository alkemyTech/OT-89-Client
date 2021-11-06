import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Activities } from "../pages/Activities";
import { Novelties } from "../pages/Novelties";
import { NoveltiesIndividual } from '../pages/NoveltiesIndividual'
import { News } from "../pages/News";
import { Testimonials } from "../pages/Testimonials";
import { Contacts } from "../pages/Contacts";
import { Contribute } from "../pages/Contribute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
// import { Profile } from "../pages/Profile";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  return (
    <Router>
        <Header />
            <Switch>
            <Route exact path="/" component={Home}/> 
            // /nosotros = about
            <Route exact path="/about" component={About} />
            <Route exact path="/activities" component={Activities} />
            {/* novedades = novelties */}
            <Route exact path="/novelties" component={Novelties} />
            <Route exact path="/novelties/:id" component = {NoveltiesIndividual}/>
            {/* noticias = news */}
            <Route exact path="/news" component={News} />
            <Route exact path="/testimonials" component={Testimonials} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/contribute" component={Contribute} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Route exact path="*" component={NotFound} />
          </Switch>
       <Footer />
    </Router>
  );
};
