import React from "react";
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import MyReservationsComponent from "./components/Reservations";
import Admin from './components/Admin';
import Login from "./components/Login";
import FlightComponent from "./components/Flights";
import './custom.css'
import RegisterSubmit from './components/RegisterSubmit';
import NewsComponent from "./components/NewsComponent";
import EmployeePanel from "./components/EmployeePanel";
function RouteSwitches() {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/aboutus' component={AboutUs} />
            <Route path='/myReservations' component={MyReservationsComponent} />
            <Route path='/flights' component={FlightComponent} />
            <Route path='/messages' component={NewsComponent} />
            <Route path='/login' component={Login} />
            <Route path='/registerSubmit' component={RegisterSubmit} />
            <ProtectedRoute path='/employee' component={EmployeePanel} />
            <ProtectedRoute path='/Admin' component={Admin} />
        </Switch>
    );
}

export default RouteSwitches;