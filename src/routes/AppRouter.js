import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navbar} from '../components/Navbar';
import {Footer} from '../components/Footer';
import {Home} from '../components/Home';
import {About} from '../components/About';
import {Activities} from '../components/Activities';
import {Novelties} from '../components/Novelties';
import {News} from '../components/News';
import {Testimonials} from '../components/Testimonials';
import {Contacts} from '../components/Contacts';
import {Contribute} from '../components/Contribute';
import {Login} from '../components/Login';
import {Register} from '../components/Register';

export const AppRouter = () => {
    return(
        <Router>
            <Navbar />
                <Switch>
                    <Route exact path = '/' component = {Home}/>
                    {/* nosotros = about */}
                    <Route exact path = '/about' component = {About}/>
                    <Route exact path = '/activities' component = {Activities}/>
                    {/* novedades = novelties */}
                    <Route exact path = '/novelties' component = {Novelties}/>
                    {/* noticias = news */}
                    <Route exact path = '/news' component = {News}/>
                    <Route exact path = '/testimonials' component = {Testimonials}/>
                    <Route exact path = '/contacts' component = {Contacts}/>
                    <Route exact path = '/contribute' component = {Contribute}/>
                    <Route exact path = '/login' component = {Login}/>
                    <Route exact path = '/register' component = {Register}/>
                </Switch>
            <Footer />
        </Router>
    )
}