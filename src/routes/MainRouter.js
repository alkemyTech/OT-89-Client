import React, { useEffect, useState } from "react";
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
import { BackOffice } from "../pages/backoffice/BackOffice";
import getToken from "../helpers/useGetToken";
import apiService from "../services/server";
import { NotFound } from "../pages/main/NotFound";
import { Activities } from "../pages/main/Activities";

export const MainRouter = () => {
  const [user, setUser] = useState({ roleId: 1 });
  //Fingiendo ser admin no flashea la screen de error en cada click.
  //De todas formas, el useEffect enseguida valida si realmente es admin.

  useEffect(() => {
    // if (getToken())
    try {
      (async () => {
        const res = await apiService.get("/auth/me", {
          headers: {
            Authorization: getToken(),
          },
        });
        setUser(res.data.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        <Route exact path="/activities" component={Activities} />
        {user && <Route exact path="/profile" component={Profile} />}
        <Route exact path="/activities/:id" component={ViewActivity} />
        {user && user.roleId === 1 && (
          <Route path="/backoffice" component={BackOffice} />
        )}
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};
